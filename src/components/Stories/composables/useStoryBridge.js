// Parent-frame communication: postMessage events and navigation handoff.
// notify() is shared widely (timeline end, playback controls), so the bridge
// is created early and its notify passed into other layers.
export function useStoryBridge({ endLink }) {
  const notify = msg => {
    try {
      window.parent.postMessage(msg, '*')
    } catch (e) {
      /* noop */
    }
  }

  const getGift = () => {
    notify('bonuses_btn')
    if (!endLink.value) return
    setTimeout(() => {
      window.parent.location.href = endLink.value
    }, 300)
  }

  const closeStory = () => {
    notify('close')
    if (!endLink.value) return
    setTimeout(() => {
      window.parent.location.href = endLink.value
    }, 150)
  }

  const watchAgain = () => {
    setTimeout(() => {
      window.location.reload()
    }, 150)
  }

  return { notify, getGift, closeStory, watchAgain }
}
