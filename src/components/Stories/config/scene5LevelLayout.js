// Scene 5 "VIP level" text layout per language.
// Values are raw 1080x1920 Figma design units.
// EN has a single-line top copy; localized versions can use two lines.

const LOCALIZED_LAYOUT = {
  topTextTop: 1242,
  levelTop: 1394,
  bottomTextTop: 1529,
}

const LAYOUTS = {
  en: {
    topTextTop: 1311,
    levelTop: 1394,
    bottomTextTop: 1529,
  },
  it: LOCALIZED_LAYOUT,
  pt: LOCALIZED_LAYOUT,
  fr: LOCALIZED_LAYOUT,
  de: LOCALIZED_LAYOUT,
}

export function getScene5LevelLayout(lang) {
  return LAYOUTS[lang] || LOCALIZED_LAYOUT
}
