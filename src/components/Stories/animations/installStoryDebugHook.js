// DEV-only QA hook exposed on window.__story for manual scene seeking. No-op in
// production builds.
export function installStoryDebugHook(ctx) {
  if (!import.meta.env.DEV) return
  const { tl, videoPlayer, builtIds, segDurations, fitCards, fitAllCards } = ctx

  window.__story = {
    tl,
    video: videoPlayer,
    seek: t => {
      tl.pause()
      tl.time(t)
      if (videoPlayer.value) videoPlayer.value.pause()
    },
    seekSeg: id => {
      tl.pause()
      let t = 0
      for (const sid of builtIds.value) {
        if (sid === id) break
        t += segDurations[sid] || 0
      }
      tl.time(t + 0.9)
      if (videoPlayer.value) videoPlayer.value.pause()
    },
    builtIds,
    fitCards,
    fitAllCards,
  }
}
