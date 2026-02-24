export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const TOTAL_FRAMES = 2610;

export const SCENES = {
  S1_OPENING: { start: 0, duration: 150 },
  S2_LOGO: { start: 150, duration: 180 },
  S3_DASHBOARD: { start: 330, duration: 300 },
  S4_EDITOR: { start: 630, duration: 420 },
  S5_AI: { start: 1050, duration: 450 },
  S6_TEMPLATES: { start: 1500, duration: 360 },
  S7_FEATURES: { start: 1860, duration: 390 },
  S8_CLOSING: { start: 2250, duration: 360 },
} as const;
