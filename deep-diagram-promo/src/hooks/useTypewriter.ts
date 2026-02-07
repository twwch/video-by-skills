import { useCurrentFrame } from 'remotion';
import { clamp } from '../utils/easing';

export function useTypewriter(
  text: string,
  startFrame: number,
  charsPerFrame: number = 1.5,
): string {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;
  if (elapsed <= 0) return '';
  const charCount = Math.floor(elapsed * charsPerFrame);
  return text.slice(0, clamp(charCount, 0, text.length));
}
