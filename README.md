# VIP Stories (Thor)

Season 2 персональних VIP-сторіс: статичний Vue/Vite-застосунок з єдиним
відеофоном та HTML/GSAP-оверлеями, які показують персональні досягнення гравця
і ведуть до фінального CTA.

Проєкт збирається у `dist/`, розміщується на CDN і зазвичай відкривається
всередині продуктового `iframe`.

## Поточний стан

- Реалізовано повний редизайн Season 2.
- Використовується одне універсальне відео:
  - `public/video/animatic.webm`
  - `public/video/animatic.mp4`
- У шаблоні спочатку підключається WebM, далі MP4 fallback. На iPhone/Safari
  використовується MP4.
- Відео виводиться через `object-fit: cover`; поверх нього лежить масштабоване
  overlay-полотно 1080x1920 з текстом, картками, кубами та CTA.
- Порядок, таймкоди й умови пропуску сцен описані в
  `src/components/Stories/config/scenes.js`.
- Відео є master clock: GSAP master timeline синхронізується з
  `video.currentTime`.

## Стек

- Vue 3
- Vite
- GSAP
- SCSS

Команди:

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Структура

Основні файли:

- `src/main.js` - монтує Vue-застосунок.
- `src/App.vue` - рендерить `your_story`.
- `src/components/Stories/your_story.vue` - DOM-шаблон відео, оверлеїв і
  контролів.
- `src/components/Stories/scripts.js` - composition root: стан, computed,
  побудова таймлайна, підключення composables.
- `src/components/Stories/animations/buildAnimations.js` - GSAP entrance/hold/exit
  анімації сцен.
- `src/components/Stories/composables/useStoryData.js` - URL-параметри,
  локалізація та skip-логіка.
- `src/components/Stories/composables/useStoryPlayback.js` - playback, seek,
  sync video -> GSAP, pause/hold controls.
- `src/components/Stories/composables/useStoryBridge.js` - `postMessage` і
  навігація в parent frame.
- `src/components/Stories/composables/useViewportFit.js` - підгонка тексту та
  viewport-related layout.
- `src/components/Stories/styles/styles.scss` - основний layout і CSS transform
  contracts.
- `src/components/Stories/config/*.js` - layout-конфіги окремих сцен.
- `src/components/Stories/localization/*.json` - локалізації.

`vite.config.js` використовує `base: "./"` та alias `@components`, щоб збірку
можна було класти в будь-яку CDN-піддиректорію.

## Сцени й таймкоди

Єдине джерело правди - `SCENES` у `src/components/Stories/config/scenes.js`.
Зараз у проєкті 19 сцен:

```js
{ id: 1, type: 'intro', vstart: 0, dur: 2.25 }
// ...
{ id: 19, type: 'final', vstart: 67.07, dur: 5.06 }
```

Поля:

- `id` - DOM id сцени (`#stories-segment-${id}`).
- `type` - тип entrance-анімації в `buildAnimations.js`.
- `vstart` - абсолютний таймкод початку фонової сцени у відео.
- `dur` - тривалість overlay-сцени; вона не обов'язково дорівнює відстані до
  наступного `vstart`.
- `skip` - ключ в об'єкті `skip`, якщо сцена умовна.

Таймкоди відкалібровані під `public/video/animatic.{webm,mp4}`:
720x1280, 60fps, приблизно 72.133s.

Деякі сцени навмисно мають `dur` трохи довший за фонове вікно: exit zoom
частково заходить поверх наступного кадру, щоб збігатися з дизайнерським
"наїздом" у відео.

## Playback і синхронізація

Основна модель:

1. Фонове `<video>` - master clock.
2. Master GSAP timeline розміщує кожну сцену в абсолютному відеочасі:
   `tl.add(stl, scene.vstart)`.
3. `syncToVideo()` у `requestAnimationFrame` тримає `tl.time()` близько до
   `video.currentTime`.
4. Якщо відео потрапляє в gap від пропущеної сцени, код перескакує до наступної
   побудованої сцени, щоб skipped background не показувався.

Важливі деталі для iPhone/Safari:

- Холодний старт чекає на буфер (`readyState >= HAVE_FUTURE_DATA` і buffered
  lookahead), щоб GSAP не випередив відео.
- Після stall/waiting timeline ставиться на паузу й повертається лише тоді, коли
  відео знову справді відтворюється.
- Ручний seek чекає на `seeked` і наступний `requestVideoFrameCallback`, після
  чого вмикає короткий settle guard. Це захищає entrance-анімації від тремтіння,
  коли iOS ще доганяє decoded frame після seek.
- Фінальна сцена після `ended` утримує GSAP timeline у кінці, а відео окремо
  лупить хвіст. Це потрібно, щоб фінальне ім'я/CTA не перегравали entrance.

## Анімації та CSS contracts

GSAP здебільшого анімує opacity та CSS-змінні, а не перезаписує весь
`transform`. Це зберігає центрування та повороти з CSS:

- `--ey`, `--es` - спільний vertical/scale entrance для текстів, кубів, game frame.
- `--fall-y` - falling cards.
- `--journey-y` - scene 4 cards.
- `--gift-y` - scene 6 cards.
- `--reel-y` - slot reels.
- `--seg-scale` - exit zoom усієї overlay-сцени.

`.stories-segment` промотується в окремий compositor layer через
`will-change: transform` і `backface-visibility: hidden`, щоб iOS/WebKit плавно
масштабував сцену під час exit zoom.

## URL-параметри

Парсинг виконується вручну в `useStoryData.js`: береться query string,
розбивається за `&`/`=`, значення проходять через `decodeURIComponent`.

Приклад:

```text
https://example.com/stories/?name=Sofia&days=143&level=GOLD&top_winnings=1200&live_wins=450&betting_wins=320&cashback=80&gifts_count=4&favorite_game_name=Book%20of%20Ra&favorite_game_thunbnail=https%3A%2F%2Fexample.com%2Fgame.jpg&final_link=https%3A%2F%2Fexample.com%2Fbonus&language=en
```

Актуальні параметри:

| Параметр | Призначення | Умова пропуску |
|---|---|---|
| `name` | Ім'я/нік гравця | Не пропускає сцену |
| `days` | Дні в проєкті, slot-сцена | `< 1` або відсутній -> `slots` skipped |
| `level` | VIP-рівень | Порожній/невідомий -> `level` skipped |
| `top_winnings` | Top winnings number-сцена | `< 1` або відсутній -> skipped |
| `live_wins` | Live wins number-сцена | `< 1` або відсутній -> skipped |
| `betting_wins` | Betting wins number-сцена | `< 1` або відсутній -> skipped |
| `cashback` | Cashback number-сцена | `< 1` або відсутній -> skipped |
| `gifts_count` | Gifts number-сцена | `< 1` або відсутній -> skipped |
| `favorite_game_name` | Назва улюбленої гри | разом із порожнім thumbnail -> `game` skipped |
| `favorite_game_thunbnail` | URL зображення гри | друкарська помилка `thunbnail` збережена в контракті |
| `final_link` | CTA-посилання подарунка | приховує gift CTA, якщо порожній |
| `language` / `user_language` | Локаль | fallback на `navigator.language`, потім `en` |
| `currency` / `user_currency` | Валюта | читається, але в поточних number-сценах не виводиться |

Підтримувані значення `level`:

- `REGULAR` -> показується початковий Iron cube (`SHOW_IRON_FOR_REGULAR = true`).
  Це вхідне значення з продуктового контракту для regular-користувача; окремого
  зображення для нього немає. У Season 1 `REGULAR` пропускав level-сцену, у
  Season 2 за маркетинговою документацією він мапиться на Iron.
- `IRON`
- `BRONZE`
- `SILVER`
- `GOLD`
- `PLATINUM`
- `DIAMOND`

Невідомий або порожній `level` пропускає level-сцену.

## Локалізація

Файли:

- `src/components/Stories/localization/en.json`
- `src/components/Stories/localization/it.json`
- `src/components/Stories/localization/de.json`
- `src/components/Stories/localization/fr.json`
- `src/components/Stories/localization/pt.json`
- `src/components/Stories/localization/available-languages.json`

Щоб додати мову:

1. Створити `localization/<lang>.json` із тими самими ключами, що й `en.json`.
2. Додати код мови в `available-languages.json`.
3. Імпортувати JSON в `useStoryData.js`.
4. Додати його в `languageMap`.

## Інтеграція з parent frame

Компонент надсилає події через `window.parent.postMessage(msg, '*')`:

- `reach_end` - master timeline дійшов до фіналу.
- `bonuses_btn` - користувач натиснув CTA подарунка.
- `close` - користувач закрив сторіс.
- `click_backward` / `click_forward` - ручна навігація.
- `click_pause` / `click_start` - пауза/відновлення.

Навігація:

- `getGift()` надсилає `bonuses_btn`, а через 300ms переводить
  `window.parent.location.href` на `final_link`.
- `closeStory()` надсилає `close`, а через 150ms також переводить parent на
  `final_link`, якщо він заданий.
- `watchAgain()` перезавантажує поточну сторінку.

## Контроли

- Mobile: ліва/права tap-зона через `mobileControlArea`.
- Short tap: перехід назад/уперед до побудованої сцени.
- Long press > 250ms: pause/hold, release відновлює playback.
- Desktop: стрілки та pause/play button.
- Progress bar рахує лише побудовані (не skipped) сцени.

Paused navigation спеціально приземляється не у `vstart`, а після entrance-секції,
щоб користувач бачив зібрану сцену, а не opacity 0 / картки в польоті.

## QA-чеклист

Перед деплоєм перевірити:

- `npm run build` проходить.
- iPhone Safari: лінійний перегляд без тремтіння на zoom-переходах.
- iPhone Safari: ручне перемотування на сценах із кубом, falling cards і netball.
- Фінальна сцена: ім'я та CTA не зменшуються й не зникають після `ended`.
- Paused navigation: сцени показуються вже зібраними.
- Skip cases: відсутні параметри не показують порожні сцени й не ламають
  progress bar.
- `final_link` порожній і непорожній.
- Усі локалі з `available-languages.json`.

## Робота з відео

Актуальні runtime-файли:

- `public/video/animatic.mp4`
- `public/video/animatic.webm`

Рекомендації для наступних версій відео:

- MP4: без audio track, `+faststart`, keyframe/GOP близько 1 секунди.
- WebM: без audio track, keyframe/GOP близько 1 секунди.
- Після зміни відео потрібно звірити `vstart`/`dur` у `config/scenes.js`.
- WebM GOP особливо важливий для Chrome/Android; iPhone/Safari використовує MP4.

`public/video/old/` може використовуватися як локальний бекап, але не має
потрапляти в git.
