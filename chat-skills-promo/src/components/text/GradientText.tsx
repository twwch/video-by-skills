import React from 'react';
import {GRADIENT} from '../../config/colors';
import {FONTS} from '../../config/typography';

export const GradientText: React.FC<{
  children: React.ReactNode;
  fontSize?: number;
  fontWeight?: number;
  gradient?: string;
}> = ({children, fontSize = 56, fontWeight = 700, gradient = GRADIENT.brandText}) => {
  return (
    <span
      style={{
        fontFamily: FONTS.cn,
        fontSize,
        fontWeight,
        background: gradient,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        display: 'inline-block',
      }}
    >
      {children}
    </span>
  );
};
