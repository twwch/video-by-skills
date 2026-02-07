import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../../config/colors';
import {FONTS} from '../../config/typography';
import {easeOutBack} from '../../utils/easing';

export const TechBadge: React.FC<{
  name: string;
  color: string;
  enterFrame: number;
}> = ({name, color, enterFrame}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - enterFrame;
  const scale = interpolate(elapsed, [0, 15], [0, 1], {
    easing: easeOutBack,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(elapsed, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        width: 150,
        height: 80,
        borderRadius: 12,
        background: COLORS.bgCard,
        border: `1px solid ${color}40`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }}
    >
      <div style={{width: 8, height: 8, borderRadius: '50%', background: color}} />
      <span style={{fontFamily: FONTS.heading, fontSize: 16, fontWeight: 600, color}}>{name}</span>
    </div>
  );
};
