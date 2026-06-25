// Scene 19 final copy layout per language.
// top/width/gap are raw 1080x1920 Figma design units.
// The copy group matches Figma's vertical layout while the child text nodes keep
// their own GSAP entrance animation contract.

const DEFAULT_LAYOUT = { top: 837, width: 923, gap: 23 }

const LAYOUTS = {
  en: DEFAULT_LAYOUT,
  it: { top: 803, width: 923, gap: 23 },
  pt: { top: 803, width: 923, gap: 23 },
  fr: DEFAULT_LAYOUT,
  de: DEFAULT_LAYOUT,
}

export function getScene19FinalLayout(lang) {
  return LAYOUTS[lang] || DEFAULT_LAYOUT
}
