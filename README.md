# VIP Stories (Thor) — Season 2

Персоналізовані VIP-сторіс: Vue/Vite SPA з відеофоном і GSAP-оверлеями.
Збирається у `dist/`, деплоїться на CDN, відкривається в продуктовому `iframe`.

## Запуск

```bash
npm install
npm run dev       # Vite dev server (--host 0.0.0.0)
npm run build     # production build → dist/
npm run preview   # preview production build
```

## Деплой

`vite.config.js` має `base: "./"` — збірку можна класти в будь-яку CDN-піддиректорію.
Готовий `dist/` вбудовується на домен продукту через `iframe`.

## Архітектура (коротко)

- Одне універсальне відео (`public/video/animatic.{webm,mp4}`) є master clock.
- Поверх відео — масштабований 1080×1920 overlay-canvas з GSAP-анімаціями.
- Конфіг сцен (порядок, таймкоди, skip-умови): `src/components/Stories/config/scenes.js`.
- Логіка розділена на composables: `useStoryPlayback`, `useStoryData`, `useStoryBridge`, `useViewportFit`.
- Анімації будуються в `animations/buildAnimations.js` за типом сцени.

## URL-параметри

Персоналізація приходить через query string. Повний приклад:

```
?name=Sofia&days=143&level=GOLD&top_winnings=1200&live_wins=450&betting_wins=320&cashback=80&gifts_count=4&favorite_game_name=Book%20of%20Ra&favorite_game_thunbnail=https%3A%2F%2Fcdn.example.com%2Fgame.jpg&final_link=https%3A%2F%2Fexample.com%2Fbonus&language=en
```

| Параметр | Що робить | Коли сцена пропускається |
|---|---|---|
| `name` | Ім'я гравця | Ніколи |
| `days` | Slot-сцена (дні в проєкті) | `< 1` або відсутній |
| `level` | VIP-рівень (куб) | Порожній або невідомий |
| `top_winnings` | Number-сцена | `< 1` або відсутній |
| `live_wins` | Number-сцена | `< 1` або відсутній |
| `betting_wins` | Number-сцена | `< 1` або відсутній |
| `cashback` | Number-сцена | `< 1` або відсутній |
| `gifts_count` | Number-сцена | `< 1` або відсутній |
| `favorite_game_name` | Game-сцена | Обидва game-поля порожні |
| `favorite_game_thunbnail` | Картинка гри | Обидва game-поля порожні |
| `final_link` | CTA-посилання | Кнопка подарунка прихована |
| `language` / `user_language` | Локаль | fallback: `navigator.language` → `en` |
| `currency` / `user_currency` | Валюта | Читається, але не виводиться |

**Рівні:** `IRON`, `BRONZE`, `SILVER`, `GOLD`, `PLATINUM`, `DIAMOND`.
`REGULAR` → показує Iron cube (продуктовий контракт Season 2).
Порожній/невідомий → level-сцена пропускається.

> Друкарська помилка `thunbnail` — збережена в контракті для сумісності.

## Локалізація

Файли: `src/components/Stories/localization/{en,it,de,fr,pt}.json`.

Додати мову:
1. Створити `<lang>.json` з ключами як у `en.json`.
2. Додати код у `available-languages.json`.
3. Імпортувати та додати в `languageMap` у `useStoryData.js`.

## Інтеграція (postMessage)

Події, які надсилаються в parent frame:

| Подія | Коли |
|---|---|
| `reach_end` | Timeline дійшов до фіналу |
| `bonuses_btn` | Натиснуто CTA подарунка |
| `close` | Натиснуто хрестик |
| `click_forward` / `click_backward` | Навігація між сценами |
| `click_pause` / `click_start` | Пауза / відновлення |

`getGift()` і `closeStory()` після події переводять `window.parent.location.href` на `final_link`.

## Робота з відео

- Після заміни відео — звірити `vstart`/`dur` у `config/scenes.js`.
- Рекомендації: без audio track, `+faststart`, GOP ≈ 1 секунда.
- `public/video/old/` — локальний бекап, в git не потрапляє.
