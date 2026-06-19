import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import StoriesTopBar from '@components/Stories/UI/storiesTopBar.vue'
import mobileControlArea from '@components/Stories/UI/mobileControlArea.vue'
import desktopControlButton from '@components/Stories/UI/desktopControlButton.vue'
import desktopPausePlayButton from '@components/Stories/UI/desktopPausePlayButton.vue'
import CloseButton from '@components/Stories/UI/closeButton.vue'
import gsap from 'gsap'
import availableLanguages from '/src/components/Stories/localization/available-languages.json'
import en from '@components/Stories/localization/en.json'
import it from '@components/Stories/localization/it.json'
import de from '@components/Stories/localization/de.json'
import fr from '@components/Stories/localization/fr.json'
import pt from '@components/Stories/localization/pt.json'
import story_icon from '@components/Stories/img/avatar.webp'
import watchAgainIcon from '@components/Stories/img/icons/icon_replay.svg'
import playButton from '@components/Stories/img/icons/play_button.svg'
import top_logo from '@components/Stories/img/top_logo.webp'
import ironCube from '@components/Stories/img/levels/Iron.png'
import bronzeCube from '@components/Stories/img/levels/Bronze.png'
import silverCube from '@components/Stories/img/levels/Silver.png'
import goldCube from '@components/Stories/img/levels/Gold.png'
import platinumCube from '@components/Stories/img/levels/Plathinum.png'
import diamondCube from '@components/Stories/img/levels/Diamond.png'
import slotFrame from '@components/Stories/img/slot-frame.png'

// --- VIP level mapping (decision C) ---------------------------------------
const SHOW_IRON_FOR_REGULAR = true
const LEVEL_CUBES = {
  IRON: ironCube,
  BRONZE: bronzeCube,
  SILVER: silverCube,
  GOLD: goldCube,
  PLATINUM: platinumCube,
  DIAMOND: diamondCube,
}
const LEVEL_WORD_KEY = {
  IRON: 'vip_level_regular',
  REGULAR: 'vip_level_regular',
  BRONZE: 'vip_level_bronze',
  SILVER: 'vip_level_silver',
  GOLD: 'vip_level_gold',
  PLATINUM: 'vip_level_platinum',
  DIAMOND: 'vip_level_diamond',
}

// --- Slot reel geometry (mirrors Figma node 31550:220705) -----------------
// Values are RAW design px (Figma 1080x1920). The CSS variable --reel-y is a
// unitless design-px offset; CSS multiplies it by --u (the cover-canvas scale),
// so geometry stays on the single px() coordinate system and survives resize.
const SLOT_STEP = 183.07 // digit cell (160.973 * 1.1) + 6px gap, design px
const SLOT_BASE = 67.965 // translateY that centres reel cell 0, design px
const SLOT_COPIES = 8 // repeated 0-9 blocks stacked in the reel
const SLOT_REST_COPY = 6 // copy index whose digit rests in the window
const SLOT_SPINS = 3 // full 0-9 cycles travelled before locking
// translateY (design px, *--u in CSS) that centres reel cell `k` in the window
const slotCellY = k => SLOT_BASE - SLOT_STEP * k

// --- Scene config (single source of truth) --------------------------------
// vstart = absolute timecode in animatic (provisional, calibrate in "timecodes" phase).
// dur = display length of the scene's overlay timeline.
// skip = key into the reactive `skip` object (undefined => never skipped).
// Order mirrors the redesigned Figma deck (19 scenes, file cqRRGIY5o8LB7rgm4WV5E2).
// vstart/dur calibrated to animatic.webm (length 117.0s, 2026-06-19). The animatic
// holds 17 visual cuts at ~6s each; two long cuts are shared by two scenes:
//   - the 12s "sparks" cut (77.966-89.966) covers scenes 14 (what game) + 15 (game)
//   - the 15s final cut (101.966-117.0) covers scenes 18 (flameOut) + 19 (final)
// vstart values are contiguous so the background plays without jumps; recalibrate
// once the final motion video lands (durations may shift slightly).
const SCENES = [
  { id: 1, type: 'intro', vstart: 0, dur: 5.966 }, // 220950 VIP logo
  { id: 2, type: 'greeting', vstart: 5.966, dur: 6 }, // 220681 Hi, {name}!
  { id: 3, type: 'slots', vstart: 11.966, dur: 6, skip: 'slots' }, // 220695 day {days}
  { id: 4, type: 'fall', vstart: 17.966, dur: 6 }, // 220747 journey
  { id: 5, type: 'level', vstart: 23.966, dur: 6, skip: 'level' }, // 220801 level cube
  { id: 6, type: 'fall', vstart: 29.966, dur: 6 }, // 220817 moments
  { id: 7, type: 'number', vstart: 35.966, dur: 6, skip: 'top' }, // 220845 top winnings
  { id: 8, type: 'fall', vstart: 41.966, dur: 6 }, // 220760 live tables
  { id: 9, type: 'number', vstart: 47.966, dur: 6, skip: 'live' }, // 220858 live wins
  { id: 10, type: 'netball', vstart: 53.966, dur: 6 }, // 220779 you trusted
  { id: 11, type: 'number', vstart: 59.966, dur: 6, skip: 'betting' }, // 220871 betting wins
  { id: 12, type: 'fall', vstart: 65.966, dur: 6 }, // 220897 experiments
  { id: 13, type: 'number', vstart: 71.966, dur: 6, skip: 'cashback' }, // 220884 cashback
  { id: 14, type: 'fall', vstart: 77.966, dur: 6 }, // 220994 what game
  { id: 15, type: 'game', vstart: 83.966, dur: 6, skip: 'game' }, // 220973 game of season
  { id: 16, type: 'lock', vstart: 89.966, dur: 6 }, // 220909 more rewards
  { id: 17, type: 'number', vstart: 95.966, dur: 6, skip: 'gifts' }, // 220920 gifts (244)
  { id: 18, type: 'flameOut', vstart: 101.966, dur: 6 }, // 220935 season ends
  { id: 19, type: 'final', vstart: 107.966, dur: 9.034 }, // 220942 final / CTA
]

export default {
  name: 'Bonuses',
  components: {
    StoriesTopBar,
    mobileControlArea,
    desktopControlButton,
    desktopPausePlayButton,
    CloseButton,
  },
  setup() {
    const defaultDuration = 0.3
    const reach_end = ref(false)

    const notify = msg => {
      try {
        window.parent.postMessage(msg, '*')
      } catch (e) {
        /* noop */
      }
    }

    const tl = gsap.timeline({
      defaults: { duration: defaultDuration, ease: 'power1.inOut' },
      onUpdate: () => {
        currentTime.value = tl.time()
        if (!reach_end.value && tl.duration() > 0 && tl.progress() > 0.995) {
          reach_end.value = true
          notify('reach_end')
        }
      },
    })

    // Per-segment progress tracking (preserves original "average per segment" model)
    const segTimes = reactive({})
    const segDurations = reactive({})
    const builtIds = ref([])

    // --- Video ---------------------------------------------------------------
    const base = import.meta.env.BASE_URL || '/'
    const videoWebm = ref(`${base}video/animatic.webm`)
    const videoMp4 = ref(`${base}video/animatic.mp4`)
    const videoPlayer = ref(null)

    // --- Data refs -----------------------------------------------------------
    const texts = ref('en')
    const currency = ref('EUR')
    const name = ref('')
    const days = ref(0)
    const level = ref('')
    const top_winnings = ref(0)
    const live_wins = ref(0)
    const betting_wins = ref(0)
    const cashback = ref(0)
    const gifts_count = ref(0)
    const favorite_game_thunbnail = ref('')
    const favorite_game_name = ref('')
    const end_link = ref('')
    const cubeSrc = ref('')
    const levelKey = ref('')

    const skip = reactive({
      slots: true,
      level: true,
      top: true,
      live: true,
      betting: true,
      cashback: true,
      gifts: true,
      game: true,
    })

    // --- UI state ------------------------------------------------------------
    const pressTimer = ref(null)
    const pressDuration = 250
    const longPress = ref(false)
    const currentTime = ref(0)
    const duration = ref(0)
    const isPlaying = ref(true)
    const isPaused = ref(false)
    const numberOfSegments = ref(SCENES.length)
    const isVideoPlaying = ref(false)
    const showPlayButton = ref(false)

    const animationPauseStyle = computed(() => ({
      'animation-play-state': isPaused.value ? 'paused' : 'running',
    }))

    const languageMap = { en, it, de, fr, pt }

    // --- Display computeds ---------------------------------------------------
    const daysDigits = computed(() => String(days.value || '').split(''))
    // Long 0-9 strip so each card can "spin" through several cycles before locking.
    const slotStrip = computed(() => Array.from({ length: SLOT_COPIES * 10 }, (_, k) => k % 10))
    const seasonRhythmLines = computed(() => {
      const text = texts.value.season_rhythm || ''
      if (text === 'Season 2 had its own rhythm.') {
        return ['Season 2', 'had its own rhythm.']
      }
      return text.split('\n').filter(Boolean)
    })
    const dayOfItText = computed(() => (texts.value.day_of_it || '').replace('{days}', days.value))
    const levelName = computed(() => {
      const key = LEVEL_WORD_KEY[levelKey.value]
      return (key && texts.value[key]) || ''
    })
    const topWinnings = computed(() => top_winnings.value)
    const liveWins = computed(() => live_wins.value)
    const bettingWins = computed(() => betting_wins.value)
    const cashbackValue = computed(() => cashback.value)
    const giftsCount = computed(() => gifts_count.value)
    const showGiftBtn = computed(() => !!end_link.value)

    // --- Progress (average over active segments) -----------------------------
    const progress = computed(() => {
      const ids = builtIds.value
      if (!ids.length) return 0
      let sum = 0
      ids.forEach(id => {
        const d = segDurations[id] || 0
        if (d > 0) sum += Math.min(1, (segTimes[id] || 0) / d)
      })
      return (sum / ids.length) * 100
    })

    const segmentStartTimes = computed(() => {
      const arr = [0]
      let cum = 0
      builtIds.value.forEach(id => {
        cum += segDurations[id] || 0
        arr.push(cum)
      })
      return arr
    })

    // --- Playback controls ---------------------------------------------------
    const checkVideoPlayback = () => {
      if (!videoPlayer.value) return
      if (videoPlayer.value.paused) {
        isVideoPlaying.value = false
        showPlayButton.value = true
        tl.pause()
      } else {
        isVideoPlaying.value = true
        showPlayButton.value = false
      }
    }

    const playVideo = () => {
      videoPlayer.value.play()
      tl.play()
      showPlayButton.value = false
    }

    const updateTime = () => {
      /* video timeupdate; master timeline drives currentTime */
    }

    const playerPause = () => {
      setTimeout(() => {
        if (longPress.value) {
          isPlaying.value = false
          isPaused.value = true
          tl.pause()
          videoPlayer.value.pause()
          notify('click_pause')
        }
      }, pressDuration + 10)
    }

    const playerPlay = () => {
      isPlaying.value = true
      isPaused.value = false
      tl.play()
      videoPlayer.value.play()
      if (longPress.value && currentTime.value > 0.4) {
        notify('click_start')
      }
    }

    const togglePlayState = () => {
      if (isPlaying.value) {
        isPlaying.value = false
        isPaused.value = true
        tl.pause()
        videoPlayer.value.pause()
        notify('click_pause')
      } else {
        isPlaying.value = true
        isPaused.value = false
        tl.play()
        videoPlayer.value.play()
        notify('click_start')
      }
    }

    const press = () => {
      playerPause()
      pressTimer.value = setTimeout(() => {
        longPress.value = true
      }, pressDuration)
    }

    const release = direction => {
      clearTimeout(pressTimer.value)
      if (longPress.value) {
        playerPlay()
      } else {
        playerPlay()
        jumpToSegment(direction)
      }
      longPress.value = false
    }

    const handleEvent = (direction, event) => {
      if (event.type === 'touchstart') {
        event.preventDefault()
        press(direction)
      } else if (event.type === 'mousedown') {
        press(direction)
      }
    }

    const handleEventEnd = (direction, event) => {
      if (event.type === 'touchend') {
        event.preventDefault()
        release(direction)
      } else if (event.type === 'mouseup') {
        release(direction)
      }
    }

    const jumpToSegment = direction => {
      const starts = segmentStartTimes.value
      let currentSegment = starts.findIndex((startTime, i) => {
        return currentTime.value >= startTime && currentTime.value < starts[i + 1]
      })
      if (direction === 'backward') {
        if (currentSegment === -1) {
          tl.time(starts[Math.max(0, numberOfSegments.value - 2)] || 0)
        } else {
          let newTime = starts[currentSegment - 1]
          if (newTime == null || newTime < 0) newTime = 0
          tl.time(newTime)
        }
        notify('click_backward')
      } else if (direction === 'forward') {
        if (currentSegment === -1) return
        const newTime = starts[currentSegment + 1]
        if (newTime != null) tl.time(newTime)
        notify('click_forward')
      }
    }

    const getGift = () => {
      notify('bonuses_btn')
      if (!end_link.value) return
      setTimeout(() => {
        window.parent.location.href = end_link.value
      }, 300)
    }

    const closeStory = () => {
      notify('close')
      if (!end_link.value) return
      setTimeout(() => {
        window.parent.location.href = end_link.value
      }, 150)
    }

    const watchAgain = () => {
      setTimeout(() => {
        window.location.reload()
      }, 150)
    }

    // --- Animation builders --------------------------------------------------
    const SEL = id => `#stories-segment-${id}`

    const buildEntrance = (stl, scene) => {
      const root = SEL(scene.id)
      stl.set(root, { display: 'flex' })
      switch (scene.type) {
        case 'intro':
          stl.to(root, { duration: 0.2 })
          break
        case 'greeting':
          stl.from(`${root} .scene-hi`, { opacity: 0, y: '2vh', duration: 0.6 })
          stl.from(
            `${root} .scene-name`,
            { opacity: 0, y: '4vh', scale: 0.85, duration: 0.7, ease: 'back.out(1.6)' },
            '-=0.2'
          )
          break
        case 'slots': {
          const cards = gsap.utils.toArray(`${root} .slot-card`)
          const digits = daysDigits.value
          const restCell = d => SLOT_REST_COPY * 10 + d // resting reel cell
          const SPIN_CYCLE = SLOT_STEP * 10 * SLOT_SPINS // design px travelled
          // Each card locks a bit later so the digits fix one by one (1, then 4, then 3).
          const spinDur = i => 1.0 + i * 0.45

          // 1) cards drop in WITHOUT neon glow
          stl.set(`${root} .slot-neon-frame`, { opacity: 0 })
          stl.from(cards, {
            opacity: 0,
            scale: 0.7,
            y: '5vh',
            duration: 0.5,
            ease: 'back.out(1.6)',
            stagger: 0.1,
          })

          // 2) reels begin to spin
          stl.addLabel('spin')

          // 3) vertical reel spin + sequential lock (1, then 4, then 3)
          let lastLock = 0
          cards.forEach((card, i) => {
            const d = parseInt(digits[i] || '0', 10)
            const reel = card.querySelector('.slot-reel')
            const cells = reel.querySelectorAll('.slot-digit')
            const winner = cells[restCell(d)]
            const dur = spinDur(i)
            const lockAt = 'spin+=' + dur
            lastLock = Math.max(lastLock, dur)
            const startY = slotCellY(restCell(d)) + SPIN_CYCLE
            const restY = slotCellY(restCell(d))

            stl.fromTo(
              reel,
              { '--reel-y': startY },
              {
                '--reel-y': restY,
                duration: dur,
                ease: 'power4.out',
                immediateRender: true,
              },
              'spin'
            )
            // highlight the resting digit + a small lock-in pop
            if (winner) {
              stl.to(winner, { color: '#fafafa', duration: 0.15 }, lockAt)
            }
            stl.to(
              card,
              { scale: 1.05, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' },
              lockAt
            )
          })

          // 4) all three cards ignite together: the neon warms up smoothly
          if (cards.length === 3) {
            stl.fromTo(
              `${root} .slot-neon-frame`,
              { opacity: 0 },
              { opacity: 1, duration: 1.3, ease: 'sine.inOut', immediateRender: false },
              'spin+=' + (lastLock - 0.3)
            )
          }

          // 5) text drops from above, then rises from below
          stl.from(
            `${root} .scene-top-text`,
            { opacity: 0, y: '-4vh', duration: 0.5 },
            'spin+=0.15'
          )
          stl.from(
            `${root} .scene-bottom-text`,
            { opacity: 0, y: '4vh', duration: 0.5 },
            'spin+=' + (spinDur(cards.length - 1) - 0.2)
          )
          break
        }
        case 'fall':
        case 'netball':
          if (scene.id === 4) {
            // Scene 4 cards have exact CSS rotations from Figma.
            // Animate a CSS variable so GSAP does not overwrite rotate().
            stl.fromTo(
              `${root} .journey-card--bottom`,
              { opacity: 0, '--journey-y': '-32dvh' },
              { opacity: 1, '--journey-y': '0dvh', duration: 0.75, ease: 'bounce.out' }
            )
            stl.fromTo(
              `${root} .journey-card--top`,
              { opacity: 0, '--journey-y': '-32dvh' },
              { opacity: 1, '--journey-y': '0dvh', duration: 0.75, ease: 'bounce.out' },
              '-=0.4'
            )
            break
          }
          if (scene.id === 6) {
            // Scene 6 cards have exact CSS rotations from Figma.
            // Animate a CSS variable so GSAP does not overwrite rotate().
            stl.fromTo(
              `${root} .gift-card--bottom`,
              { opacity: 0, '--gift-y': '-32dvh' },
              { opacity: 1, '--gift-y': '0dvh', duration: 0.75, ease: 'bounce.out' }
            )
            stl.fromTo(
              `${root} .gift-card--top`,
              { opacity: 0, '--gift-y': '-32dvh' },
              { opacity: 1, '--gift-y': '0dvh', duration: 0.75, ease: 'bounce.out' },
              '-=0.4'
            )
            break
          }
          // generic card scenes (8/10/12/14/16): cards drop bottom-to-top with a
          // physical bounce. Animate --fall-y so CSS rotate/centering stay intact.
          {
            const fallCards = gsap.utils.toArray(`${root} .fall-card`)
            if (fallCards.length) {
              fallCards
                .slice()
                .reverse()
                .forEach((el, i) => {
                  stl.fromTo(
                    el,
                    { opacity: 0, '--fall-y': '-32dvh' },
                    {
                      opacity: 1,
                      '--fall-y': '0dvh',
                      duration: 0.75,
                      ease: 'bounce.out',
                    },
                    i === 0 ? undefined : '-=0.4'
                  )
                })
              break
            }
          }
          // legacy fallback: blocks drop top->down, lower one first, with a bounce
          stl.from(`${root} .chip--b`, {
            opacity: 0,
            y: '-32vh',
            duration: 0.75,
            ease: 'bounce.out',
          })
          stl.from(
            `${root} .chip--a`,
            { opacity: 0, y: '-32vh', duration: 0.75, ease: 'bounce.out' },
            '-=0.4'
          )
          break
        case 'level':
          // cube descends from above (smaller) and grows to full size
          stl.from(`${root} .cube-img`, {
            opacity: 0,
            y: '-15dvh',
            scale: 0.65,
            duration: 1.0,
            ease: 'power3.out',
          })
          // text lines appear from below sequentially
          stl.from(
            `${root} .scene-cube-top`,
            { opacity: 0, y: '4dvh', duration: 0.45, ease: 'power2.out' },
            '-=0.15'
          )
          stl.from(
            `${root} .scene-cube-level`,
            { opacity: 0, y: '4dvh', duration: 0.45, ease: 'power2.out' },
            '-=0.15'
          )
          stl.from(
            `${root} .scene-cube-bottom`,
            { opacity: 0, y: '4dvh', duration: 0.45, ease: 'power2.out' },
            '-=0.15'
          )
          break
        case 'number':
          stl.from(`${root} .scene-num-label`, { opacity: 0, y: '4vh', duration: 0.5 })
          stl.from(
            `${root} .big-number`,
            { opacity: 0, y: '9vh', scale: 0.8, duration: 0.7, ease: 'back.out(1.5)' },
            '-=0.1'
          )
          break
        case 'game':
          stl.from(`${root} .scene-game-label`, { opacity: 0, y: '-3vh', duration: 0.4 })
          stl.from(`${root} .scene-game-name`, { opacity: 0, y: '-3vh', duration: 0.5 }, '-=0.1')
          stl.from(
            `${root} .game-frame`,
            { opacity: 0, scale: 0.7, duration: 0.7, ease: 'back.out(1.5)' },
            '-=0.1'
          )
          break
        case 'lock':
          stl.from(`${root} .scene-lock-text`, { opacity: 0, y: '4vh', duration: 0.7 })
          break
        case 'flameOut':
          stl.from(`${root} .scene-flame-title`, { opacity: 0, y: '3vh', duration: 0.6 })
          stl.from(`${root} .scene-flame-sub`, { opacity: 0, y: '3vh', duration: 0.5 }, '-=0.2')
          break
        case 'final':
          stl.from(`${root} .scene-final-top`, { opacity: 0, y: '3vh', duration: 0.5 })
          stl.from(
            `${root} .scene-final-name`,
            { opacity: 0, y: '4vh', scale: 0.85, duration: 0.6, ease: 'back.out(1.5)' },
            '-=0.2'
          )
          stl.from(
            `${root} .end_button`,
            { opacity: 0, y: '3vh', duration: 0.5, stagger: 0.15 },
            '-=0.1'
          )
          break
        default:
          stl.to(root, { duration: 0.2 })
      }
    }

    const buildSegment = scene => {
      const stl = gsap.timeline({
        defaults: { duration: defaultDuration, ease: 'power1.inOut' },
        onUpdate: () => {
          segTimes[scene.id] = stl.time()
        },
      })

      stl.add(() => {
        if (!videoPlayer.value) return
        if (Math.abs(videoPlayer.value.currentTime - scene.vstart) > 0.25) {
          videoPlayer.value.currentTime = scene.vstart
        }
        if (videoPlayer.value.paused) {
          videoPlayer.value
            .play()
            .then(() => setTimeout(checkVideoPlayback, 200))
            .catch(() => {
              showPlayButton.value = true
              tl.pause()
            })
        }
      })

      buildEntrance(stl, scene)

      const exitDur = 0.5
      const entranceEnd = stl.duration()
      const holdSpan = Math.max(0.1, scene.dur - exitDur - entranceEnd)
      stl.to(SEL(scene.id), { duration: holdSpan }) // hold
      stl.to(SEL(scene.id), { opacity: 0, duration: exitDur, ease: 'power1.in' })
      stl.set(SEL(scene.id), { display: 'none', opacity: 1 })

      segDurations[scene.id] = stl.duration()
      return stl
    }

    // --- URL params ----------------------------------------------------------
    const toNumber = raw => {
      if (raw == null) return 0
      const cleaned = String(raw).replace(',', '.').replace(/\s/g, '')
      const n = Math.round(Number(cleaned))
      return isNaN(n) ? 0 : n
    }

    const resolveLevel = raw => {
      const lv = (raw || '').trim().toUpperCase()
      if (!lv) return { skip: true }
      if (lv === 'REGULAR') {
        return SHOW_IRON_FOR_REGULAR
          ? { skip: false, cube: LEVEL_CUBES.IRON, key: 'REGULAR' }
          : { skip: true }
      }
      if (LEVEL_CUBES[lv]) return { skip: false, cube: LEVEL_CUBES[lv], key: lv }
      console.warn('[stories] unknown level value:', raw)
      return { skip: true }
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

    onMounted(() => {
      const setVh = () => {
        const vh = Math.round(window.innerHeight / 100)
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      }
      setVh()
      window.addEventListener('resize', setVh)

      parseParams()

      const locale = texts.value
      texts.value = availableLanguages.languages.includes(locale) ? languageMap[locale] : en

      computeSkips()

      // Wait for Vue to render the DOM with parsed data (slot cards, cube,
      // game frame are data-driven). Otherwise GSAP selectors match nothing.
      nextTick(() => {
        // Build only the active segments (data-driven skip), preserving order.
        const built = []
        SCENES.forEach(scene => {
          if (scene.skip && skip[scene.skip]) return
          const stl = buildSegment(scene)
          tl.add(stl)
          built.push(scene.id)
        })
        builtIds.value = built
        numberOfSegments.value = built.length
        duration.value = tl.duration()

        // master timeline was created empty before mount; start it now from 0
        tl.play(0)

        if (import.meta.env.DEV) {
          window.__story = {
            tl,
            video: videoPlayer,
            seek: t => {
              tl.pause()
              tl.time(t)
              if (videoPlayer.value) videoPlayer.value.pause()
            },
            seekSeg: id => {
              tl.pause()
              let t = 0
              for (const sid of builtIds.value) {
                if (sid === id) break
                t += segDurations[sid] || 0
              }
              tl.time(t + 0.9)
              if (videoPlayer.value) videoPlayer.value.pause()
            },
            builtIds,
          }
        }
      })
    })

    return {
      // state
      progress,
      numberOfSegments,
      isPlaying,
      isPaused,
      animationPauseStyle,
      showPlayButton,
      // video
      videoPlayer,
      videoWebm,
      videoMp4,
      updateTime,
      playVideo,
      playButton,
      // data
      texts,
      name,
      days,
      daysDigits,
      slotStrip,
      seasonRhythmLines,
      dayOfItText,
      cubeSrc,
      levelName,
      currency,
      topWinnings,
      liveWins,
      bettingWins,
      cashbackValue,
      giftsCount,
      favorite_game_name,
      favorite_game_thunbnail,
      showGiftBtn,
      // assets
      story_icon,
      top_logo,
      watchAgainIcon,
      slotFrame,
      // actions
      togglePlayState,
      handleEvent,
      handleEventEnd,
      jumpToSegment,
      getGift,
      closeStory,
      watchAgain,
    }
  },
}
