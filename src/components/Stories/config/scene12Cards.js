// Scene 12 "experiments" card positions per language.
// cx/cy = visual center of the card in 1080x1920 design space.
// Extracted from Figma get_design_context (NOT get_metadata which reports
// axis-aligned bounding boxes that are shifted for rotated frames).
// tilt = effective visual rotation derived from Figma rotate values:
//   rotate-[-87.85deg] → tilt = 90 - 87.85 = 2.15deg
//   rotate-[-92.66deg] → tilt = -(92.66 - 90) = -2.66deg
//   rotate-[-88.66deg] → tilt = 90 - 88.66 = 1.34deg

const CARDS_EN = [
  { cx: 539.71, cy: 1318.74, tilt: 2.15, className: 'fall-card--a' },
  { cx: 539.66, cy: 1456.78, tilt: -2.66, className: 'fall-card--b' },
]

const CARDS_IT = [
  { cx: 539.71, cy: 1249.25, tilt: 2.15, className: 'fall-card--a' },
  { cx: 430.86, cy: 1380.09, tilt: -2.66, className: 'fall-card--b' },
  { cx: 593.82, cy: 1520.62, tilt: 1.34, className: 'fall-card--a' },
]

const CARDS_PT = [
  { cx: 539.71, cy: 1247.12, tilt: 2.15, className: 'fall-card--a' },
  { cx: 539.53, cy: 1380.87, tilt: -2.66, className: 'fall-card--b' },
  { cx: 539.50, cy: 1519.89, tilt: 1.34, className: 'fall-card--a' },
]

const CARDS_FR = [
  { cx: 540.12, cy: 1249.41, tilt: 2.15, className: 'fall-card--a' },
  { cx: 539.94, cy: 1379.78, tilt: -2.66, className: 'fall-card--b' },
  { cx: 539.91, cy: 1521.51, tilt: 1.34, className: 'fall-card--a' },
]

const CARDS_DE = [
  { cx: 539.64, cy: 1247.22, tilt: 2.15, className: 'fall-card--a' },
  { cx: 539.99, cy: 1382.43, tilt: -2.66, className: 'fall-card--b' },
  { cx: 540.01, cy: 1519.79, tilt: 1.34, className: 'fall-card--a' },
]

const LANG_MAP = { en: CARDS_EN, it: CARDS_IT, pt: CARDS_PT, fr: CARDS_FR, de: CARDS_DE }

export function getScene12Positions(lang) {
  return LANG_MAP[lang] || CARDS_EN
}
