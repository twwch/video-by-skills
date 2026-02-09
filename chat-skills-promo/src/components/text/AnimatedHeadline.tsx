import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {FONTS} from '../../config/typography';
import {COLORS} from '../../config/colors';
import {fontFor} from '../../config/i18n';
import {useLanguage} from '../../contexts/LanguageContext';
import {easeOutCubic} from '../../utils/easing';

export const AnimatedHeadline: React.FC<{
  text: string;
  startFrame?: number;
  fontSize?: number;
  color?: string;
}> = ({text, startFrame = 0, fontSize = 56, color = COLORS.textPrimary}) => {
  const frame = useCurrentFrame();
  const lang = useLanguage();
  const elapsed = frame - startFrame;
  const opacity = interpolate(elapsed, [0, 20], [0, 1], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(elapsed, [0, 20], [30, 0], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{opacity, transform: `translateY(${y}px)`, fontFamily: fontFor(lang, 'heading'), fontSize, fontWeight: 700, color}}>
      {text}
    </div>
  );
};
