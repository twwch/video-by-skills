import React from 'react';
import {AbsoluteFill, useCurrentFrame, random} from 'remotion';

export const GlitchEffect: React.FC<{
  intensity?: number;
  seed?: string;
}> = ({intensity = 1, seed = 'glitch'}) => {
  const frame = useCurrentFrame();
  const bars = Array.from({length: 5}, (_, i) => {
    const active = random(`${seed}-active-${frame}-${i}`) > 0.6;
    if (!active) return null;
    const y = random(`${seed}-y-${frame}-${i}`) * 1080;
    const h = random(`${seed}-h-${frame}-${i}`) * 8 + 2;
    const xOff = (random(`${seed}-xoff-${frame}-${i}`) - 0.5) * 30 * intensity;
    return {y, h, xOff};
  });

  return (
    <AbsoluteFill style={{pointerEvents: 'none', mixBlendMode: 'screen'}}>
      {bars.map((bar, i) =>
        bar ? (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: bar.y,
              left: bar.xOff,
              width: '100%',
              height: bar.h,
              background: 'rgba(34, 197, 94, 0.15)',
            }}
          />
        ) : null,
      )}
    </AbsoluteFill>
  );
};
