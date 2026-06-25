import gsap from 'gsap'
import { SLOT_REST_COPY, SLOT_SPINS, slotCellY } from '../config/slotGeometry.js'

// GSAP timeline builders for the story. buildEntrance() defines the per-scene
// entrance choreography; buildSegment() wraps it with video sync, hold and exit.
// All animation timing values and CSS variable contracts (--ey/--es/--reel-y/
// --journey-y/--gift-y/--fall-y) are preserved exactly. Shared runtime state is
// injected from the composition root.
export function createAnimations(ctx) {
  const { defaultDuration, daysDigits, fitCards, segTimes, segDurations, segEntranceEnds } = ctx

  const SEL = id => `#stories-segment-${id}`

  // Every scene exits with a zoom-into-camera move: the whole 1080x1920 overlay
  // canvas scales up while fading out (matches the motion-designer animatic). The
  // final CTA scene is excluded so its buttons stay put and stay clickable.
  const ZOOM_OUT_SCALE = 4.5 // ~450% peak, per the designer's AE Null

  const buildEntrance = (stl, scene) => {
    const root = SEL(scene.id)
    stl.set(root, { display: 'flex' })
    // fit long card text the moment the scene becomes measurable
    stl.add(() => fitCards(root))
    switch (scene.type) {
      case 'intro':
        stl.to(root, { duration: 0.2 })
        break
      case 'greeting':
        stl.from(`${root} .scene-hi`, { opacity: 0, '--ey': 2, duration: 0.6 })
        stl.from(
          `${root} .scene-name`,
          { opacity: 0, '--ey': 4, '--es': 0.85, duration: 0.7, ease: 'back.out(1.6)' },
          '-=0.2'
        )
        break
      case 'slots': {
        const cards = gsap.utils.toArray(`${root} .slot-card`)
        const digits = daysDigits.value
        const restCell = d => SLOT_REST_COPY * 10 + d // resting reel cell
        // Reel starts on a digit-0 cell SLOT_SPINS full cycles above the rest
        // cell, so the window shows 0 (not the final digit) on appearance and
        // counts up through SLOT_SPINS cycles before locking onto the day digit.
        const startCell = (SLOT_REST_COPY - SLOT_SPINS) * 10 // digit 0
        const startY = slotCellY(startCell)
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
        // cube descends from above (smaller) and grows to full size.
        // Motion rides --ey/--es so CSS keeps the translateX(-50%) centring.
        stl.from(`${root} .cube-img`, {
          opacity: 0,
          '--ey': -15,
          '--es': 0.65,
          duration: 1.0,
          ease: 'power3.out',
        })
        // text lines appear from below sequentially
        stl.from(
          `${root} .scene-cube-top`,
          { opacity: 0, '--ey': 4, duration: 0.45, ease: 'power2.out' },
          '-=0.15'
        )
        stl.from(
          `${root} .scene-cube-level`,
          { opacity: 0, '--ey': 4, duration: 0.45, ease: 'power2.out' },
          '-=0.15'
        )
        stl.from(
          `${root} .scene-cube-bottom`,
          { opacity: 0, '--ey': 4, duration: 0.45, ease: 'power2.out' },
          '-=0.15'
        )
        break
      case 'number':
        stl.from(`${root} .scene-num-label`, { opacity: 0, '--ey': 4, duration: 0.5 })
        stl.from(
          `${root} .big-number`,
          { opacity: 0, '--ey': 9, '--es': 0.8, duration: 0.7, ease: 'back.out(1.5)' },
          '-=0.1'
        )
        break
      case 'game': {
        // text falls from above: label first, then the game name
        stl.from(`${root} .scene-game-label`, { opacity: 0, '--ey': -3, duration: 0.4 })
        stl.from(`${root} .scene-game-name`, { opacity: 0, '--ey': -3, duration: 0.5 }, '-=0.1')
        // icon = thumbnail + flame frame as ONE unit: appears from the centre,
        // pulsing (scale-in pop + a single heartbeat). The flame then keeps
        // burning via the CSS filter flicker on .game-fire-frame.
        const gameIcon = `${root} .game-frame, ${root} .game-fire-frame`
        stl.addLabel('gpop')
        stl.fromTo(
          gameIcon,
          { opacity: 0, '--es': 0.5 },
          { opacity: 1, '--es': 1, duration: 0.55, ease: 'back.out(2)' },
          'gpop'
        )
        stl.to(
          gameIcon,
          { '--es': 1.05, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' },
          'gpop+=0.55'
        )
        break
      }
      case 'lock':
        stl.from(`${root} .scene-lock-text`, { opacity: 0, '--ey': 4, duration: 0.7 })
        break
      case 'flameOut': {
        // Title appears with a neon glitch/flicker on opacity (designer ref):
        // the position settles in parallel, the sub line fades up afterwards.
        const flameTitle = `${root} .scene-flame-title`
        stl.addLabel('flame')
        stl.fromTo(
          flameTitle,
          { '--ey': 3 },
          { '--ey': 0, duration: 0.7, ease: 'power2.out' },
          'flame'
        )
        stl.set(flameTitle, { opacity: 0 }, 'flame')
        stl.to(
          flameTitle,
          {
            duration: 0.7,
            keyframes: {
              opacity: [0, 0.8, 0.12, 1, 0.3, 0.85, 0.55, 1],
              easeEach: 'power1.inOut',
            },
          },
          'flame'
        )
        stl.from(`${root} .scene-flame-sub`, { opacity: 0, '--ey': 3, duration: 0.5 }, '-=0.2')
        break
      }
      case 'final':
        stl.from(`${root} .scene-final-top`, { opacity: 0, '--ey': 3, duration: 0.5 })
        stl.from(
          `${root} .scene-final-name`,
          { opacity: 0, '--ey': 4, '--es': 0.85, duration: 0.6, ease: 'back.out(1.5)' },
          '-=0.2'
        )
        stl.from(
          `${root} .end_button`,
          { opacity: 0, '--ey': 3, duration: 0.5, stagger: 0.15 },
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

    buildEntrance(stl, scene)

    // The segment is placed on the master timeline at its absolute video time
    // (tl.add(stl, scene.vstart) in scripts.js), so the master clock == video
    // clock and `dur` only controls this overlay's own length. When `dur` is
    // longer than the scene's video window, the exit deliberately overlaps the
    // next scene's entrance (the zoom-into-camera "rides over" the cut).
    // The final CTA must stay visible and clickable after the video ends.
    const isFinalScene = scene.type === 'final'
    const exitDur = isFinalScene ? 0 : 0.3
    const entranceEnd = stl.duration()
    // Expose the real settle point so paused prev/next can land on the fully
    // formed scene (per-scene, data-driven; no hand-tuned offsets).
    if (segEntranceEnds) segEntranceEnds[scene.id] = entranceEnd
    const holdSpan = Math.max(0.1, scene.dur - exitDur - entranceEnd)
    stl.to(SEL(scene.id), { duration: holdSpan }) // hold

    if (isFinalScene) {
      segDurations[scene.id] = stl.duration()
      return stl
    }

    // Exit: zoom-into-camera. The whole segment canvas scales out (~450%) while
    // fading. Scale rides --seg-scale so the centring translate(-50%,-50%) stays
    // a live % and is never frozen by GSAP. zIndex is raised so the outgoing
    // scene zooms ABOVE the incoming one during the overlap, then reset on hide.
    stl.addLabel('exit')
    stl.set(SEL(scene.id), { zIndex: 5 }, 'exit')
    stl.to(
      SEL(scene.id),
      { '--seg-scale': ZOOM_OUT_SCALE, duration: exitDur, ease: 'power2.in' },
      'exit'
    )
    stl.to(SEL(scene.id), { opacity: 0, duration: exitDur, ease: 'power1.in' }, 'exit')
    stl.set(SEL(scene.id), { display: 'none', opacity: 1, '--seg-scale': 1, zIndex: 1 })

    segDurations[scene.id] = stl.duration()
    return stl
  }

  return { SEL, buildEntrance, buildSegment }
}
