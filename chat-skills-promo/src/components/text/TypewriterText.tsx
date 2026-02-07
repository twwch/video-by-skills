import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {FONTS} from '../../config/typography';
import {COLORS} from '../../config/colors';

export const TypewriterText: React.FC<{
  text: string;
  startFrame?: number;
  charsPerFrame?: number;
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  showCursor?: boolean;
}> = ({
  text,
  startFrame = 0,
  charsPerFrame = 0.8,
  fontSize = 42,
  color = COLORS.textPrimary,
  fontFamily = FONTS.cn,
  showCursor = true,
}) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const charCount = Math.min(Math.floor(elapsed * charsPerFrame), text.length);
  const displayed = text.slice(0, charCount);
  const cursorOpacity = interpolate(Math.sin(frame * 0.15), [-1, 1], [0, 1]);
  const isComplete = charCount >= text.length;

  return (
    <span style={{fontFamily, fontSize, color, whiteSpace: 'pre-wrap'}}>
      {displayed}
      {showCursor && (
        <span style={{opacity: isComplete ? cursorOpacity : 1, color: '#22c55e'}}>▋</span>
      )}
    </span>
  );
};
