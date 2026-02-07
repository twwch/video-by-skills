import React from 'react';
import { useCurrentFrame } from 'remotion';

interface PulseGlowProps {
  color: string;
  x?: string;
  y?: string;
  size?: number;
}

export const PulseGlow: React.FC<PulseGlowProps> = ({
  color,
  x = '50%',
  y = '50%',
  size = 400,
}) => {
  const frame = useCurrentFrame();
  const pulse = 0.6 + 0.4 * Math.sin(frame * 0.03);
  const scale = 0.9 + 0.1 * Math.sin(frame * 0.02);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}40 0%, ${color}10 40%, transparent 70%)`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity: pulse,
        pointerEvents: 'none',
      }}
    />
  );
};
