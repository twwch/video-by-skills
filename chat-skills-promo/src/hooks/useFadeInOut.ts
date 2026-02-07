import {interpolate, useCurrentFrame} from 'remotion';
import {easeOutCubic} from '../utils/easing';

export function useFadeInOut(
  duration: number,
  fadeInFrames = 15,
  fadeOutFrames = 15,
) {
  const frame = useCurrentFrame();
  return interpolate(frame, [0, fadeInFrames, duration - fadeOutFrames, duration], [0, 1, 1, 0], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}
