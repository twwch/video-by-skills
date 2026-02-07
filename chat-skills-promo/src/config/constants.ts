export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const TOTAL_FRAMES = 3680; // ~123s

// Section frame ranges
export const SECTIONS = {
  hook: {start: 0, end: 450, duration: 450},
  product: {start: 450, end: 1050, duration: 600},
  features: {start: 1050, end: 3080, duration: 2030},
  techStack: {start: 3080, end: 3380, duration: 300},
  cta: {start: 3380, end: 3680, duration: 300},
} as const;

// Scene frame ranges (relative to their section start)
export const SCENES = {
  // Section 1: Hook
  chaosOpening: {start: 0, duration: 225},
  theQuestion: {start: 225, duration: 225},
  // Section 2: Product
  logoReveal: {start: 0, duration: 225},
  uiOverview: {start: 225, duration: 375},
  // Section 3: Features (9 features, 10-frame gaps between each)
  autonomousSkill: {start: 0, duration: 200},
  liveTerminal: {start: 210, duration: 200},
  fileGeneration: {start: 420, duration: 200},
  mentionSyntax: {start: 630, duration: 200},
  skillFind: {start: 840, duration: 200},
  skillCreate: {start: 1050, duration: 200},
  skillInstall: {start: 1260, duration: 200},
  errorAutoFix: {start: 1470, duration: 200},
  fullDemo: {start: 1680, duration: 350},
  // Section 4: Tech Stack
  techStackGrid: {start: 0, duration: 150},
  architectureFlow: {start: 150, duration: 150},
  // Section 5: CTA
  summaryTagline: {start: 0, duration: 150},
  callToAction: {start: 150, duration: 150},
} as const;
