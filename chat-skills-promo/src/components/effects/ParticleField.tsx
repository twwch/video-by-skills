import React from 'react';
import {AbsoluteFill, useCurrentFrame, random, interpolate} from 'remotion';
import {COLORS} from '../../config/colors';

export const ParticleField: React.FC<{
  count?: number;
  color?: string;
  seed?: string;
}> = ({count = 40, color = COLORS.green, seed = 'particles'}) => {
  const frame = useCurrentFrame();
  const particles = Array.from({length: count}, (_, i) => {
    const x = random(`${seed}-x-${i}`) * 1920;
    const y = random(`${seed}-y-${i}`) * 1080;
    const size = random(`${seed}-s-${i}`) * 3 + 1;
    const speed = random(`${seed}-sp-${i}`) * 0.5 + 0.2;
    const offsetY = Math.sin((frame * speed + i) * 0.05) * 30;
    const opacity = interpolate(
      Math.sin(frame * 0.03 + random(`${seed}-phase-${i}`) * Math.PI * 2),
      [-1, 1],
      [0.1, 0.6],
    );
    return {x, y: y + offsetY, size, opacity};
  });

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: color,
            opacity: p.opacity,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
