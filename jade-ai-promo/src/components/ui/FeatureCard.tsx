import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors } from '../../config/colors';
import { easeOutBack, progress } from '../../utils/easing';

interface FeatureCardProps {
  icon: string;
  title: string;
  desc: string;
  startFrame: number;
  index: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  desc,
  startFrame,
  index,
}) => {
  const frame = useCurrentFrame();
  const delay = index * 6;
  const p = easeOutBack(progress(frame, startFrame + delay, 20));
  const opacity = Math.min(1, progress(frame, startFrame + delay, 12));

  return (
    <div
      style={{
        width: 340,
        padding: 32,
        borderRadius: 12,
        backgroundColor: colors.appWhite,
        border: `1px solid ${colors.appBorder}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        opacity,
        transform: `translateY(${(1 - p) * 30}px) scale(${0.9 + 0.1 * p})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 12,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          backgroundColor: colors.pink50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: colors.zinc900,
          fontFamily: 'Inter, "Noto Sans SC", sans-serif',
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 14,
          color: colors.zinc500,
          lineHeight: 1.5,
          fontFamily: 'Inter, "Noto Sans SC", sans-serif',
        }}
      >
        {desc}
      </div>
    </div>
  );
};
