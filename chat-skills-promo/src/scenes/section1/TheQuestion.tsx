import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {COLORS} from '../../config/colors';
import {CONTENT} from '../../config/content';
import {TypewriterText} from '../../components/text/TypewriterText';
import {GlitchTransition} from '../../components/transitions/GlitchTransition';
import {PulseGlow} from '../../components/effects/PulseGlow';
import {FONTS} from '../../config/typography';

export const TheQuestion: React.FC = () => {
  const frame = useCurrentFrame();

  // Freeze effect: a brief white flash at the start
  const flashOpacity = interpolate(frame, [0, 5, 10], [0.3, 0.05, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const containerOpacity = interpolate(frame, [200, 225], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{background: COLORS.bgPrimary, opacity: containerOpacity}}>
      <PulseGlow color={COLORS.green} size={600} />

      {/* Flash overlay */}
      <AbsoluteFill style={{background: 'white', opacity: flashOpacity}} />

      {/* Question text */}
      <AbsoluteFill style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{textAlign: 'center', maxWidth: 900}}>
          <TypewriterText
            text={CONTENT.theQuestion}
            startFrame={20}
            fontSize={60}
            fontFamily={FONTS.cn}
            charsPerFrame={0.6}
            color={COLORS.textPrimary}
          />
        </div>
      </AbsoluteFill>

      {/* Glitch transition at the end */}
      {frame > 180 && <GlitchTransition durationInFrames={45} />}
    </AbsoluteFill>
  );
};
