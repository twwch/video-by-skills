import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors } from '../../config/colors';
import { easeOutCubic, progress } from '../../utils/easing';
import { fontFor } from '../../config/typography';
import { useLanguage } from '../../contexts/LanguageContext';

interface AnimatedTitleProps {
  text: string;
  startFrame: number;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  letterByLetter?: boolean;
  gradient?: boolean;
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  text,
  startFrame,
  fontSize = 64,
  color = colors.text,
  fontWeight = 700,
  letterByLetter = false,
  gradient = false,
}) => {
  const frame = useCurrentFrame();
  const lang = useLanguage();

  if (letterByLetter) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {text.split('').map((char, i) => {
          const charP = easeOutCubic(progress(frame, startFrame + i * 3, 15));
          return (
            <span
              key={i}
              style={{
                fontFamily: fontFor(lang),
                fontSize,
                fontWeight,
                color: gradient ? undefined : color,
                background: gradient
                  ? `linear-gradient(135deg, ${colors.logoGradientFrom}, ${colors.logoGradientTo})`
                  : undefined,
                WebkitBackgroundClip: gradient ? 'text' : undefined,
                WebkitTextFillColor: gradient ? 'transparent' : undefined,
                opacity: charP,
                transform: `translateY(${(1 - charP) * 20}px)`,
                display: 'inline-block',
                minWidth: char === ' ' ? '0.3em' : undefined,
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    );
  }

  const p = easeOutCubic(progress(frame, startFrame, 25));

  return (
    <div
      style={{
        fontFamily: fontFor(lang),
        fontSize,
        fontWeight,
        color: gradient ? undefined : color,
        background: gradient
          ? `linear-gradient(135deg, ${colors.logoGradientFrom}, ${colors.logoGradientTo})`
          : undefined,
        WebkitBackgroundClip: gradient ? 'text' : undefined,
        WebkitTextFillColor: gradient ? 'transparent' : undefined,
        opacity: p,
        transform: `translateY(${(1 - p) * 30}px)`,
        textAlign: 'center',
      }}
    >
      {text}
    </div>
  );
};
