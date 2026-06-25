import availableLanguages from '/src/components/Stories/localization/available-languages.json'
import en from '@components/Stories/localization/en.json'
import it from '@components/Stories/localization/it.json'
import de from '@components/Stories/localization/de.json'
import fr from '@components/Stories/localization/fr.json'
import pt from '@components/Stories/localization/pt.json'
import { resolveLevel } from '../config/levelConfig.js'

const languageMap = { en, it, de, fr, pt }

// URL query parsing, locale resolution and scene-skip computation.
// Mutates the shared refs/skip passed from the composition root; the manual
// query parsing and param names are preserved exactly.
export function useStoryData(refs) {
  const {
    texts,
    lang,
    currency,
    name,
    days,
    level,
    top_winnings,
    live_wins,
    betting_wins,
    cashback,
    gifts_count,
    favorite_game_thunbnail,
    favorite_game_name,
    end_link,
    cubeSrc,
    levelKey,
    skip,
  } = refs

  const toNumber = raw => {
    if (raw == null) return 0
    const cleaned = String(raw).replace(',', '.').replace(/\s/g, '')
    const n = Math.round(Number(cleaned))
    return isNaN(n) ? 0 : n
  }

  const parseParams = () => {
    const fullURL = window.location.href
    const queryStartIndex = fullURL.indexOf('?')
    if (queryStartIndex === -1) {
      const defaultLanguage = navigator.language.split('-')[0]
      if (availableLanguages.languages.includes(defaultLanguage)) {
        texts.value = defaultLanguage
      }
      return
    }
    const params = fullURL
      .slice(queryStartIndex + 1)
      .split('&')
      .reduce((acc, pair) => {
        const [key, value] = pair.split('=')
        if (key) acc[key] = decodeURIComponent(value || '')
        return acc
      }, {})

    if (params.language) texts.value = params.language
    if (params.user_language) texts.value = params.user_language
    if (params.currency) currency.value = params.currency
    if (params.user_currency) currency.value = params.user_currency

    if (params.name) name.value = params.name.replace(/\+/g, ' ')
    if (params.days) days.value = toNumber(params.days)
    if (params.level) level.value = params.level
    if (params.top_winnings) top_winnings.value = toNumber(params.top_winnings)
    if (params.live_wins) live_wins.value = toNumber(params.live_wins)
    if (params.betting_wins) betting_wins.value = toNumber(params.betting_wins)
    if (params.cashback) cashback.value = toNumber(params.cashback)
    if (params.gifts_count) gifts_count.value = toNumber(params.gifts_count)
    if (params.favorite_game_thunbnail)
      favorite_game_thunbnail.value = params.favorite_game_thunbnail
    if (params.favorite_game_name)
      favorite_game_name.value = params.favorite_game_name.replace(/\+/g, ' ')
    if (params.final_link) end_link.value = params.final_link
  }

  // Swap the locale code (e.g. 'en') for its translation object, falling back to
  // English for unknown codes.
  const applyLocale = () => {
    const locale = texts.value
    lang.value = availableLanguages.languages.includes(locale) ? locale : 'en'
    texts.value = availableLanguages.languages.includes(locale)
      ? languageMap[locale]
      : en
  }

  const computeSkips = () => {
    skip.slots = !days.value || days.value < 1
    const lvl = resolveLevel(level.value)
    skip.level = lvl.skip
    cubeSrc.value = lvl.cube || ''
    levelKey.value = lvl.key || ''
    // Number scenes show only when the param is passed with a real value (>= 1).
    // Missing param (defaults to 0) or an explicit 0 => scene is skipped.
    skip.top = !(top_winnings.value >= 1)
    skip.live = !(live_wins.value >= 1)
    skip.betting = !(betting_wins.value >= 1)
    skip.cashback = !(cashback.value >= 1)
    skip.gifts = !(gifts_count.value >= 1)
    skip.game = !(favorite_game_name.value || favorite_game_thunbnail.value)
  }

  return { parseParams, applyLocale, computeSkips }
}
