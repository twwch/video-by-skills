import React, { useMemo } from 'react';
import { useCurrentFrame, random } from 'remotion';

interface ParticleFieldProps {
  count?: number;
  color?: string;
  seed?: string;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 30,
  color = '#ffffff',
  seed = 'particles',
}) => {
  const frame = useCurrentFrame();

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: random(`${seed}-x-${i}`) * 100,
      y: random(`${seed}-y-${i}`) * 100,
      size: 1 + random(`${seed}-s-${i}`) * 2.5,
      speed: 0.3 + random(`${seed}-sp-${i}`) * 0.7,
      phase: random(`${seed}-ph-${i}`) * Math.PI * 2,
    }));
  }, [count, seed]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {particles.map((p, i) => {
        const y = (p.y + frame * p.speed * 0.05) % 100;
        const opacity = 0.15 + 0.15 * Math.sin(frame * 0.04 + p.phase);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: color,
              opacity,
            }}
          />
        );
      })}
    </div>
  );
};
