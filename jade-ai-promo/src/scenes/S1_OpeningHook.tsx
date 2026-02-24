import React from 'react';
import { useCurrentFrame } from 'remotion';
import { random } from 'remotion';
import { colors } from '../config/colors';
import { content, L } from '../config/content';
import { useLanguage } from '../contexts/LanguageContext';
import { easeOutCubic, easeOutQuart, progress } from '../utils/easing';
import { fontFor } from '../config/typography';

/**
 * S1 Opening Hook – Cinematic intro
 *
 * Timeline (150 frames @ 30fps = 5s):
 *   0-10   Dark, ambient glows build
 *  10-40   Fragment cards fly in from edges with energy trails
 *  40-60   Fragments orbit gently
 *  60-75   Warning shake + glitch, red glow intensifies
 *  75-82   Shockwave pulse, fragments scatter outward
 *  82-125  Title materializes with gradient + glow + sparkles
 * 125-150  Fade out
 */
export const S1_OpeningHook: React.FC = () => {
  const frame = useCurrentFrame();
  const lang = useLanguage();
  const fragments =
    lang === 'zh'
      ? content.opening.fragments.zh
      : content.opening.fragments.en;

  const fadeOut = 1 - progress(frame, 125, 25);

  // Fragment configs – fly in from off-screen edges
  const fragmentConfig = fragments.map((_, i) => {
    const angle = random(`frag-a-${i}`) * Math.PI * 2;
    const dist = 900 + random(`frag-d-${i}`) * 400;
    return {
      startX: 960 + Math.cos(angle) * dist,
      startY: 540 + Math.sin(angle) * dist,
      endX: 400 + random(`frag-ex-${i}`) * 1120,
      endY: 250 + random(`frag-ey-${i}`) * 580,
      rotation: -20 + random(`frag-r-${i}`) * 40,
      orbitSpeed: 0.3 + random(`frag-os-${i}`) * 0.7,
      orbitRadius: 6 + random(`frag-or-${i}`) * 14,
      delay: i * 4,
    };
  });

  const shockwaveActive = frame >= 75 && frame < 90;
  const shockwaveP = progress(frame, 75, 15);
  const flashOpacity =
    frame >= 75 && frame < 82
      ? Math.max(0, 1 - progress(frame, 75, 7)) * 0.45
      : 0;
  const titleP = easeOutCubic(progress(frame, 82, 30));
  const lineP = easeOutCubic(progress(frame, 95, 25));

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: colors.bg,
        position: 'relative',
        overflow: 'hidden',
        opacity: fadeOut,
      }}
    >
      {/* ─── BACKGROUND ─── */}

      {/* Ambient glow – pink (right) */}
      <div
        style={{
          position: 'absolute',
          right: -200,
          top: '15%',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.pink500}${hex(14 * pulse(frame, 0.04, 0) * buildUp(frame, 20))}, transparent 65%)`,
        }}
      />
      {/* Ambient glow – emerald (left) */}
      <div
        style={{
          position: 'absolute',
          left: -150,
          bottom: '10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.logoGradientFrom}${hex(12 * pulse(frame, 0.03, 1) * buildUp(frame, 20))}, transparent 65%)`,
        }}
      />
      {/* Ambient glow – blue (center-top) */}
      <div
        style={{
          position: 'absolute',
          left: '35%',
          top: '10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, #3b82f6${hex(10 * pulse(frame, 0.05, 2) * buildUp(frame, 20))}, transparent 65%)`,
        }}
      />

      {/* Dot grid with radial mask */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <svg width="100%" height="100%" style={{ opacity: 0.04 }}>
          <defs>
            <pattern id="og" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="0.8" fill={colors.textDim} />
            </pattern>
            <radialGradient id="ogf">
              <stop offset="0%" stopColor="white" />
              <stop offset="70%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="ogm">
              <rect width="100%" height="100%" fill="url(#ogf)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#og)" mask="url(#ogm)" />
        </svg>
      </div>

      {/* Light streaks */}
      {[
        { start: 5, dur: 30, angle: 20, y: '28%', col: colors.pink500, w: 500 },
        { start: 12, dur: 25, angle: -12, y: '62%', col: colors.logoGradientFrom, w: 420 },
        { start: 20, dur: 22, angle: 8, y: '48%', col: '#3b82f6', w: 360 },
      ].map((s, i) => {
        const p = progress(frame, s.start, s.dur);
        if (p <= 0 || p >= 1) return null;
        const x = -300 + p * 2500;
        const op = (p < 0.5 ? p * 2 : (1 - p) * 2) * 0.4;
        return (
          <div
            key={`str-${i}`}
            style={{
              position: 'absolute',
              left: x,
              top: s.y,
              width: s.w,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${s.col}50, ${s.col}a0, ${s.col}50, transparent)`,
              transform: `rotate(${s.angle}deg)`,
              opacity: op,
            }}
          />
        );
      })}

      {/* Floating particles */}
      {Array.from({ length: 40 }, (_, i) => {
        const px = random(`op-x-${i}`) * 1920;
        const py = random(`op-y-${i}`) * 1080;
        const sz = 1 + random(`op-s-${i}`) * 2.5;
        const sp = 0.2 + random(`op-sp-${i}`) * 0.5;
        const ph = random(`op-ph-${i}`) * Math.PI * 2;
        const cl =
          i % 3 === 0 ? colors.pink400 : i % 3 === 1 ? colors.logoGradientFrom : '#60a5fa';
        const x = px + Math.sin(frame * 0.015 * sp + ph) * 40;
        const rawY = py + Math.cos(frame * 0.01 * sp + ph) * 30 - frame * 0.3 * sp;
        const y = ((rawY % 1080) + 1080) % 1080;
        const op = 0.12 + 0.12 * Math.sin(frame * 0.03 + ph);
        return (
          <div
            key={`pt-${i}`}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: sz,
              height: sz,
              borderRadius: '50%',
              backgroundColor: cl,
              opacity: op,
            }}
          />
        );
      })}

      {/* ─── FRAGMENT CARDS ─── */}
      {fragments.map((frag, i) => {
        const cfg = fragmentConfig[i];
        const flyP = easeOutQuart(progress(frame, 10 + cfg.delay, 25));

        let x = cfg.startX + (cfg.endX - cfg.startX) * flyP;
        let y = cfg.startY + (cfg.endY - cfg.startY) * flyP;

        // Orbit after landing
        if (frame > 40 + cfg.delay) {
          const t = frame - 40 - cfg.delay;
          x += Math.sin(t * 0.03 * cfg.orbitSpeed) * cfg.orbitRadius;
          y += Math.cos(t * 0.025 * cfg.orbitSpeed) * cfg.orbitRadius;
        }

        // Shake (60-75)
        if (frame >= 60 && frame < 75) {
          const intensity = ((frame - 60) / 15) * 10;
          x += Math.sin(frame * 1.3 + i * 3) * intensity;
          y += Math.cos(frame * 1.7 + i * 2) * intensity;
        }

        // Scatter on shockwave (75+)
        if (frame >= 75) {
          const sp = easeOutCubic(progress(frame, 75, 18));
          const sa = random(`scat-${i}`) * Math.PI * 2;
          const sd = 700 + random(`scat-d-${i}`) * 500;
          x += Math.cos(sa) * sd * sp;
          y += Math.sin(sa) * sd * sp;
        }

        let cardOp = flyP;
        if (frame >= 75) cardOp = Math.max(0, 1 - progress(frame, 75, 12));

        const shakeRot =
          frame >= 60 && frame < 75 ? Math.sin(frame * 0.9 + i * 1.5) * 6 : 0;
        const rot = cfg.rotation + shakeRot;

        const glitchX =
          frame >= 60 && frame < 75 && random(`gl-${i}-${Math.floor(frame / 2)}`) > 0.6
            ? (random(`glx-${i}-${Math.floor(frame / 2)}`) - 0.5) * 8
            : 0;

        const isShaking = frame >= 60 && frame < 75;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              transform: `translate(-50%,-50%) rotate(${rot}deg) translateX(${glitchX}px)`,
              opacity: cardOp,
            }}
          >
            {/* Energy trail during fly-in */}
            {flyP > 0.05 && flyP < 0.9 && (
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: 120,
                  height: 2,
                  background: `linear-gradient(90deg, transparent, ${colors.pink400}50)`,
                  transform: `rotate(${Math.atan2(cfg.endY - cfg.startY, cfg.endX - cfg.startX) * (180 / Math.PI) + 180}deg)`,
                  transformOrigin: '0 50%',
                  opacity: (1 - flyP) * 0.6,
                }}
              />
            )}

            <div
              style={{
                padding: '10px 18px',
                backgroundColor: isShaking ? `${colors.appWhite}e0` : colors.appWhite,
                border: `1px solid ${isShaking ? `${colors.red400}80` : colors.appBorder}`,
                borderRadius: 12,
                fontFamily: fontFor(lang),
                fontSize: 14,
                fontWeight: 600,
                color: colors.zinc700,
                boxShadow: isShaking
                  ? `0 0 24px ${colors.error}35, 0 1px 4px rgba(0,0,0,0.08)`
                  : `0 1px 4px rgba(0,0,0,0.06), 0 0 12px ${colors.pink500}0a`,
                whiteSpace: 'nowrap',
              }}
            >
              {frag}
            </div>
          </div>
        );
      })}

      {/* ─── SHOCKWAVE ─── */}
      {shockwaveActive && (
        <>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: shockwaveP * 1800,
              height: shockwaveP * 1800,
              transform: 'translate(-50%,-50%)',
              borderRadius: '50%',
              border: `2px solid ${colors.pink400}`,
              opacity: (1 - shockwaveP) * 0.5,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: shockwaveP * 1400,
              height: shockwaveP * 1400,
              transform: 'translate(-50%,-50%)',
              borderRadius: '50%',
              background: `radial-gradient(circle, transparent 60%, ${colors.pink500}15 80%, transparent 100%)`,
              opacity: (1 - shockwaveP) * 0.8,
            }}
          />
        </>
      )}

      {/* Screen flash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'white',
          opacity: flashOpacity,
          pointerEvents: 'none',
        }}
      />

      {/* ─── TITLE REVEAL ─── */}
      {frame >= 78 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            textAlign: 'center',
          }}
        >
          {/* Glow under text */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%,-50%)',
              width: 900,
              height: 250,
              borderRadius: '50%',
              background: `radial-gradient(ellipse, ${colors.pink500}12, transparent 70%)`,
              opacity: titleP,
            }}
          />

          {/* Gradient text */}
          <div
            style={{
              fontFamily: fontFor(lang),
              fontSize: lang === 'zh' ? 54 : 48,
              fontWeight: 800,
              background: `linear-gradient(135deg, ${colors.text} 0%, #e2e8f0 45%, ${colors.pink400} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              opacity: titleP,
              transform: `translateY(${(1 - titleP) * 30}px) scale(${0.93 + 0.07 * titleP})`,
              letterSpacing: lang === 'zh' ? '0.04em' : '-0.02em',
              lineHeight: 1.3,
              maxWidth: 1000,
            }}
          >
            {L(lang, content.opening.painPoint.zh, content.opening.painPoint.en)}
          </div>

          {/* Accent line */}
          <div
            style={{
              width: 90 * lineP,
              height: 3,
              borderRadius: 2,
              background: `linear-gradient(90deg, ${colors.pink500}, ${colors.logoGradientFrom})`,
              margin: '24px auto 0',
              opacity: lineP,
            }}
          />

          {/* Sparkles around title */}
          {frame >= 90 &&
            Array.from({ length: 8 }, (_, si) => {
              const sa = random(`ts-a-${si}`) * Math.PI * 2;
              const sd = 200 + random(`ts-d-${si}`) * 250;
              const sDel = random(`ts-del-${si}`) * 15;
              const sLife = Math.max(0, frame - 90 - sDel);
              const sFI = Math.min(1, sLife / 8);
              const sFO = Math.max(0, 1 - sLife / 35);
              const sOp = sFI * sFO;
              const sSize = 4 + random(`ts-s-${si}`) * 5;
              const sx = Math.cos(sa) * sd * (0.5 + sLife * 0.02);
              const sy = Math.sin(sa) * sd * (0.3 + sLife * 0.015);
              if (sOp < 0.01) return null;
              return (
                <div
                  key={`sp-${si}`}
                  style={{
                    position: 'absolute',
                    left: `calc(50% + ${sx}px)`,
                    top: `calc(50% + ${sy}px)`,
                    transform: `translate(-50%,-50%) rotate(${sLife * 3}deg)`,
                    opacity: sOp,
                  }}
                >
                  <svg viewBox="0 0 20 20" width={sSize * sOp} height={sSize * sOp}>
                    <path
                      d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z"
                      fill={colors.logoSpark}
                    />
                  </svg>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

const hex = (v: number) =>
  Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0');

const pulse = (frame: number, speed: number, offset: number) =>
  0.5 + 0.5 * Math.sin(frame * speed + offset);

const buildUp = (frame: number, dur: number) => Math.min(1, frame / dur);
