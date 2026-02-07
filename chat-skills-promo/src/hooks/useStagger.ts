import {interpolate, useCurrentFrame} from 'remotion';
import {easeOutCubic} from '../utils/easing';

/**
 * Returns an array of opacity values for staggered entrance of N items.
 */
export function useStagger(count: number, staggerDelay: number, fadeInDuration = 15) {
  const frame = useCurrentFrame();
  return Array.from({length: count}, (_, i) => {
    const start = i * staggerDelay;
    return interpolate(frame, [start, start + fadeInDuration], [0, 1], {
      easing: easeOutCubic,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  });
}
