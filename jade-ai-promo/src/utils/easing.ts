export const clamp = (v: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, v));

export const progress = (frame: number, start: number, duration: number) =>
  clamp((frame - start) / duration);

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
