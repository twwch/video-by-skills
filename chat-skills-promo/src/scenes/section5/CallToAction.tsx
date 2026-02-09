import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {COLORS} from '../../config/colors';
import {FONTS} from '../../config/typography';
import {getContent} from '../../config/content';
import {L} from '../../config/i18n';
import {useLanguage} from '../../contexts/LanguageContext';
import {Logo} from '../../components/ui/Logo';
import {GradientText} from '../../components/text/GradientText';
import {PulseGlow} from '../../components/effects/PulseGlow';
import {easeOutCubic} from '../../utils/easing';

export const CallToAction: React.FC = () => {
  const frame = useCurrentFrame();
  const lang = useLanguage();
  const CONTENT = getContent(lang);

  const urlOpacity = interpolate(frame, [30, 50], [0, 1], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const urlY = interpolate(frame, [30, 50], [20, 0], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fadeOut = interpolate(frame, [120, 150], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{background: COLORS.bgPrimary, opacity: fadeOut}}>
      <PulseGlow color={COLORS.green} size={600} />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 30,
        }}
      >
        <Logo scale={1.2} showText startFrame={5} />

        {/* GitHub URL */}
        <div style={{opacity: urlOpacity, transform: `translateY(${urlY}px)`}}>
          <div
            style={{
              padding: '14px 32px',
              borderRadius: 10,
              background: COLORS.bgCard,
              border: `1px solid ${COLORS.borderGlass}`,
              fontFamily: FONTS.mono,
              fontSize: 22,
              color: COLORS.textPrimary,
            }}
          >
            {CONTENT.githubUrl}
          </div>
        </div>

        {/* Badges */}
        <div style={{display: 'flex', gap: 14, marginTop: 10}}>
          {CONTENT.badges.map((badge, i) => {
            const badgeOpacity = interpolate(frame, [50 + i * 10, 65 + i * 10], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <div
                key={i}
                style={{
                  opacity: badgeOpacity,
                  padding: '8px 20px',
                  borderRadius: 20,
                  border: `1px solid ${COLORS.green}50`,
                  background: `${COLORS.green}10`,
                }}
              >
                <GradientText fontSize={16} fontWeight={600}>
                  {badge}
                </GradientText>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
