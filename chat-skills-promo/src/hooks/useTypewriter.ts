import {useCurrentFrame} from 'remotion';

export function useTypewriter(text: string, startFrame: number, charsPerFrame = 0.8) {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const charCount = Math.min(Math.floor(elapsed * charsPerFrame), text.length);
  return text.slice(0, charCount);
}
