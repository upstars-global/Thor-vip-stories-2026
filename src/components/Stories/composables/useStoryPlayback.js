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
    numberOfSegments,
    segmentStartTimes,
    segments,
    showPlayButton,
    isVideoPlaying,
  } = ctx

  // --- Continuous video -> timeline sync ----------------------------------
  // The <video> is the master clock; the GSAP master timeline (tl) is nudged to
  // follow the actually displayed frame so overlay exits land exactly on the
  // background cut (kills the systemic "early exit" lead). Correction is local
  // to the current segment and skips while paused/seeking, so it never fights
  // the boundary seek used to jump over skipped scenes.
  const SYNC_EPSILON = 0.04 // ~1 frame @30fps; only correct beyond this drift
  let frameHandle = null
  let syncStarted = false

  const segIndexByTl = t => {
    const segs = segments?.value || []
    for (let i = segs.length - 1; i >= 0; i--) {
      if (t >= segs[i].start - 1e-3) return i
    }
    return 0
  }

  const syncToVideo = () => {
    const v = videoPlayer.value
    if (!v || v.seeking || v.paused) return
    if (isPaused.value || longPress.value) return
    const segs = segments?.value || []
    if (!segs.length) return
    const t = tl.time()
    const seg = segs[segIndexByTl(t)]
    if (!seg) return
    const vrel = v.currentTime - seg.vstart
    // Ignore frames where the video is outside the current segment's range
    // (e.g. mid-seek after a boundary jump) to avoid yanking the timeline.
    if (vrel < -0.15 || vrel > seg.dur + 0.15) return
    const expected = seg.start + Math.min(Math.max(vrel, 0), seg.dur)
    if (Math.abs(t - expected) > SYNC_EPSILON) tl.time(expected)
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

  const checkVideoPlayback = () => {
    if (!videoPlayer.value) return
    if (videoPlayer.value.paused) {
      isVideoPlaying.value = false
      showPlayButton.value = true
      tl.pause()
    } else {
      isVideoPlaying.value = true
      showPlayButton.value = false
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

  const jumpToSegment = direction => {
    const starts = segmentStartTimes.value
    let currentSegment = starts.findIndex((startTime, i) => {
      return currentTime.value >= startTime && currentTime.value < starts[i + 1]
    })
    if (direction === 'backward') {
      if (currentSegment === -1) {
        tl.time(starts[Math.max(0, numberOfSegments.value - 2)] || 0)
      } else {
        let newTime = starts[currentSegment - 1]
        if (newTime == null || newTime < 0) newTime = 0
        tl.time(newTime)
      }
      notify('click_backward')
    } else if (direction === 'forward') {
      if (currentSegment === -1) return
      const newTime = starts[currentSegment + 1]
      if (newTime != null) tl.time(newTime)
      notify('click_forward')
    }
  }

  return {
    checkVideoPlayback,
    playVideo,
    updateTime,
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
