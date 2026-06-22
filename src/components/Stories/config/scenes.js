// --- Scene config (single source of truth) --------------------------------
// vstart = absolute timecode in animatic (seconds). dur = display length of the
// scene's overlay timeline. skip = key into the reactive `skip` object.
// Order mirrors the redesigned Figma deck (19 scenes, file cqRRGIY5o8LB7rgm4WV5E2).
//
// FRAME-ACCURATE TIMELINE (motion-design final, 25fps, 117.0s, hard cuts on whole
// seconds). 17 visual cuts on a 6s grid; two long cuts are shared by two scenes:
//   - "sparks" cut 78-90 (12s) covers scene 14 (what game) + 15 (game)
//   - final cut 102-117 (15s) covers scene 18 (flameOut) + 19 (final)
// Object cuts land on: chips=42 (scene 8), soccer=54 (scene 10), dollars=66
// (scene 12), lock=90 (scene 16), gifts=96 (scene 17); the 4 number scenes
// (7/9/11/13 @ 36/48/60/72) ride the repeating spotlight+suits background.
//
// ⚠️ The animatic.webm currently committed is an OUTDATED 127.83s render whose
// object cuts are shifted +6..+12s, so backgrounds land on the wrong scenes.
// Replace it with the final 117.0s render and this calibration is frame-accurate.
export const SCENES = [
  { id: 1, type: 'intro', vstart: 0, dur: 6 }, // 220950 VIP logo
  { id: 2, type: 'greeting', vstart: 6, dur: 6 }, // 220681 Hi, {name}!
  { id: 3, type: 'slots', vstart: 12, dur: 6, skip: 'slots' }, // 220695 day {days}
  { id: 4, type: 'fall', vstart: 18, dur: 6 }, // 220747 journey (road)
  { id: 5, type: 'level', vstart: 24, dur: 6, skip: 'level' }, // 220801 level cube
  { id: 6, type: 'fall', vstart: 30, dur: 6 }, // 220817 moments (gift boxes)
  { id: 7, type: 'number', vstart: 36, dur: 6, skip: 'top' }, // 220845 top winnings
  { id: 8, type: 'fall', vstart: 42, dur: 6 }, // 220760 live tables (chips)
  { id: 9, type: 'number', vstart: 48, dur: 6, skip: 'live' }, // 220858 live wins
  { id: 10, type: 'netball', vstart: 54, dur: 6 }, // 220779 you trusted (soccer)
  { id: 11, type: 'number', vstart: 60, dur: 6, skip: 'betting' }, // 220871 betting wins
  { id: 12, type: 'fall', vstart: 66, dur: 6 }, // 220897 experiments (dollars)
  { id: 13, type: 'number', vstart: 72, dur: 6, skip: 'cashback' }, // 220884 cashback
  { id: 14, type: 'fall', vstart: 78, dur: 6 }, // 220994 what game (sparks 78-90)
  { id: 15, type: 'game', vstart: 84, dur: 6, skip: 'game' }, // 220973 game of season
  { id: 16, type: 'lock', vstart: 90, dur: 6 }, // 220909 more rewards (lock)
  { id: 17, type: 'number', vstart: 96, dur: 6, skip: 'gifts' }, // 220920 gifts (244)
  { id: 18, type: 'flameOut', vstart: 102, dur: 6 }, // 220935 season ends (final 102-117)
  { id: 19, type: 'final', vstart: 108, dur: 9 }, // 220942 final / CTA
]
