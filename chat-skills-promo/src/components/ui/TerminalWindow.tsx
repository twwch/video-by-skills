import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {COLORS} from '../../config/colors';
import {FONTS} from '../../config/typography';
import {easeOutCubic} from '../../utils/easing';

/** Standalone terminal window matching the original code block card style */
export const TerminalWindow: React.FC<{
  lines: readonly {cmd: string; delay: number}[];
  startFrame?: number;
}> = ({lines, startFrame = 0}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;

  return (
    <div
      style={{
        width: 700,
        borderRadius: 16,
        border: `1px solid ${COLORS.borderGlass}`,
        background: COLORS.bgCard,
        overflow: 'hidden',
      }}
    >
      {/* Header with macOS dots */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 14px',
          background: 'rgba(255,255,255,0.03)',
          borderBottom: `1px solid rgba(255,255,255,0.05)`,
        }}
      >
        <div style={{width: 8, height: 8, borderRadius: '50%', background: COLORS.dotRed}} />
        <div style={{width: 8, height: 8, borderRadius: '50%', background: COLORS.dotYellow}} />
        <div style={{width: 8, height: 8, borderRadius: '50%', background: COLORS.dotGreen}} />
        <span style={{fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textMuted, marginLeft: 8}}>
          terminal
        </span>
      </div>

      {/* Content */}
      <div style={{padding: '14px 18px', background: COLORS.bgTerminal}}>
        {lines.map((line, i) => {
          const lineElapsed = elapsed - line.delay;
          const opacity = interpolate(lineElapsed, [0, 8], [0, 1], {
            easing: easeOutCubic,
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const charCount = Math.max(0, Math.floor(lineElapsed * 1.2));
          const displayed = line.cmd.slice(0, charCount);
          const isComplete = charCount >= line.cmd.length;
          const isCheck = line.cmd.includes('✓') || line.cmd.includes('✅');
          const isPrompt = line.cmd.startsWith('$');

          return (
            <div
              key={i}
              style={{
                opacity,
                fontFamily: FONTS.mono,
                fontSize: 13,
                color: isCheck ? COLORS.green : isPrompt ? COLORS.textPrimary : COLORS.textSecondary,
                lineHeight: 1.7,
                whiteSpace: 'pre',
              }}
            >
              {isComplete ? line.cmd : displayed}
            </div>
          );
        })}
      </div>
    </div>
  );
};
