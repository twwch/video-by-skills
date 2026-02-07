import {useCurrentFrame} from 'remotion';

/**
 * Returns the local frame within a scene, clamped to [0, duration].
 */
export function useScene(sceneStart: number, sceneDuration: number) {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, Math.min(frame - sceneStart, sceneDuration));
  const progress = localFrame / sceneDuration;
  return {frame: localFrame, progress, isActive: frame >= sceneStart && frame < sceneStart + sceneDuration};
}
