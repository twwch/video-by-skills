import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../../config/colors';
import {easeInOutCubic} from '../../utils/easing';

export const GradientSweep: React.FC<{
  startFrame?: number;
  duration?: number;
}> = ({startFrame = 0, duration = 60}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [startFrame, startFrame + duration], [-100, 200], {
    easing: easeInOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: `${progress}%`,
          width: '30%',
          height: '100%',
          background: `linear-gradient(90deg, transparent, ${COLORS.green}33, ${COLORS.blue}33, transparent)`,
          filter: 'blur(40px)',
        }}
      />
    </AbsoluteFill>
  );
};
