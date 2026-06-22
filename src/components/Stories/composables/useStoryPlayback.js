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
    showPlayButton,
    isVideoPlaying,
  } = ctx

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
  }
}
