import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors } from '../../config/colors';

interface JadeGlowProps {
  x?: string;
  y?: string;
  size?: number;
  opacity?: number;
  pulse?: boolean;
  color?: string;
}

export const JadeGlow: React.FC<JadeGlowProps> = ({
  x = '50%',
  y = '50%',
  size = 400,
  opacity = 0.3,
  pulse = false,
  color = colors.logoGradientFrom,
}) => {
  const frame = useCurrentFrame();
  const pulseScale = pulse ? 1 + 0.1 * Math.sin(frame * 0.05) : 1;
  const currentSize = size * pulseScale;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: currentSize,
        height: currentSize,
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}, transparent 70%)`,
        pointerEvents: 'none',
      }}
    />
  );
};
