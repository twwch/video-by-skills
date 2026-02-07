import React from 'react';
import {AbsoluteFill, useCurrentFrame, random} from 'remotion';
import {COLORS} from '../../config/colors';
import {FONTS} from '../../config/typography';

const CHARS = 'const let var function return import export async await => {} [] () ; : = + - * / && || ! ? . , 0 1';

export const CodeRain: React.FC<{
  columns?: number;
  speed?: number;
  seed?: string;
}> = ({columns = 30, speed = 2, seed = 'rain'}) => {
  const frame = useCurrentFrame();
  const drops = Array.from({length: columns}, (_, i) => {
    const x = (i / columns) * 1920;
    const startY = random(`${seed}-start-${i}`) * -500;
    const y = (startY + frame * speed * (0.5 + random(`${seed}-sp-${i}`))) % 1200;
    const charIdx = Math.floor(random(`${seed}-ch-${i}-${frame}`) * CHARS.length);
    const opacity = 0.1 + random(`${seed}-op-${i}`) * 0.2;
    return {x, y, char: CHARS[charIdx], opacity};
  });

  return (
    <AbsoluteFill style={{pointerEvents: 'none', overflow: 'hidden'}}>
      {drops.map((d, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: d.x,
            top: d.y,
            fontFamily: FONTS.mono,
            fontSize: 14,
            color: COLORS.green,
            opacity: d.opacity,
          }}
        >
          {d.char}
        </span>
      ))}
    </AbsoluteFill>
  );
};
