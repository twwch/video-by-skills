import React from 'react';
import {AbsoluteFill} from 'remotion';

export const Scanlines: React.FC<{
  opacity?: number;
  gap?: number;
}> = ({opacity = 0.05, gap = 4}) => {
  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent ${gap - 1}px,
          rgba(0, 0, 0, ${opacity}) ${gap - 1}px,
          rgba(0, 0, 0, ${opacity}) ${gap}px
        )`,
      }}
    />
  );
};
