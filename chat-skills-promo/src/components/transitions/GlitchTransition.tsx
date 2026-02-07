import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, random} from 'remotion';

export const GlitchTransition: React.FC<{
  durationInFrames: number;
}> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const intensity = interpolate(frame, [0, durationInFrames * 0.5, durationInFrames], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const slices = Array.from({length: 8}, (_, i) => {
    const y = (i / 8) * 100;
    const height = 100 / 8;
    const offsetX = random(`glitch-${frame}-${i}`) * 40 * intensity - 20 * intensity;
    const show = random(`glitch-show-${frame}-${i}`) > 0.3;
    return {y, height, offsetX, show};
  });

  return (
    <AbsoluteFill style={{pointerEvents: 'none', zIndex: 100}}>
      {slices.map((slice, i) =>
        slice.show ? (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${slice.y}%`,
              left: `${slice.offsetX}px`,
              width: '100%',
              height: `${slice.height}%`,
              background: `rgba(34, 197, 94, ${0.1 * intensity})`,
              mixBlendMode: 'screen',
            }}
          />
        ) : null,
      )}
    </AbsoluteFill>
  );
};
