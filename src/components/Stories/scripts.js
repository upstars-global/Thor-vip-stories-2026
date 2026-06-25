import { ref, reactive, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import StoriesTopBar from '@components/Stories/UI/storiesTopBar.vue'
import mobileControlArea from '@components/Stories/UI/mobileControlArea.vue'
import desktopControlButton from '@components/Stories/UI/desktopControlButton.vue'
import desktopPausePlayButton from '@components/Stories/UI/desktopPausePlayButton.vue'
import CloseButton from '@components/Stories/UI/closeButton.vue'
import gsap from 'gsap'
import story_icon from '@components/Stories/img/avatar.webp'
import watchAgainIcon from '@components/Stories/img/icons/icon_replay.svg'
import playButton from '@components/Stories/img/icons/play_button.svg'
import slotFrame from '@components/Stories/img/slot-frame.webp'
import gameFireFrame from '@components/Stories/img/game-fire-frame.webp'
import { LEVEL_WORD_KEY } from './config/levelConfig.js'
import { SLOT_COPIES } from './config/slotGeometry.js'
import { SCENES } from './config/scenes.js'
import { getScene4Positions } from './config/scene4Cards.js'
import { getScene5LevelLayout } from './config/scene5LevelLayout.js'
import { getScene10Positions } from './config/scene10Cards.js'
import { getScene12Positions } from './config/scene12Cards.js'
import { getScene14Positions } from './config/scene14Cards.js'
import { getScene17NumberLayout } from './config/scene17NumberLayout.js'
import { getScene8Positions } from './config/scene8Cards.js'
import { getScene9NumberLayout } from './config/scene9NumberLayout.js'
import { getScene19FinalLayout } from './config/scene19FinalLayout.js'
import { useStoryBridge } from './composables/useStoryBridge.js'
import { useViewportFit } from './composables/useViewportFit.js'
import { useStoryPlayback } from './composables/useStoryPlayback.js'
import { useStoryData } from './composables/useStoryData.js'
import { createAnimations } from './animations/buildAnimations.js'
import { installStoryDebugHook } from './animations/installStoryDebugHook.js'

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
    // === Shared state (composition root) ===================================
    // All reactive state lives here and is injected into the composables /
    // animation builders below, so there is a single source of truth.
    const defaultDuration = 0.3
    const reach_end = ref(false)

    // Per-segment progress tracking (preserves original "average per segment" model)
    const segTimes = reactive({})
    const segDurations = reactive({})
    const segEntranceEnds = reactive({})
    const builtIds = ref([])

    // --- Video ---------------------------------------------------------------
    const base = import.meta.env.BASE_URL || '/'
    const videoWebm = ref(`${base}video/animatic.webm`)
    const videoMp4 = ref(`${base}video/animatic.mp4`)
    const videoPlayer = ref(null)

    // --- Data refs -----------------------------------------------------------
    const texts = ref('en')
    const lang = ref('en')
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
    const longPress = ref(false)
    const currentTime = ref(0)
    const duration = ref(0)
    const isPlaying = ref(true)
    const isPaused = ref(false)
    const numberOfSegments = ref(SCENES.length)
    const showPlayButton = ref(false)
    // True while we hold playback waiting for a safe video buffer (cold start).
    // Drives the Vue loading overlay; cleared by useStoryPlayback once playing.
    const isBuffering = ref(false)

    // === Parent-frame bridge (notify is shared with timeline + playback) =====
    const { notify, getGift, closeStory, watchAgain } = useStoryBridge({
      endLink: end_link,
    })

    // === Master timeline =====================================================
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

    const animationPauseStyle = computed(() => ({
      'animation-play-state': isPaused.value ? 'paused' : 'running',
    }))

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

    const journeyCards = computed(() => {
      const cards = [texts.value.every_journey, texts.value.leaves_mark].filter(Boolean)
      const positions = getScene4Positions(lang.value)
      return cards.map((text, i) => ({
        text,
        ...(positions[i] || positions[0]),
      }))
    })

    const trustedCards = computed(() => {
      const cards = texts.value.trusted_cards || []
      const positions = getScene10Positions(lang.value)
      return cards.map((text, i) => ({
        text,
        ...(positions[i] || positions[0]),
      }))
    })

    const levelLayoutStyle = computed(() => {
      const layout = getScene5LevelLayout(lang.value)
      return {
        '--level-top-text-top': layout.topTextTop,
        '--level-name-top': layout.levelTop,
        '--level-bottom-text-top': layout.bottomTextTop,
      }
    })

    const experimentCards = computed(() => {
      const cards = texts.value.experiment_cards || []
      const positions = getScene12Positions(lang.value)
      return cards.map((text, i) => ({
        text,
        ...(positions[i] || positions[0]),
      }))
    })

    const gameCards = computed(() => {
      const cards = texts.value.game_cards || []
      const positions = getScene14Positions(lang.value)
      return cards.map((text, i) => ({
        text,
        ...(positions[i] || positions[0]),
      }))
    })

    const liveCards = computed(() => {
      const cards = texts.value.live_cards || []
      const positions = getScene8Positions(lang.value)
      return cards.map((text, i) => ({
        text,
        ...(positions[i] || positions[0]),
      }))
    })

    const liveNumberLayoutStyle = computed(() => {
      const layout = getScene9NumberLayout(lang.value)
      return {
        '--number-label-top': layout.labelTop,
        '--number-label-width': layout.labelWidth,
        '--number-value-top': layout.numberTop,
      }
    })

    const giftsNumberLayoutStyle = computed(() => {
      const layout = getScene17NumberLayout(lang.value)
      return {
        '--number-label-top': layout.labelTop,
        '--number-label-width': layout.labelWidth,
        '--number-value-top': layout.numberTop,
      }
    })

    const finalCopyStyle = computed(() => {
      const layout = getScene19FinalLayout(lang.value)
      return {
        '--final-copy-top': layout.top,
        '--final-copy-width': layout.width,
        '--final-copy-gap': layout.gap,
      }
    })

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

    // Built scenes' absolute video timecodes (ascending). Drives prev/next jumps.
    const segmentStartTimes = computed(() =>
      builtIds.value.map(id => {
        const sc = SCENES.find(s => s.id === id)
        return sc ? sc.vstart : 0
      })
    )

    // Active segments with their overlay video span [vstart, vstart + dur). The
    // master timeline is positioned in absolute video time, so sync is an
    // identity map (tl.time === video.currentTime). The span (overlay length,
    // which may overlap the next scene) is used to detect the gaps left by
    // skipped scenes and to let an exit finish before skipping. See
    // useStoryPlayback.syncToVideo.
    const segments = computed(() =>
      builtIds.value.map(id => {
        const sc = SCENES.find(s => s.id === id)
        return {
          id,
          vstart: sc ? sc.vstart : 0,
          dur: segDurations[id] || (sc ? sc.dur : 0),
          entranceEnd: segEntranceEnds[id] || 0,
        }
      })
    )

    // === Layers ==============================================================
    const { fitCards, fitAllCards, initViewport } = useViewportFit()

    const {
      playVideo,
      updateTime,
      handleVideoEnded,
      togglePlayState,
      handleEvent,
      handleEventEnd,
      jumpToSegment,
      startPlayback,
      stopSync,
    } = useStoryPlayback({
      tl,
      videoPlayer,
      notify,
      longPress,
      pressTimer,
      isPlaying,
      isPaused,
      currentTime,
      segmentStartTimes,
      segments,
      showPlayButton,
      isBuffering,
    })

    const { buildSegment } = createAnimations({
      defaultDuration,
      daysDigits,
      fitCards,
      segTimes,
      segDurations,
      segEntranceEnds,
    })

    const { parseParams, applyLocale, computeSkips } = useStoryData({
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
    })

    // Hide the branded WinSpirit preloader (raw HTML in index.html, shown from
    // first paint so it also masks the pre-mount/FOUC window) the moment the
    // video is buffered and the first frame is about to play. Driven by the
    // same isBuffering signal that gates playback, so the brand stays on screen
    // for the whole cold-start instead of a generic spinner.
    const hidePreloader = () => {
      const el = document.querySelector('.fe-preloader')
      if (el) el.classList.add('fe-preloader--hidden')
    }
    watch(isBuffering, buffering => {
      if (!buffering) hidePreloader()
    })

    onMounted(() => {
      initViewport()

      parseParams()
      applyLocale()
      computeSkips()

      // Wait for Vue to render the DOM with parsed data (slot cards, cube,
      // game frame are data-driven). Otherwise GSAP selectors match nothing.
      nextTick(() => {
        // Build only the active segments (data-driven skip), preserving order.
        const built = []
        SCENES.forEach(scene => {
          if (scene.skip && skip[scene.skip]) return
          const stl = buildSegment(scene)
          // Place each segment at its absolute video timecode so the master
          // timeline shares the video's clock and exits can overlap the cut.
          tl.add(stl, scene.vstart)
          built.push(scene.id)
        })
        builtIds.value = built
        numberOfSegments.value = built.length
        duration.value = tl.duration()

        // master timeline was created empty before mount; start video first and
        // gate tl.play(0) on the first presented frame, then keep them in sync.
        startPlayback()

        installStoryDebugHook({
          tl,
          videoPlayer,
          builtIds,
          segments,
          fitCards,
          fitAllCards,
        })
      })
    })

    onUnmounted(() => {
      stopSync()
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
      handleVideoEnded,
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
      levelLayoutStyle,
      currency,
      topWinnings,
      liveWins,
      bettingWins,
      cashbackValue,
      giftsCount,
      favorite_game_name,
      favorite_game_thunbnail,
      showGiftBtn,
      journeyCards,
      trustedCards,
      experimentCards,
      gameCards,
      liveCards,
      liveNumberLayoutStyle,
      giftsNumberLayoutStyle,
      finalCopyStyle,
      // assets
      story_icon,
      watchAgainIcon,
      slotFrame,
      gameFireFrame,
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
