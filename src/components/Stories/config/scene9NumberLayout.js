// Scene 9 "live wins" number layout per language.
// Values are raw 1080x1920 Figma design units.
// The label/number remain separate DOM nodes so GSAP can animate them separately.

const DEFAULT_LAYOUT = {
  labelTop: 684,
  labelWidth: 910,
  numberTop: 776,
}

const LAYOUTS = {
  en: DEFAULT_LAYOUT,
  it: DEFAULT_LAYOUT,
  pt: DEFAULT_LAYOUT,
  fr: DEFAULT_LAYOUT,
  de: {
    labelTop: 617,
    labelWidth: 963,
    numberTop: 776,
  },
}

export function getScene9NumberLayout(lang) {
  return LAYOUTS[lang] || DEFAULT_LAYOUT
}
