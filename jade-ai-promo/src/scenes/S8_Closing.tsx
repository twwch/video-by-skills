import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors } from '../config/colors';
import { content, L } from '../config/content';
import { useLanguage } from '../contexts/LanguageContext';
import { JadeLogo } from '../components/ui/JadeLogo';
import { AnimatedTitle } from '../components/text/AnimatedTitle';
import { SparkleEffect } from '../components/effects/SparkleEffect';
import { ParticleField } from '../components/effects/ParticleField';
import { JadeGlow } from '../components/effects/JadeGlow';
import { easeOutCubic, progress } from '../utils/easing';
import { fonts } from '../config/typography';

export const S8_Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const lang = useLanguage();

  const bgPulse = 0.06 + 0.02 * Math.sin(frame * 0.03);

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: colors.bg,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
      }}
    >
      {/* Pulsing emerald background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at center, ${colors.logoGradientFrom}${Math.round(bgPulse * 255).toString(16).padStart(2, '0')}, transparent 70%)`,
        }}
      />

      <ParticleField count={25} opacity={0.2} seed="closing" />
      <JadeGlow x="50%" y="45%" size={500} opacity={0.12} pulse />

      {/* Logo */}
      <JadeLogo size={80} showText startFrame={10} />

      {/* Sparkle */}
      <SparkleEffect
        count={20}
        x={960}
        y={440}
        spread={200}
        startFrame={15}
        seed="closing-sparkle"
      />

      {/* Tagline */}
      <AnimatedTitle
        text={L(lang, content.closing.tagline.zh, content.closing.tagline.en)}
        startFrame={50}
        fontSize={28}
        color={colors.textDim}
      />

      {/* GitHub CTA */}
      <div
        style={{
          opacity: easeOutCubic(progress(frame, 100, 25)),
          transform: `translateY(${(1 - easeOutCubic(progress(frame, 100, 25))) * 20}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          marginTop: 16,
        }}
      >
        {/* CTA button - pink-500 matching original */}
        <div
          style={{
            padding: '12px 32px',
            borderRadius: 10,
            backgroundColor: colors.pink500,
            color: 'white',
            fontSize: 16,
            fontWeight: 600,
            fontFamily: 'Inter, "Noto Sans SC", sans-serif',
          }}
        >
          {L(lang, content.closing.cta.zh, content.closing.cta.en)}
        </div>

        {/* GitHub URL */}
        <div
          style={{
            fontSize: 16,
            color: colors.textDim,
            fontFamily: fonts.mono,
            opacity: easeOutCubic(progress(frame, 120, 25)),
          }}
        >
          {content.closing.github}
        </div>
      </div>
    </div>
  );
};
