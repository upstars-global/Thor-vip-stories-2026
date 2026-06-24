// Playback + navigation controls. Drives both the GSAP master timeline (tl) and
// the underlying <video>, keeping them in lock-step. All reactive state is owned
// by the composition root and injected here.
const PRESS_DURATION = 250 // ms before a press counts as a long-press (hold-to-pause)

export function useStoryPlayback(ctx) {
  const {
    tl,
    videoPlayer,
    notify,
    longPress,
    pressTimer,
    isPlaying,
    isPaused,
    currentTime,
    segmentStartTimes,
    segments,
    showPlayButton,
  } = ctx

  // --- Continuous video -> timeline sync ----------------------------------
  // The master timeline is positioned in ABSOLUTE video time (each segment is
  // added at scene.vstart), so syncing is an identity map: tl.time === video
  // currentTime. The <video> stays the master clock; we only nudge tl when it
  // drifts past one frame. When the video enters a gap left by a skipped scene
  // (no built window covers it), we seek the video forward to the next built
  // scene so skipped backgrounds are never shown.
  const SYNC_EPSILON = 0.04 // ~1 frame @30fps; only correct beyond this drift
  let frameHandle = null
  let syncStarted = false

  const syncToVideo = () => {
    const v = videoPlayer.value
    if (!v || v.seeking || v.paused) return
    if (isPaused.value || longPress.value) return
    const segs = segments?.value || []
    if (!segs.length) return
    const t = v.currentTime
    // Inside a built scene's overlay span? Identity-map the timeline to video.
    // The span is [vstart, vstart + dur); when a scene's dur overlaps the next
    // one, both stay "active" so the exit zoom finishes before we ever skip.
    const active = segs.some(s => t >= s.vstart - 1e-3 && t < s.vstart + s.dur - 1e-3)
    if (active) {
      if (Math.abs(tl.time() - t) > SYNC_EPSILON) tl.time(t)
      return
    }
    // In a gap (skipped scene) or before the first scene: jump to the next
    // built scene's start so the skipped background is never displayed.
    const next = segs.find(s => s.vstart > t + 1e-3)
    if (next) {
      v.currentTime = next.vstart
      return
    }
    // Past the last built window: pin the timeline to its end (final CTA holds).
    if (tl.time() < tl.duration()) tl.time(tl.duration())
  }

  const startSync = () => {
    if (syncStarted) return
    syncStarted = true
    const loop = () => {
      syncToVideo()
      frameHandle = requestAnimationFrame(loop)
    }
    frameHandle = requestAnimationFrame(loop)
  }

  const stopSync = () => {
    if (frameHandle != null) cancelAnimationFrame(frameHandle)
    frameHandle = null
    syncStarted = false
  }

  // Start video first, then gate tl.play(0) on the first presented frame so the
  // two clocks begin aligned instead of letting GSAP race ahead during decode.
  const startPlayback = () => {
    const v = videoPlayer.value
    const begin = () => {
      if (v && typeof v.requestVideoFrameCallback === 'function') {
        v.requestVideoFrameCallback(() => {
          tl.play(0)
          startSync()
        })
      } else {
        tl.play(0)
        startSync()
      }
    }
    if (!v) {
      tl.play(0)
      startSync()
      return
    }
    const p = v.play()
    if (p && typeof p.then === 'function') {
      p.then(begin).catch(() => {
        showPlayButton.value = true
        startSync()
      })
    } else {
      begin()
    }
  }

  const playVideo = () => {
    videoPlayer.value.play()
    tl.play()
    showPlayButton.value = false
  }

  const updateTime = () => {
    /* video timeupdate; master timeline drives currentTime */
  }

  // On the final CTA the background keeps looping its last few seconds (like the
  // old stories) while the text + buttons stay put. Sync re-pins the timeline.
  const FINAL_LOOP_BACK = 3
  const handleVideoEnded = () => {
    const v = videoPlayer.value
    if (!v) return
    v.currentTime = Math.max(0, (v.duration || 0) - FINAL_LOOP_BACK)
    v.play().catch(() => {})
  }

  const playerPause = () => {
    setTimeout(() => {
      if (longPress.value) {
        isPlaying.value = false
        isPaused.value = true
        tl.pause()
        videoPlayer.value.pause()
        notify('click_pause')
      }
    }, PRESS_DURATION + 10)
  }

  const playerPlay = () => {
    isPlaying.value = true
    isPaused.value = false
    tl.play()
    videoPlayer.value.play()
    if (longPress.value && currentTime.value > 0.4) {
      notify('click_start')
    }
  }

  const togglePlayState = () => {
    if (isPlaying.value) {
      isPlaying.value = false
      isPaused.value = true
      tl.pause()
      videoPlayer.value.pause()
      notify('click_pause')
    } else {
      isPlaying.value = true
      isPaused.value = false
      tl.play()
      videoPlayer.value.play()
      notify('click_start')
    }
  }

  const press = () => {
    playerPause()
    pressTimer.value = setTimeout(() => {
      longPress.value = true
    }, PRESS_DURATION)
  }

  const release = direction => {
    clearTimeout(pressTimer.value)
    if (longPress.value) {
      playerPlay()
    } else {
      playerPlay()
      jumpToSegment(direction)
    }
    longPress.value = false
  }

  const handleEvent = (direction, event) => {
    if (event.type === 'touchstart') {
      event.preventDefault()
      press(direction)
    } else if (event.type === 'mousedown') {
      press(direction)
    }
  }

  const handleEventEnd = (direction, event) => {
    if (event.type === 'touchend') {
      event.preventDefault()
      release(direction)
    } else if (event.type === 'mouseup') {
      release(direction)
    }
  }

  // Prev/next jumps move between built scenes by their absolute video time.
  // Both the <video> and the timeline are seeked to the same point, so they
  // stay aligned by definition (no per-segment remapping needed).
  //
  // Landing rule: each segment is added at its vstart, so its entrance plays
  // over the first ~0.9s. Landing exactly on vstart freezes the content at its
  // pre-entrance state (opacity 0). While PLAYING that is fine (the entrance
  // animates in); but when PAUSED the playhead stays frozen and the scene shows
  // no text. So when paused we land a touch past the entrance to reveal the
  // settled content (mirrors the DEV seekSeg +0.9 offset).
  const ENTRANCE_PREVIEW = 0.9

  const landingTime = (target, idx) => {
    const v = videoPlayer.value
    if (!v || !v.paused) return target // playing -> exact start, entrance plays
    const seg = (segments?.value || [])[idx]
    if (!seg) return target + ENTRANCE_PREVIEW
    // Stay inside the scene: after the entrance, before the exit zoom (~0.3s).
    const maxOffset = Math.max(0, seg.dur - 0.3 - 0.15)
    return target + Math.min(ENTRANCE_PREVIEW, maxOffset)
  }

  const jumpToSegment = direction => {
    const starts = segmentStartTimes.value // built scene vstarts, ascending
    if (!starts.length) return
    const v = videoPlayer.value
    const t = v ? v.currentTime : tl.time()
    let idx = 0
    for (let i = 0; i < starts.length; i++) {
      if (t >= starts[i] - 1e-3) idx = i
    }
    let targetIdx
    if (direction === 'forward') {
      if (idx >= starts.length - 1) return // already on the last scene
      targetIdx = idx + 1
      notify('click_forward')
    } else {
      targetIdx = Math.max(0, idx - 1)
      notify('click_backward')
    }
    const land = landingTime(starts[targetIdx], targetIdx)
    if (v) v.currentTime = land
    tl.time(land)
  }

  return {
    playVideo,
    updateTime,
    handleVideoEnded,
    togglePlayState,
    press,
    release,
    handleEvent,
    handleEventEnd,
    jumpToSegment,
    startPlayback,
    startSync,
    stopSync,
  }
}
