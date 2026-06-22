// Viewport sizing (--vh) and per-card font fitting.
//
// Single-line cards (fall/journey/gift) hug their text; long localized strings
// would overflow the viewport. Shrink the font via --fit (<=1) until each card's
// on-screen box fits inside [margin, vw - margin]. Iterating on the real bounding
// rect makes it correct for every anchor (left-pinned journey cards and
// centre-pinned gift/fall cards) and tilt. Recomputed on resize / font swap;
// only meaningful while the card scene is visible.
const CARD_FIT_MARGIN = 12 // px breathing room from each viewport edge
const CARD_FIT_MIN = 0.3 // never shrink below 30% of the design size

export function useViewportFit() {
  const fitCards = rootSel => {
    const seg =
      typeof rootSel === 'string' ? document.querySelector(rootSel) : rootSel
    if (!seg) return
    const cards = seg.querySelectorAll('.fall-card, .journey-card, .gift-card')
    if (!cards.length) return
    const vw = window.innerWidth
    cards.forEach(card => {
      card.style.setProperty('--fit', '1')
      if (!card.getClientRects().length) return // hidden scene: skip
      let fit = 1
      for (let i = 0; i < 6; i++) {
        const r = card.getBoundingClientRect()
        const over = Math.max(
          CARD_FIT_MARGIN - r.left,
          r.right - (vw - CARD_FIT_MARGIN),
          0
        )
        if (over <= 0.5 || r.width <= 0) break
        fit = Math.max(
          CARD_FIT_MIN,
          fit * Math.max(CARD_FIT_MIN, (r.width - 2 * over) / r.width)
        )
        card.style.setProperty('--fit', fit.toFixed(4))
        if (fit <= CARD_FIT_MIN) break
      }
    })
  }

  const fitAllCards = () => fitCards('.text_container')

  const setVh = () => {
    const vh = Math.round(window.innerHeight / 100)
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    fitAllCards()
  }

  // Sets the initial --vh, keeps it in sync on resize, and re-fits once the Sora
  // webfont swaps in (text metrics change after load).
  const initViewport = () => {
    setVh()
    window.addEventListener('resize', setVh)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fitAllCards)
    }
  }

  return { fitCards, fitAllCards, initViewport }
}
