import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS, GRADIENT} from '../../config/colors';
import {FONTS} from '../../config/typography';
import {easeOutBack} from '../../utils/easing';

export const Logo: React.FC<{
  scale?: number;
  showText?: boolean;
  startFrame?: number;
}> = ({scale = 1, showText = true, startFrame = 0}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;

  const logoScale = interpolate(elapsed, [0, 30], [0, scale], {
    easing: easeOutBack,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textOpacity = interpolate(elapsed, [20, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
      {/* Icon with gradient background - matches original's gradient badge */}
      <div
        style={{
          width: 44 * scale,
          height: 44 * scale,
          borderRadius: 12 * scale,
          background: GRADIENT.brand,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${logoScale / scale})`,
        }}
      >
        <svg width={24 * scale} height={24 * scale} viewBox="0 0 24 24" fill="none">
          {/* Layers icon matching original AI avatar */}
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" opacity="0.9" />
          <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
          <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
        </svg>
      </div>
      {showText && (
        <div style={{opacity: textOpacity}}>
          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 24 * scale,
              fontWeight: 700,
              color: COLORS.textPrimary,
              letterSpacing: -0.5,
            }}
          >
            Next-Chat-Skills
          </div>
        </div>
      )}
    </div>
  );
};

/** Compact logo for sidebar header */
export const SidebarLogo: React.FC = () => {
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: GRADIENT.brand,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" opacity="0.9" />
          <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
          <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
        </svg>
      </div>
      <span style={{fontFamily: FONTS.heading, fontSize: 17, fontWeight: 700, color: COLORS.textPrimary}}>
        Next-Chat-Skills
      </span>
    </div>
  );
};
