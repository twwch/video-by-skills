import React from 'react';
import { useCurrentFrame } from 'remotion';
import { random } from 'remotion';
import { colors } from '../../config/colors';

interface SparkleEffectProps {
  count?: number;
  x?: number;
  y?: number;
  spread?: number;
  startFrame?: number;
  seed?: string;
}

export const SparkleEffect: React.FC<SparkleEffectProps> = ({
  count = 12,
  x = 960,
  y = 540,
  spread = 200,
  startFrame = 0,
  seed = 'sparkle',
}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;
  if (elapsed < 0) return null;

  const sparkles = Array.from({ length: count }, (_, i) => {
    const angle = random(`${seed}-a-${i}`) * Math.PI * 2;
    const dist = random(`${seed}-d-${i}`) * spread;
    const delay = random(`${seed}-del-${i}`) * 20;
    const size = 3 + random(`${seed}-s-${i}`) * 5;
    const life = Math.max(0, elapsed - delay);
    const fadeIn = Math.min(1, life / 10);
    const fadeOut = Math.max(0, 1 - life / 40);
    const opacity = fadeIn * fadeOut;

    return {
      x: x + Math.cos(angle) * dist * (0.5 + life * 0.03),
      y: y + Math.sin(angle) * dist * (0.5 + life * 0.03),
      size: size * opacity,
      opacity,
      rotation: life * 3,
    };
  });

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {sparkles.map((s, i) =>
        s.opacity > 0.01 ? (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
              opacity: s.opacity,
            }}
          >
            {/* 4-point star */}
            <svg viewBox="0 0 20 20" width={s.size} height={s.size}>
              <path
                d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z"
                fill={colors.logoSpark}
              />
            </svg>
          </div>
        ) : null,
      )}
    </div>
  );
};
