import React from 'react';
import { colors } from '../../config/colors';

interface GridPatternProps {
  spacing?: number;
  dotSize?: number;
  opacity?: number;
}

export const GridPattern: React.FC<GridPatternProps> = ({
  spacing = 40,
  dotSize = 1,
  opacity = 0.15,
}) => {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg width="100%" height="100%" style={{ opacity }}>
        <defs>
          <pattern
            id="grid-dots"
            x="0"
            y="0"
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            <circle cx={spacing / 2} cy={spacing / 2} r={dotSize} fill={colors.textDim} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-dots)" />
      </svg>
    </div>
  );
};
