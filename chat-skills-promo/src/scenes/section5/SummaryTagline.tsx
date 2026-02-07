import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {COLORS} from '../../config/colors';
import {FONTS} from '../../config/typography';
import {CONTENT} from '../../config/content';
import {GradientText} from '../../components/text/GradientText';
import {PulseGlow} from '../../components/effects/PulseGlow';
import {easeOutCubic} from '../../utils/easing';

export const SummaryTagline: React.FC = () => {
  const frame = useCurrentFrame();

  const beforeOpacity = interpolate(frame, [10, 25, 60, 75], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const beforeY = interpolate(frame, [10, 25], [30, 0], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const afterOpacity = interpolate(frame, [80, 100], [0, 1], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const afterScale = interpolate(frame, [80, 110], [0.85, 1], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{background: COLORS.bgPrimary}}>
      <PulseGlow color={COLORS.green} size={800} />
      <PulseGlow color={COLORS.blue} x="60%" y="55%" size={600} />

      <AbsoluteFill style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {/* Before tagline */}
        <div
          style={{
            position: 'absolute',
            opacity: beforeOpacity,
            transform: `translateY(${beforeY}px)`,
            fontFamily: FONTS.cn,
            fontSize: 52,
            fontWeight: 500,
            color: COLORS.textSecondary,
          }}
        >
          {CONTENT.taglineBefore}
        </div>

        {/* After tagline */}
        <div
          style={{
            position: 'absolute',
            opacity: afterOpacity,
            transform: `scale(${afterScale})`,
          }}
        >
          <GradientText fontSize={72} fontWeight={800}>
            {CONTENT.taglineAfter}
          </GradientText>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
