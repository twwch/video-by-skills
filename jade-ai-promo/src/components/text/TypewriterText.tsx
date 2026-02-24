import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors } from '../../config/colors';
import { fontFor } from '../../config/typography';
import { useLanguage } from '../../contexts/LanguageContext';

interface TypewriterTextProps {
  text: string;
  startFrame: number;
  speed?: number;
  fontSize?: number;
  color?: string;
  showCursor?: boolean;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  startFrame,
  speed = 0.5,
  fontSize = 20,
  color = colors.text,
  showCursor = true,
}) => {
  const frame = useCurrentFrame();
  const lang = useLanguage();
  const elapsed = Math.max(0, frame - startFrame);
  const charCount = Math.min(text.length, Math.floor(elapsed * speed));
  const displayText = text.slice(0, charCount);
  const isTyping = charCount < text.length;

  if (elapsed < 0) return null;

  return (
    <span
      style={{
        fontFamily: fontFor(lang),
        fontSize,
        color,
        whiteSpace: 'pre-wrap',
      }}
    >
      {displayText}
      {showCursor && isTyping && (
        <span
          style={{
            display: 'inline-block',
            width: 2,
            height: fontSize * 0.8,
            backgroundColor: colors.pink500,
            marginLeft: 2,
            opacity: Math.sin(frame * 0.2) > 0 ? 1 : 0,
            verticalAlign: 'text-bottom',
          }}
        />
      )}
    </span>
  );
};
