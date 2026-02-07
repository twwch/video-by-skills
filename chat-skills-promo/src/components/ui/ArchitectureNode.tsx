import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS, GRADIENT} from '../../config/colors';
import {FONTS} from '../../config/typography';
import {easeOutCubic} from '../../utils/easing';

export const ArchitectureNode: React.FC<{
  label: string;
  x: number;
  y: number;
  enterFrame: number;
  isActive?: boolean;
}> = ({label, x, y, enterFrame, isActive = false}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - enterFrame;
  const opacity = interpolate(elapsed, [0, 15], [0, 1], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(elapsed, [0, 15], [0.8, 1], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        padding: '14px 24px',
        borderRadius: 10,
        background: isActive ? COLORS.bgCard : COLORS.bgSecondary,
        border: `1px solid ${isActive ? COLORS.green : COLORS.borderGlass}`,
        boxShadow: isActive ? `0 0 20px ${COLORS.green}30` : 'none',
        fontFamily: FONTS.heading,
        fontSize: 16,
        fontWeight: 600,
        color: isActive ? COLORS.green : COLORS.textPrimary,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </div>
  );
};

export const ArchitectureArrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  enterFrame: number;
}> = ({x1, y1, x2, y2, enterFrame}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - enterFrame;
  const progress = interpolate(elapsed, [0, 20], [0, 1], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const dx = x2 - x1;
  const dy = y2 - y1;

  return (
    <svg
      style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none'}}
    >
      <defs>
        <linearGradient id={`arrowGrad-${x1}-${y1}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={COLORS.green} />
          <stop offset="100%" stopColor={COLORS.blue} />
        </linearGradient>
      </defs>
      <line
        x1={x1}
        y1={y1}
        x2={x1 + dx * progress}
        y2={y1 + dy * progress}
        stroke={`url(#arrowGrad-${x1}-${y1})`}
        strokeWidth={2}
        strokeDasharray="6 4"
        opacity={0.7}
      />
      {progress > 0.9 && (
        <circle cx={x2} cy={y2} r={4} fill={COLORS.blue} opacity={progress} />
      )}
    </svg>
  );
};
