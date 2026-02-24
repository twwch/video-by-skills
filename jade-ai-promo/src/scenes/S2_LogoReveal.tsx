import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors } from '../config/colors';
import { content, L } from '../config/content';
import { useLanguage } from '../contexts/LanguageContext';
import { JadeLogo } from '../components/ui/JadeLogo';
import { AnimatedTitle } from '../components/text/AnimatedTitle';
import { SparkleEffect } from '../components/effects/SparkleEffect';
import { JadeGlow } from '../components/effects/JadeGlow';
import { ParticleField } from '../components/effects/ParticleField';
import { easeOutCubic, progress } from '../utils/easing';

export const S2_LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const lang = useLanguage();

  const sweepP = easeOutCubic(progress(frame, 0, 40));
  const fadeOut = 1 - progress(frame, 155, 25);

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
      {/* Emerald sweep */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: `${sweepP * 120}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${colors.logoGradientTo}30, ${colors.logoGradientFrom}15, transparent)`,
          transform: `translateX(${(1 - sweepP) * -20}%)`,
        }}
      />

      <ParticleField count={20} opacity={0.2} seed="logo" />
      <JadeGlow x="50%" y="45%" size={500} opacity={0.2} pulse />

      {/* Logo */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '38%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 40,
        }}
      >
        <JadeLogo size={80} showText startFrame={30} />
      </div>

      {/* Sparkle around logo */}
      <SparkleEffect
        count={16}
        x={960}
        y={400}
        spread={150}
        startFrame={40}
        seed="logo-sparkle"
      />

      {/* Tagline */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '58%',
          transform: 'translate(-50%, 0)',
        }}
      >
        <AnimatedTitle
          text={L(lang, content.logo.tagline.zh, content.logo.tagline.en)}
          startFrame={80}
          fontSize={28}
          color={colors.textDim}
        />
      </div>
    </div>
  );
};
