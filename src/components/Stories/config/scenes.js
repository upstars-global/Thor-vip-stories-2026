// --- Scene config (single source of truth) --------------------------------
// vstart = absolute timecode in animatic (seconds). dur = display length of the
// scene's overlay timeline. skip = key into the reactive `skip` object.
// Order mirrors the redesigned Figma deck (19 scenes, file cqRRGIY5o8LB7rgm4WV5E2).
//
// CALIBRATED to the motion-designer's official timecodes (delivered 2026-06-24
// via Slack, time codes.txt) against public/video/animatic.{webm,mp4}
// (720x1280, 60fps, 72.133s total).
// The designer numbers scenes 2..21 and omits 8/9 (those AE comps were dropped),
// so scene 1 (intro, starts at 0) is implicit and his "10" maps to our scene 8,
// etc. Each timecode HH:MM:SS:FF is converted at 60fps (sec = M*60 + S + F/60).
// vstart = the moment a scene's background appears; dur = the scene overlay's
// own length. The timeline is positioned in ABSOLUTE video time
// (tl.add(stl, vstart)), so dur only controls this overlay and is decoupled
// from playback continuity. For most scenes dur == the gap to the next vstart,
// so the exit (zoom-out + fade) lands exactly on the next background cut.
// Scenes 8/10/12 carry a slightly LONGER dur on purpose: their exit zoom rides
// a touch past the cut (the "наезд" overlap) so the content zoom-out matches
// the background's own zoom (casino chips / cards). The final CTA stays visible.
export const SCENES = [
  { id: 1, type: 'intro', vstart: 0, dur: 2.25 },
  { id: 2, type: 'greeting', vstart: 2.25, dur: 2.85 },
  { id: 3, type: 'slots', vstart: 5.1, dur: 6.0, skip: 'slots' },
  { id: 4, type: 'fall', vstart: 11.1, dur: 4.07 },
  { id: 5, type: 'level', vstart: 15.17, dur: 3.91, skip: 'level' },
  { id: 6, type: 'fall', vstart: 19.08, dur: 3.09 },
  { id: 7, type: 'number', vstart: 22.17, dur: 3.91, skip: 'top' },
  { id: 8, type: 'fall', vstart: 26.08, dur: 3.5 }, // dur +0.2 over cut: intentional overlap
  { id: 9, type: 'number', vstart: 29.38, dur: 3.94, skip: 'live' },
  { id: 10, type: 'netball', vstart: 33.32, dur: 3.2 }, // dur +0.12 over cut: intentional overlap
  { id: 11, type: 'number', vstart: 36.4, dur: 3.93, skip: 'betting' },
  { id: 12, type: 'fall', vstart: 40.33, dur: 3.5 }, // dur +0.41 over cut: intentional overlap
  { id: 13, type: 'number', vstart: 43.42, dur: 3.95, skip: 'cashback' },
  { id: 14, type: 'fall', vstart: 47.37, dur: 4.78 },
  { id: 15, type: 'game', vstart: 52.15, dur: 3.92, skip: 'game' },
  { id: 16, type: 'lock', vstart: 56.07, dur: 3.13 },
  { id: 17, type: 'number', vstart: 59.2, dur: 3.93, skip: 'gifts' },
  { id: 18, type: 'flameOut', vstart: 63.13, dur: 3.94 },
  { id: 19, type: 'final', vstart: 67.07, dur: 5.06 },
]
