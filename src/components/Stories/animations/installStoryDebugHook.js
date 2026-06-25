// DEV-only QA hook exposed on window.__story for manual scene seeking. No-op in
// production builds.
export function installStoryDebugHook(ctx) {
  if (!import.meta.env.DEV) return
  const { tl, videoPlayer, builtIds, segments, fitCards, fitAllCards } = ctx

  // Master timeline is positioned in absolute video time, so seeking is just
  // setting both clocks to the same second.
  const seekTo = t => {
    tl.pause()
    tl.time(t)
    if (videoPlayer.value) {
      videoPlayer.value.pause()
      videoPlayer.value.currentTime = t
    }
  }

  window.__story = {
    tl,
    video: videoPlayer,
    seek: seekTo,
    seekSeg: id => {
      const seg = (segments?.value || []).find(s => s.id === id)
      if (seg) seekTo(seg.vstart + 0.9)
    },
    builtIds,
    fitCards,
    fitAllCards,
  }
}
