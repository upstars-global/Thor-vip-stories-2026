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
    isBuffering,
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
    detachStallHandlers()
  }

  // --- Stall handling -----------------------------------------------------
  // The <video> is the master clock and syncToVideo drags the GSAP timeline to
  // match it every frame. If the buffer drains mid-playback (common on a cold
  // iOS load of a heavy mp4) the video freezes while currentTime stops
  // advancing, but GSAP would keep being re-pinned to a stuttering value -
  // visible as jank. So when the video reports it has stalled we PAUSE the
  // timeline, and only resume (re-aligned to the freshly decoded frame) once it
  // is actually playing again. We act only after a real stall (wasWaiting) so
  // this never interferes with normal seeks or the final-scene loop.
  let stallHandlersAttached = false
  let wasWaiting = false

  const onWaiting = () => {
    wasWaiting = true
    tl.pause()
  }
  const onPlaying = () => {
    if (!wasWaiting) return
    wasWaiting = false
    const v = videoPlayer.value
    if (!v) return
    // Respect a user-intended pause: don't fight togglePlayState/hold-to-pause.
    if (isPaused.value || longPress.value) return
    tl.time(v.currentTime)
    tl.play()
  }

  const attachStallHandlers = () => {
    const v = videoPlayer.value
    if (!v || stallHandlersAttached) return
    stallHandlersAttached = true
    v.addEventListener('waiting', onWaiting)
    v.addEventListener('stalled', onWaiting)
    v.addEventListener('playing', onPlaying)
  }
  const detachStallHandlers = () => {
    const v = videoPlayer.value
    stallHandlersAttached = false
    wasWaiting = false
    if (!v) return
    v.removeEventListener('waiting', onWaiting)
    v.removeEventListener('stalled', onWaiting)
    v.removeEventListener('playing', onPlaying)
  }

  // --- Buffer gate --------------------------------------------------------
  // Hold the start of playback until the clip is genuinely ready to play the
  // first few seconds smoothly, so GSAP never races ahead of a choppy cold
  // decode. Ready means readyState >= HAVE_FUTURE_DATA AND the buffered range
  // covering the playhead extends at least START_BUFFER seconds ahead. A
  // safety timeout guarantees we always start, even on a slow network, so the
  // story can never hang forever waiting for buffer.
  const START_BUFFER = 1.5 // seconds of lookahead before we begin
  const BUFFER_TIMEOUT = 6000 // ms hard cap on the wait

  const hasStartBuffer = v => {
    if (!v) return true
    if (v.readyState < 3 /* HAVE_FUTURE_DATA */) return false
    try {
      const t = v.currentTime
      const ranges = v.buffered
      for (let i = 0; i < ranges.length; i++) {
        if (ranges.start(i) <= t + 1e-3 && ranges.end(i) - t >= START_BUFFER) {
          return true
        }
      }
    } catch (e) {
      // buffered access can throw before metadata is known; treat as not-ready
    }
    return false
  }

  const awaitStartBuffer = v =>
    new Promise(resolve => {
      if (hasStartBuffer(v)) {
        resolve()
        return
      }
      let done = false
      const finish = () => {
        if (done) return
        done = true
        clearTimeout(timer)
        v.removeEventListener('progress', check)
        v.removeEventListener('canplay', check)
        v.removeEventListener('canplaythrough', check)
        v.removeEventListener('loadeddata', check)
        resolve()
      }
      const check = () => {
        if (hasStartBuffer(v)) finish()
      }
      const timer = setTimeout(finish, BUFFER_TIMEOUT)
      v.addEventListener('progress', check)
      v.addEventListener('canplay', check)
      v.addEventListener('canplaythrough', check)
      v.addEventListener('loadeddata', check)
    })

  // Kick off the network fetch (iOS often won't preload a paused <video> until
  // load()/play() is called), wait for a safe buffer, then play the video and
  // gate tl.play(0) on the first presented frame so both clocks begin aligned.
  const startPlayback = () => {
    const v = videoPlayer.value
    if (!v) {
      if (isBuffering) isBuffering.value = false
      tl.play(0)
      startSync()
      return
    }
    const begin = () => {
      attachStallHandlers()
      // Clear isBuffering (hides the branded preloader) exactly when the first
      // frame is presented and the timeline starts, so there is no gap between
      // the loader fading out and real content appearing.
      if (typeof v.requestVideoFrameCallback === 'function') {
        v.requestVideoFrameCallback(() => {
          tl.play(0)
          startSync()
          if (isBuffering) isBuffering.value = false
        })
      } else {
        tl.play(0)
        startSync()
        if (isBuffering) isBuffering.value = false
      }
    }
    const launch = () => {
      const p = v.play()
      if (p && typeof p.then === 'function') {
        p.then(begin).catch(() => {
          if (isBuffering) isBuffering.value = false
          showPlayButton.value = true
          startSync()
        })
      } else {
        begin()
      }
    }
    if (isBuffering) isBuffering.value = true
    try {
      v.load() // ensure buffered ranges actually grow on iOS
    } catch (e) {
      /* no-op */
    }
    awaitStartBuffer(v).then(launch)
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
  // over the first N seconds (N varies per scene: a 2-card fall is ~1.1s, a
  // 4-card fall ~1.8s, the slots reels ~3s). Landing exactly on vstart freezes
  // the content at its pre-entrance state (opacity 0). While PLAYING that is
  // fine (the entrance animates in); but when PAUSED the playhead stays frozen.
  //
  // So when paused we land on the scene's OWN entrance end (segEntranceEnds,
  // captured in buildSegment) so every scene shows fully-formed content -
  // chips landed, reels locked - instead of a mid-animation frame. This is one
  // data-driven rule, not per-scene hand-tuning. Clamped to stay before the
  // exit zoom. EXIT_DUR/EPS mirror buildSegment's exit window.
  const EXIT_DUR = 0.3
  const SETTLE_EPS = 0.06 // nudge just past the last entrance tween
  const FALLBACK_PREVIEW = 0.9 // used only if entranceEnd is unknown

  const landingTime = (target, idx) => {
    const v = videoPlayer.value
    if (!v || !v.paused) return target // playing -> exact start, entrance plays
    const seg = (segments?.value || [])[idx]
    if (!seg) return target + FALLBACK_PREVIEW
    const settle = (seg.entranceEnd || FALLBACK_PREVIEW) + SETTLE_EPS
    // Stay inside the scene: never reach into the exit zoom.
    const maxOffset = Math.max(0, seg.dur - EXIT_DUR - 0.05)
    return target + Math.min(settle, maxOffset)
  }

  // Seek both clocks to `time`. A <video> seek is async (slow on iOS over the
  // network). If the GSAP timeline keeps running during that seek it races
  // ahead of the still-frozen background and is then snapped back by
  // syncToVideo, which reads as the overlay "shaking"/jumping (most visible on
  // the scene-5 cube). So we pause the timeline, seek the video, and only
  // resume - in sync with the actually-decoded frame - once the video fires
  // `seeked`. A timeout guards against a missing event so we can never freeze.
  const seekBoth = (time, shouldPlay) => {
    const v = videoPlayer.value
    tl.pause()
    tl.time(time)
    if (!v) {
      if (shouldPlay) tl.play()
      return
    }
    if (Math.abs(v.currentTime - time) < 0.02) {
      if (shouldPlay) {
        tl.play()
        v.play().catch(() => {})
      }
      return
    }
    let done = false
    const resume = () => {
      if (done) return
      done = true
      v.removeEventListener('seeked', resume)
      tl.time(v.currentTime)
      if (shouldPlay) {
        tl.play()
        v.play().catch(() => {})
      }
    }
    v.addEventListener('seeked', resume, { once: true })
    setTimeout(resume, 600)
    v.currentTime = time
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
    // Resume playback after the seek based on the user's INTENT (isPaused), not
    // the transient v.paused flag, which can momentarily read "paused" mid-seek
    // and would otherwise leave the timeline frozen after a forward arrow.
    const land = landingTime(starts[targetIdx], targetIdx)
    seekBoth(land, !isPaused.value)
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
