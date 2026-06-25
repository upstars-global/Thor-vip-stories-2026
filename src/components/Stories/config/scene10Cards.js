// Scene 10 "trusted feeling" card positions per language.
// cx/cy = visual center of the card in 1080x1920 design space.
// Extracted from Figma get_design_context (visual positions, not metadata bounds).
// EN/IT/PT have 2 cards; FR/DE have 3 cards (text split differently).
// tilt = effective visual rotation derived from Figma rotate values:
//   rotate-[-87.85deg] -> tilt = 90 - 87.85 = 2.15deg
//   rotate-[-92.66deg] -> tilt = -(92.66 - 90) = -2.66deg
//   rotate-[-91.39deg] -> tilt = -(91.39 - 90) = -1.39deg

const CARDS_EN = [
  { cx: 539.62, cy: 1296.86, tilt: 2.15, className: 'fall-card--a' },
  { cx: 647.77, cy: 1466.94, tilt: -2.66, className: 'fall-card--b' },
]

const CARDS_IT = [
  { cx: 498.13, cy: 1296.03, tilt: 2.15, className: 'fall-card--a' },
  { cx: 623.77, cy: 1469.26, tilt: -2.66, className: 'fall-card--b' },
]

const CARDS_PT = [
  { cx: 539.61, cy: 1298.60, tilt: 2.15, className: 'fall-card--a' },
  { cx: 610.77, cy: 1467.06, tilt: -2.66, className: 'fall-card--b' },
]

const CARDS_FR = [
  { cx: 533.18, cy: 1234.32, tilt: 2.15, className: 'fall-card--a' },
  { cx: 462.58, cy: 1375.94, tilt: -1.39, className: 'fall-card--b' },
  { cx: 558.67, cy: 1523.84, tilt: 2.15, className: 'fall-card--a' },
]

const CARDS_DE = [
  { cx: 540.12, cy: 1240.83, tilt: 2.15, className: 'fall-card--a' },
  { cx: 539.73, cy: 1379.18, tilt: -1.39, className: 'fall-card--b' },
  { cx: 540.16, cy: 1523.63, tilt: 2.15, className: 'fall-card--a' },
]

const LANG_MAP = { en: CARDS_EN, it: CARDS_IT, pt: CARDS_PT, fr: CARDS_FR, de: CARDS_DE }

export function getScene10Positions(lang) {
  return LANG_MAP[lang] || CARDS_EN
}
