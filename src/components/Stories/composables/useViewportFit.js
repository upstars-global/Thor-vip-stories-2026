// Viewport sizing and content fitting.
//
// Single-line cards (fall/journey/gift) hug their text; long localized strings
// would overflow the viewport. Shrink the font via --fit (<=1) until each card's
// on-screen box fits inside [margin, vw - margin]. Iterating on the real bounding
// rect makes it correct for every anchor (left-pinned journey cards and
// centre-pinned gift/fall cards) and tilt. Recomputed on resize / font swap;
// only meaningful while the card scene is visible.
const CARD_FIT_MARGIN = 12 // px breathing room from each viewport edge
const CARD_FIT_MIN = 0.3 // never shrink below 30% of the design size
const NUMBER_FIT_MARGIN = 18
const NUMBER_FIT_MIN = 0.42
const GAME_FRAME_OFFSET_VAR = '--game-frame-offset'

export function useViewportFit() {
  const resolveRoot = rootSel =>
    typeof rootSel === 'string' ? document.querySelector(rootSel) : rootSel

  const viewportBounds = root => {
    const rect = root.getBoundingClientRect()
    if (rect.width > 0) {
      return {
        left: rect.left,
        right: rect.right,
      }
    }

    return {
      left: 0,
      right: window.innerWidth,
    }
  }

  const fitInlineToBounds = (element, options) => {
    const { fitVar, minFit, margin, bounds } = options
    element.style.setProperty(fitVar, '1')
    if (!element.getClientRects().length) return

    let fit = 1
    for (let i = 0; i < 6; i++) {
      const rect = element.getBoundingClientRect()
      const over = Math.max(
        bounds.left + margin - rect.left,
        rect.right - (bounds.right - margin),
        0
      )

      if (over <= 0.5 || rect.width <= 0) break

      fit = Math.max(
        minFit,
        fit * Math.max(minFit, (rect.width - 2 * over) / rect.width)
      )
      element.style.setProperty(fitVar, fit.toFixed(4))
      if (fit <= minFit) break
    }
  }

  const fitCards = rootSel => {
    const seg = resolveRoot(rootSel)
    if (!seg) return
    const cards = seg.querySelectorAll('.fall-card, .journey-card, .gift-card')
    if (!cards.length) return
    const bounds = viewportBounds(seg)
    cards.forEach(card => {
      fitInlineToBounds(card, {
        fitVar: '--fit',
        minFit: CARD_FIT_MIN,
        margin: CARD_FIT_MARGIN,
        bounds,
      })
    })
  }

  const fitNumbers = rootSel => {
    const seg = resolveRoot(rootSel)
    if (!seg) return
    const numbers = seg.querySelectorAll('.big-number')
    if (!numbers.length) return
    const bounds = viewportBounds(seg)
    const availableWidth = Math.max(0, bounds.right - bounds.left - NUMBER_FIT_MARGIN * 2)
    numbers.forEach(number => {
      number.style.setProperty('--number-fit', '1')
      if (!number.getClientRects().length || availableWidth <= 0) return

      let fit = 1
      for (let i = 0; i < 6; i++) {
        const contentWidth = number.getBoundingClientRect().width
        if (contentWidth <= availableWidth + 0.5 || contentWidth <= 0) break

        fit = Math.max(NUMBER_FIT_MIN, fit * (availableWidth / contentWidth))
        number.style.setProperty('--number-fit', fit.toFixed(4))
        if (fit <= NUMBER_FIT_MIN) break
      }
    })
  }

  const getTextLineRects = element => {
    const range = document.createRange()
    range.selectNodeContents(element)
    const rects = Array.from(range.getClientRects()).filter(rect => rect.width > 0 && rect.height > 0)
    range.detach()

    return rects.filter((rect, index) => {
      const prev = rects[index - 1]
      return !prev || Math.abs(rect.top - prev.top) > 1
    })
  }

  const fitGameFrame = rootSel => {
    const root = resolveRoot(rootSel)
    if (!root) return

    const scenes =
      root.id === 'stories-segment-15'
        ? [root]
        : Array.from(root.querySelectorAll('#stories-segment-15'))

    scenes.forEach(scene => {
      scene.style.setProperty(GAME_FRAME_OFFSET_VAR, '0px')

      const gameName = scene.querySelector('.scene-game-name')
      if (!gameName || !gameName.getClientRects().length) return

      const lineRects = getTextLineRects(gameName)
      if (lineRects.length !== 1) return

      const lineHeight = lineRects[0]?.height || gameName.getBoundingClientRect().height
      scene.style.setProperty(GAME_FRAME_OFFSET_VAR, `${-lineHeight}px`)
    })
  }

  const fitSceneContent = rootSel => {
    const seg =
      typeof rootSel === 'string' ? document.querySelector(rootSel) : rootSel
    if (!seg) return
    fitCards(seg)
    fitNumbers(seg)
    fitGameFrame(seg)
  }

  const fitAllCards = () => fitSceneContent('.text_container')

  // Re-fits overlays on the initial layout, keeps them in sync on resize, and
  // re-fits once the Sora webfont swaps in (text metrics change after load).
  // Root/viewport height is now anchored in CSS via 100svh, so there is no
  // longer a JS-driven --vh custom property to maintain.
  const initViewport = () => {
    fitAllCards()
    window.addEventListener('resize', fitAllCards)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fitAllCards)
    }
  }

  return { fitCards: fitSceneContent, fitAllCards, initViewport }
}
