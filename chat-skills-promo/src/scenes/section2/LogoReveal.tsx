import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {COLORS} from '../../config/colors';
import {FONTS} from '../../config/typography';
import {getContent} from '../../config/content';
import {useLanguage} from '../../contexts/LanguageContext';
import {Logo} from '../../components/ui/Logo';
import {GradientSweep} from '../../components/effects/GradientSweep';
import {GradientText} from '../../components/text/GradientText';
import {easeOutCubic} from '../../utils/easing';

export const LogoReveal: React.FC = () => {
  const lang = useLanguage();
  const CONTENT = getContent(lang);
  const frame = useCurrentFrame();

  const taglineOpacity = interpolate(frame, [100, 130], [0, 1], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const taglineY = interpolate(frame, [100, 130], [20, 0], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{background: COLORS.bgPrimary}}>
      <GradientSweep startFrame={10} duration={80} />

      <AbsoluteFill style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30}}>
        <Logo scale={1.5} showText startFrame={20} />

        <div style={{opacity: taglineOpacity, transform: `translateY(${taglineY}px)`}}>
          <GradientText fontSize={32} fontWeight={500}>
            {CONTENT.tagline}
          </GradientText>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
