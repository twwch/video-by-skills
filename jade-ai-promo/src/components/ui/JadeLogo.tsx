import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors } from '../../config/colors';
import { easeOutCubic, progress } from '../../utils/easing';

interface JadeLogoProps {
  size?: number;
  showText?: boolean;
  animateIn?: boolean;
  startFrame?: number;
  variant?: 'full' | 'icon';
  darkBg?: boolean;
}

export const JadeLogo: React.FC<JadeLogoProps> = ({
  size = 80,
  showText = true,
  animateIn = true,
  startFrame = 0,
  variant = 'full',
  darkBg = true,
}) => {
  const frame = useCurrentFrame();
  const p = animateIn ? easeOutCubic(progress(frame, startFrame, 30)) : 1;
  const scale = 0.5 + 0.5 * p;
  const opacity = p;

  if (variant === 'icon') {
    const s = size / 64;
    return (
      <div style={{ opacity, transform: `scale(${scale})` }}>
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <defs>
            <linearGradient id="jade-icon" x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#jade-icon)" />
          <g stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M14 16H30" />
            <path d="M28 16V40" />
            <path d="M28 40C28 45 24.5 48 20 48C17 48 15 46.5 15 45" />
            <path d="M28 16H38C44 16 47 19.5 47 24.5C47 29.5 44 33 38 33H28" />
            <path d="M36 33L50 49" />
          </g>
          <circle cx="53" cy="12" r="8" fill="#FCD34D" opacity={0.12} />
          <path d="M53 5L55 11L61 13L55 15L53 21L51 15L45 13L51 11Z" fill="#FCD34D" />
          <path d="M45 4L45.8 6.6L48.5 7.2L45.8 7.8L45 10.5L44.2 7.8L41.5 7.2L44.2 6.6Z" fill="#FCD34D" opacity={0.6} />
          <circle cx="58" cy="6" r="1.5" fill="#FCD34D" opacity={0.45} />
        </svg>
      </div>
    );
  }

  // Full logo with text
  const iconSize = size;
  const textSize = size * 0.54;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: size * 0.15,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* Icon part - exact replica of logo.svg icon portion */}
      <svg width={iconSize} height={iconSize} viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="jade-f" x1="2" y1="2" x2="46" y2="46" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="44" height="44" rx="11" fill="url(#jade-f)" />
        <g stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M11 12H24" />
          <path d="M22 12V32" />
          <path d="M22 32C22 35.5 20 38 16.5 38C14.5 38 13 37 13 36" />
          <path d="M22 12H30C34.5 12 37 15 37 19C37 23 34.5 26 30 26H22" />
          <path d="M29 26L39 38" />
        </g>
        <circle cx="41" cy="9" r="6" fill="#FCD34D" opacity={0.12} />
        <path d="M41 3.5L42.4 8L47 9.5L42.4 11L41 15.5L39.6 11L35 9.5L39.6 8Z" fill="#FCD34D" />
        <path d="M34.5 2L35.1 4L37 4.5L35.1 5L34.5 7L33.9 5L32 4.5L33.9 4Z" fill="#FCD34D" opacity={0.6} />
        <circle cx="45" cy="4" r="1.1" fill="#FCD34D" opacity={0.45} />
      </svg>

      {showText && (
        <span
          style={{
            fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
            fontWeight: 700,
            fontSize: textSize,
            letterSpacing: '-0.5px',
            color: darkBg ? colors.logoGradientFrom : colors.logoTextDark,
          }}
        >
          Jade
          <span style={{ color: darkBg ? colors.logoGradientFrom : colors.logoTextGreen }}>AI</span>
        </span>
      )}
    </div>
  );
};
