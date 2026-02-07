export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const TOTAL_FRAMES = 2500;

// Section timings
export const OPENING = { start: 0, duration: 180 }; // 6s
export const CLOSING = { start: 2380, duration: 120 }; // 4s

// Agent scene duration and overlap
export const AGENT_SCENE_DURATION = 450; // 15s
export const AGENT_OVERLAP = 100; // ~3.3s crossfade

// Agent scene start frames (within the agents section)
export const AGENT_SCENES = [
  { name: 'MindMap', start: 0 },      // 0-450
  { name: 'Flowchart', start: 350 },   // 350-800
  { name: 'Charts', start: 700 },      // 700-1150
  { name: 'Drawio', start: 1050 },     // 1050-1500
  { name: 'Mermaid', start: 1400 },    // 1400-1850
  { name: 'Infographic', start: 1750 },// 1750-2200
] as const;

// Agents section total duration
export const AGENTS_SECTION_DURATION = 2200; // last start + scene duration

// Internal agent scene timeline (typing→send→bubble→trace→diagram flow)
export const SCENE_TIMELINE = {
  fadeIn:       { start: 0,   end: 15 },
  typing:      { start: 15,  end: 60 },
  send:        { start: 60,  end: 72 },
  bubbleSettle:{ start: 72,  end: 85 },
  trace:       { start: 85,  end: 140 },
  diagram:     { start: 140, end: 310 },
  hold:        { start: 310, end: 340 },
  fadeOut:      { start: 340, end: 450 },
} as const;
