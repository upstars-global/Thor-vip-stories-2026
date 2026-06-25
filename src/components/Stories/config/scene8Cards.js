// Scene 8 "live tables" card positions per language.
// cx/cy = visual center of the card in 1080x1920 design space.
// Extracted from Figma get_design_context.
// tilt = effective visual rotation derived from Figma rotate values:
//   rotate-[-87.85deg] → tilt = 90 - 87.85 = 2.15deg
//   rotate-[-92.66deg] → tilt = -(92.66 - 90) = -2.66deg
//   rotate-[-91.33deg] → tilt = -(91.33 - 90) = -1.33deg

const CARDS_EN = [
  { cx: 449.67, cy: 1215.17, tilt: 2.15, className: 'fall-card--a' },
  { cx: 578.15, cy: 1347.59, tilt: -2.66, className: 'fall-card--b' },
  { cx: 713.18, cy: 1481.34, tilt: 2.15, className: 'fall-card--a' },
]

const CARDS_IT = [
  { cx: 351.19, cy: 1212.12, tilt: 2.15, className: 'fall-card--a' },
  { cx: 544.11, cy: 1346.52, tilt: -2.66, className: 'fall-card--b' },
  { cx: 679.24, cy: 1484.56, tilt: 2.15, className: 'fall-card--a' },
]

const CARDS_PT = [
  { cx: 539.62, cy: 1179.24, tilt: 2.15, className: 'fall-card--a' },
  { cx: 539.95, cy: 1308.13, tilt: -2.66, className: 'fall-card--b' },
  { cx: 539.67, cy: 1443.19, tilt: 2.15, className: 'fall-card--a' },
]

const CARDS_FR = [
  { cx: 539.61, cy: 1237.44, tilt: 2.15, className: 'fall-card--a' },
  { cx: 539.95, cy: 1369.36, tilt: -2.66, className: 'fall-card--b' },
]

const CARDS_DE = [
  { cx: 540.14, cy: 1158.77, tilt: 2.15, className: 'fall-card--a' },
  { cx: 540.31, cy: 1291.45, tilt: -1.33, className: 'fall-card--b' },
  { cx: 540.14, cy: 1433.77, tilt: 2.15, className: 'fall-card--a' },
]

const LANG_MAP = { en: CARDS_EN, it: CARDS_IT, pt: CARDS_PT, fr: CARDS_FR, de: CARDS_DE }

export function getScene8Positions(lang) {
  return LANG_MAP[lang] || CARDS_EN
}
