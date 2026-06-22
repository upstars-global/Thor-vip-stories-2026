// --- Slot reel geometry (mirrors Figma node 31550:220705) -----------------
// Values are RAW design px (Figma 1080x1920). The CSS variable --reel-y is a
// unitless design-px offset; CSS multiplies it by --u (the cover-canvas scale),
// so geometry stays on the single px() coordinate system and survives resize.
export const SLOT_STEP = 183.07 // digit cell (160.973 * 1.1) + 6px gap, design px
export const SLOT_BASE = 67.965 // translateY that centres reel cell 0, design px
export const SLOT_COPIES = 8 // repeated 0-9 blocks stacked in the reel
export const SLOT_REST_COPY = 6 // copy index whose digit rests in the window
export const SLOT_SPINS = 3 // full 0-9 cycles travelled before locking

// translateY (design px, *--u in CSS) that centres reel cell `k` in the window
export const slotCellY = k => SLOT_BASE - SLOT_STEP * k
