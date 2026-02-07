import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../../config/colors';
import {FONTS} from '../../config/typography';
import {easeOutBack} from '../../utils/easing';

const FILE_ICONS: Record<string, {color: string; label: string}> = {
  tsx: {color: COLORS.blue, label: 'TSX'},
  prisma: {color: COLORS.purple, label: 'PRI'},
  md: {color: COLORS.textSecondary, label: 'MD'},
};

export const FileCard: React.FC<{
  name: string;
  type: string;
  lines: number;
  enterFrame: number;
  index: number;
}> = ({name, type, lines, enterFrame}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - enterFrame;
  const opacity = interpolate(elapsed, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(elapsed, [0, 20], [60, 0], {
    easing: easeOutBack,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const icon = FILE_ICONS[type] || {color: COLORS.textMuted, label: type.toUpperCase().slice(0, 3)};

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        width: 180,
        padding: 16,
        borderRadius: 12,
        background: COLORS.bgCard,
        border: `1px solid ${COLORS.borderGlass}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <div
        style={{
          width: 48,
          height: 56,
          borderRadius: 6,
          background: `${icon.color}18`,
          border: `1px solid ${icon.color}40`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: FONTS.mono,
          fontSize: 14,
          fontWeight: 700,
          color: icon.color,
        }}
      >
        {icon.label}
      </div>
      <div style={{fontFamily: FONTS.mono, fontSize: 13, color: COLORS.textPrimary, textAlign: 'center'}}>
        {name}
      </div>
      <div style={{fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textMuted}}>
        {lines} lines
      </div>
    </div>
  );
};
