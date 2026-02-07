import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../../config/colors';

export const PulseGlow: React.FC<{
  color?: string;
  x?: string;
  y?: string;
  size?: number;
}> = ({color = COLORS.green, x = '50%', y = '50%', size = 400}) => {
  const frame = useCurrentFrame();
  const pulse = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.3, 0.7]);
  const scale = interpolate(Math.sin(frame * 0.06), [-1, 1], [0.8, 1.2]);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: size,
          height: size,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}${Math.round(pulse * 40).toString(16).padStart(2, '0')}, transparent 70%)`,
          transform: `translate(-50%, -50%) scale(${scale})`,
          filter: 'blur(30px)',
        }}
      />
    </AbsoluteFill>
  );
};
