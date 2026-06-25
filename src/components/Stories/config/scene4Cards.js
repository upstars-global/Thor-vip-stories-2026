// Scene 4 "journey" card positions per language.
// cx/cy = visual center of the card in 1080x1920 design space.
// Extracted from Figma get_design_context (visual positions, not metadata bounds).
// tilt = effective visual rotation derived from Figma rotate values:
//   rotate-[-87.85deg] -> tilt = 90 - 87.85 = 2.15deg
//   rotate-[-92.66deg] -> tilt = -(92.66 - 90) = -2.66deg

const CARDS_EN = [
  { cx: 483.17, cy: 870.08, tilt: 2.15, className: 'journey-card--top' },
  { cx: 573.10, cy: 1004.57, tilt: -2.66, className: 'journey-card--bottom' },
]

const CARDS_IT = [
  { cx: 503.66, cy: 870.95, tilt: 2.15, className: 'journey-card--top' },
  { cx: 575.10, cy: 1004.38, tilt: -2.66, className: 'journey-card--bottom' },
]

const CARDS_PT = [
  { cx: 539.68, cy: 870.01, tilt: 2.15, className: 'journey-card--top' },
  { cx: 539.46, cy: 1006.89, tilt: -2.66, className: 'journey-card--bottom' },
]

const CARDS_FR = [
  { cx: 540.16, cy: 873.24, tilt: 2.15, className: 'journey-card--top' },
  { cx: 539.97, cy: 1006.40, tilt: -2.66, className: 'journey-card--bottom' },
]

const CARDS_DE = [
  { cx: 540.16, cy: 868.00, tilt: 2.15, className: 'journey-card--top' },
  { cx: 539.97, cy: 1011.15, tilt: -2.66, className: 'journey-card--bottom' },
]

const LANG_MAP = { en: CARDS_EN, it: CARDS_IT, pt: CARDS_PT, fr: CARDS_FR, de: CARDS_DE }

export function getScene4Positions(lang) {
  return LANG_MAP[lang] || CARDS_EN
}
