// Scene 14 "what game" card positions per language.
// cx/cy = visual center of the card in 1080x1920 design space.
// Extracted from Figma get_design_context (visual positions, not bounding boxes).
// EN/FR/DE have 3 cards; IT/PT have 2 cards (text merged differently).

const CARDS_EN = [
  { cx: 540.12, cy: 823.50, tilt: 2.15, className: 'fall-card--a' },
  { cx: 466.35, cy: 966.44, tilt: -2.66, className: 'fall-card--b' },
  { cx: 590.93, cy: 1114.67, tilt: 0, className: 'fall-card--a' },
]

const CARDS_IT = [
  { cx: 564.98, cy: 884.70, tilt: 2.15, className: 'fall-card--a' },
  { cx: 491.15, cy: 1033.65, tilt: -2.66, className: 'fall-card--b' },
]

const CARDS_PT = [
  { cx: 539.63, cy: 883.87, tilt: 2.15, className: 'fall-card--a' },
  { cx: 539.37, cy: 1034.51, tilt: -2.66, className: 'fall-card--b' },
]

const CARDS_FR = [
  { cx: 539.64, cy: 817.03, tilt: 2.15, className: 'fall-card--a' },
  { cx: 539.38, cy: 960.95, tilt: -2.66, className: 'fall-card--b' },
  { cx: 539.64, cy: 1103.03, tilt: 2.15, className: 'fall-card--a' },
]

const CARDS_DE = [
  { cx: 540.18, cy: 808.66, tilt: 2.15, className: 'fall-card--a' },
  { cx: 539.50, cy: 954.99, tilt: -0.68, className: 'fall-card--b' },
  { cx: 539.61, cy: 1103.18, tilt: 2.15, className: 'fall-card--a' },
]

const LANG_MAP = { en: CARDS_EN, it: CARDS_IT, pt: CARDS_PT, fr: CARDS_FR, de: CARDS_DE }

export function getScene14Positions(lang) {
  return LANG_MAP[lang] || CARDS_EN
}
