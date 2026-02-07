import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, random} from 'remotion';
import {COLORS} from '../../config/colors';
import {FONTS} from '../../config/typography';
import {CONTENT} from '../../config/content';
import {CodeRain} from '../../components/effects/CodeRain';
import {Scanlines} from '../../components/effects/Scanlines';
import {easeOutCubic} from '../../utils/easing';

// Floating ghost snippets — fill corners and edges
const ORBIT_POSITIONS = [
  {x: 60, y: 60, rot: -2},
  {x: 1380, y: 40, rot: 3},
  {x: 30, y: 920, rot: 1.5},
  {x: 1350, y: 900, rot: -3},
  {x: 1450, y: 480, rot: 2},
  {x: 50, y: 480, rot: -1.5},
  {x: 700, y: 30, rot: 1},
  {x: 750, y: 960, rot: -2},
];

export const ChaosOpening: React.FC = () => {
  const frame = useCurrentFrame();

  // Red danger pulse
  const dangerPulse = interpolate(frame, [0, 150, 225], [0, 0.08, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Terminal glitch micro-offset
  const glitchX =
    frame % 30 < 2
      ? (random(`gx-${Math.floor(frame / 30)}`) - 0.5) * 10
      : 0;
  const glitchY =
    frame % 45 < 2
      ? (random(`gy-${Math.floor(frame / 45)}`) - 0.5) * 5
      : 0;

  return (
    <AbsoluteFill style={{background: COLORS.bgPrimary}}>
      {/* Code rain — faint background */}
      <CodeRain columns={50} speed={1.5} seed="chaos-rain" />

      {/* Radial red glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(239,68,68,${dangerPulse}) 0%, transparent 65%)`,
        }}
      />

      {/* Floating ghost snippets — fill the space around the terminal */}
      {ORBIT_POSITIONS.map((pos, i) => {
        const text = CONTENT.chaosSnippets[i % CONTENT.chaosSnippets.length];
        const enterDelay = 15 + i * 12;
        const opacity = interpolate(
          frame,
          [enterDelay, enterDelay + 20, 190, 225],
          [0, 0.3, 0.3, 0],
          {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
        );
        const driftX = Math.sin(frame * 0.012 + i * 2) * 25;
        const driftY = Math.cos(frame * 0.01 + i * 1.5) * 18;
        const isError =
          text.includes('Error') || text.includes('failed') || text.includes('失败') || text.includes('FATAL');

        return (
          <div
            key={`orbit-${i}`}
            style={{
              position: 'absolute',
              left: pos.x + driftX,
              top: pos.y + driftY,
              transform: `rotate(${pos.rot}deg)`,
              opacity,
              fontFamily: FONTS.mono,
              fontSize: 15,
              color: isError ? `${COLORS.red}70` : `${COLORS.textMuted}50`,
              padding: '7px 14px',
              borderRadius: 6,
              border: `1px solid ${isError ? COLORS.red + '18' : COLORS.borderGlass}`,
              background: `${COLORS.bgPrimary}80`,
              whiteSpace: 'nowrap',
              filter: 'blur(0.4px)',
            }}
          >
            {text}
          </div>
        );
      })}

      {/* === Central terminal — LARGE, filling most of the screen === */}
      <AbsoluteFill style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div
          style={{
            width: 1200,
            minHeight: 700,
            borderRadius: 18,
            border: `1px solid ${COLORS.red}25`,
            background: `${COLORS.bgTerminal}f0`,
            overflow: 'hidden',
            boxShadow: `0 0 80px rgba(239,68,68,0.07), 0 30px 60px rgba(0,0,0,0.5)`,
            transform: `translate(${glitchX}px, ${glitchY}px)`,
            opacity: interpolate(frame, [0, 15], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* macOS title bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 20px',
              background: 'rgba(255,255,255,0.03)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              flexShrink: 0,
            }}
          >
            <div style={{width: 12, height: 12, borderRadius: '50%', background: COLORS.dotRed}} />
            <div style={{width: 12, height: 12, borderRadius: '50%', background: COLORS.dotYellow}} />
            <div style={{width: 12, height: 12, borderRadius: '50%', background: COLORS.dotGreen}} />
            <span style={{fontFamily: FONTS.mono, fontSize: 14, color: COLORS.textMuted, marginLeft: 14}}>
              ~/projects — bash
            </span>
            <div style={{flex: 1}} />
            <span style={{fontFamily: FONTS.mono, fontSize: 12, color: `${COLORS.red}80`}}>
              10 errors
            </span>
          </div>

          {/* Terminal body */}
          <div style={{padding: '24px 32px', flex: 1, display: 'flex', flexDirection: 'column'}}>
            {CONTENT.chaosSnippets.map((text, i) => {
              const enterDelay = 8 + i * 12;
              const lineOpacity = interpolate(
                frame,
                [enterDelay, enterDelay + 8, 200, 225],
                [0, 1, 1, 0.3],
                {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
              );
              const lineX = interpolate(frame, [enterDelay, enterDelay + 6], [-30, 0], {
                easing: easeOutCubic,
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });

              const isError =
                text.includes('Error') ||
                text.includes('failed') ||
                text.includes('失败') ||
                text.includes('FATAL');

              // Red flash when error line appears
              const flashIntensity =
                isError && frame > enterDelay + 8 && frame < enterDelay + 20
                  ? interpolate(frame, [enterDelay + 8, enterDelay + 20], [0.12, 0], {
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp',
                    })
                  : 0;

              return (
                <div
                  key={i}
                  style={{
                    opacity: lineOpacity,
                    transform: `translateX(${lineX}px)`,
                    fontFamily: FONTS.mono,
                    fontSize: 18,
                    lineHeight: 2.4,
                    color: isError ? COLORS.red : COLORS.textMuted,
                    background: `rgba(239,68,68,${flashIntensity})`,
                    borderRadius: 4,
                    padding: '0 10px',
                    margin: '0 -10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  {isError ? (
                    <span
                      style={{
                        fontFamily: FONTS.mono,
                        fontSize: 11,
                        padding: '1px 6px',
                        borderRadius: 3,
                        background: `${COLORS.red}20`,
                        color: COLORS.red,
                        fontWeight: 600,
                        flexShrink: 0,
                      }}
                    >
                      ERR
                    </span>
                  ) : (
                    <span style={{color: COLORS.textMuted, fontSize: 16, opacity: 0.35, flexShrink: 0}}>$</span>
                  )}
                  {text}
                </div>
              );
            })}

            {/* Spacer + blinking cursor */}
            <div style={{flex: 1}} />
            <div style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 12}}>
              <span style={{fontFamily: FONTS.mono, fontSize: 18, color: COLORS.textMuted, opacity: 0.35}}>$</span>
              <div
                style={{
                  width: 10,
                  height: 20,
                  background: COLORS.red,
                  borderRadius: 2,
                  opacity: interpolate(Math.sin(frame * 0.15), [-1, 1], [0.15, 0.7]),
                }}
              />
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Thin red glitch bars — rare & subtle */}
      {Array.from({length: 3}, (_, i) => {
        const active = random(`gbar-${frame}-${i}`) > 0.88;
        if (!active) return null;
        const y = random(`gbar-y-${frame}-${i}`) * 1080;
        const h = random(`gbar-h-${frame}-${i}`) * 2 + 1;
        return (
          <div
            key={`gbar-${i}`}
            style={{
              position: 'absolute',
              top: y,
              left: 0,
              width: '100%',
              height: h,
              background: 'rgba(239,68,68,0.05)',
              pointerEvents: 'none',
            }}
          />
        );
      })}

      <Scanlines opacity={0.03} gap={3} />
    </AbsoluteFill>
  );
};
