import React from 'react';
import { useCurrentFrame } from 'remotion';
import { random } from 'remotion';
import { colors } from '../../config/colors';

interface ParticleFieldProps {
  count?: number;
  color?: string;
  opacity?: number;
  seed?: string;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 30,
  color = colors.logoGradientFrom,
  opacity = 0.4,
  seed = 'particles',
}) => {
  const frame = useCurrentFrame();

  const particles = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: random(`${seed}-x-${i}`) * 1920,
      y: random(`${seed}-y-${i}`) * 1080,
      size: 2 + random(`${seed}-s-${i}`) * 4,
      speed: 0.3 + random(`${seed}-sp-${i}`) * 0.7,
      phase: random(`${seed}-ph-${i}`) * Math.PI * 2,
    }));
  }, [count, seed]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {particles.map((p, i) => {
        const x = p.x + Math.sin(frame * 0.02 * p.speed + p.phase) * 30;
        const y = p.y + Math.cos(frame * 0.015 * p.speed + p.phase) * 20;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: color,
              opacity: opacity * (0.5 + 0.5 * Math.sin(frame * 0.03 + p.phase)),
            }}
          />
        );
      })}
    </div>
  );
};
