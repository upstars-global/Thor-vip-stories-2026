// Scene 17 "gifts collection" number layout per language.
// Values are raw 1080x1920 Figma design units.
// The label/number remain separate DOM nodes so GSAP can animate them separately.

const DEFAULT_LAYOUT = {
  labelTop: 716,
  labelWidth: 900,
  numberTop: 739,
}

const LAYOUTS = {
  en: DEFAULT_LAYOUT,
  it: DEFAULT_LAYOUT,
  pt: DEFAULT_LAYOUT,
  fr: DEFAULT_LAYOUT,
  de: {
    labelTop: 647,
    labelWidth: 897,
    numberTop: 739,
  },
}

export function getScene17NumberLayout(lang) {
  return LAYOUTS[lang] || DEFAULT_LAYOUT
}
