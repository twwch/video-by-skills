import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../../config/colors';
import {FONTS} from '../../config/typography';
import {fontFor} from '../../config/i18n';
import {useLanguage} from '../../contexts/LanguageContext';
import {easeOutCubic} from '../../utils/easing';

export const FeatureLabel: React.FC<{
  title: string;
  subtitle: string;
  description: string;
  enterFrame: number;
}> = ({title, subtitle, description, enterFrame}) => {
  const frame = useCurrentFrame();
  const lang = useLanguage();
  const elapsed = frame - enterFrame;
  const opacity = interpolate(elapsed, [0, 15], [0, 1], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const x = interpolate(elapsed, [0, 20], [-40, 0], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{opacity, transform: `translateX(${x}px)`}}>
      <div style={{fontFamily: fontFor(lang, 'heading'), fontSize: 36, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 6}}>
        {title}
      </div>
      <div style={{fontFamily: FONTS.mono, fontSize: 16, color: COLORS.green, marginBottom: 12}}>
        {subtitle}
      </div>
      <div style={{fontFamily: fontFor(lang, 'body'), fontSize: 20, color: COLORS.textSecondary, lineHeight: 1.5}}>
        {description}
      </div>
    </div>
  );
};
