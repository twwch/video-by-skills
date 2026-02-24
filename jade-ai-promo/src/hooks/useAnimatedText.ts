import { useCurrentFrame } from 'remotion';

export const useAnimatedText = (
  text: string,
  startFrame: number,
  charsPerFrame = 0.5,
): string => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const charCount = Math.floor(elapsed * charsPerFrame);
  return text.slice(0, Math.min(charCount, text.length));
};
