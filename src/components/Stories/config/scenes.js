// --- Scene config (single source of truth) --------------------------------
// vstart = absolute timecode in animatic (seconds). dur = display length of the
// scene's overlay timeline. skip = key into the reactive `skip` object.
// Order mirrors the redesigned Figma deck (19 scenes, file cqRRGIY5o8LB7rgm4WV5E2).
//
// CALIBRATED to the motion-design animatic delivered 2026-06-23
// (public/video/animatic.{webm,mp4}, 1080x1920, 30fps, 72.16s total).
// Timecodes taken from a frame-accurate background breakdown of that video:
// each scene's vstart = the moment its background appears; dur = that background's
// on-screen length, so segments are contiguous (vstart[i+1] = vstart[i] + dur[i])
// and the video plays through without re-seeking while no scene is skipped.
// The 4 number scenes (7/9/11/13) ride the repeating spotlight + card-suits cut;
// scene 15 (game) has its own dedicated game-card cut (51.2-55.2s).
export const SCENES = [
  { id: 1, type: 'intro', vstart: 0, dur: 2.2 },
  { id: 2, type: 'greeting', vstart: 2.7, dur: 2.4 },
  { id: 3, type: 'slots', vstart: 5.1, dur: 6.0, skip: 'slots' },
  { id: 4, type: 'fall', vstart: 11.1, dur: 4.2 },
  { id: 5, type: 'level', vstart: 15.3, dur: 3.8, skip: 'level' },
  { id: 6, type: 'fall', vstart: 19.1, dur: 3.0 },
  { id: 7, type: 'number', vstart: 22.1, dur: 4.1, skip: 'top' },
  { id: 8, type: 'fall', vstart: 26.2, dur: 3.6 },
  { id: 9, type: 'number', vstart: 29.8, dur: 4.0, skip: 'live' },
  { id: 10, type: 'netball', vstart: 33.8, dur: 3.2 },
  { id: 11, type: 'number', vstart: 37.0, dur: 3.8, skip: 'betting' },
  { id: 12, type: 'fall', vstart: 40.8, dur: 3.2 },
  { id: 13, type: 'number', vstart: 44.0, dur: 3.6, skip: 'cashback' },
  { id: 14, type: 'fall', vstart: 47.6, dur: 4.6 },
  { id: 15, type: 'game', vstart: 52.2, dur: 4.0, skip: 'game' },
  { id: 16, type: 'lock', vstart: 56.2, dur: 3.2 },
  { id: 17, type: 'number', vstart: 59.4, dur: 4.0, skip: 'gifts' },
  { id: 18, type: 'flameOut', vstart: 63.4, dur: 3.8 },
  { id: 19, type: 'final', vstart: 67.2, dur: 4.96 },
]
