import React from 'react';
import { useCurrentFrame, AbsoluteFill } from 'remotion';
import { theme } from '../../config/colors';
import { fonts } from '../../config/typography';
import { easeOutCubic, easeOutBack, progress } from '../../utils/easing';
import { PulseGlow } from '../../components/effects/PulseGlow';
import { ParticleField } from '../../components/effects/ParticleField';
import { FontLoader } from '../../components/FontLoader';

export const ClosingTagline: React.FC = () => {
  const frame = useCurrentFrame();

  const taglineP = easeOutBack(progress(frame, 5, 40));
  const ctaP = easeOutCubic(progress(frame, 30, 60));
  const githubP = easeOutCubic(progress(frame, 45, 75));

  return (
    <AbsoluteFill
      style={{
        background: theme.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FontLoader />
      <ParticleField count={50} color="#8B5CF6" seed="closing" />
      <PulseGlow color="#3B82F6" x="40%" size={500} />
      <PulseGlow color="#8B5CF6" x="60%" size={500} />

      {/* Main tagline */}
      <div
        style={{
          opacity: taglineP,
          transform: `scale(${0.8 + taglineP * 0.2})`,
          fontFamily: fonts.heading,
          fontSize: 52,
          fontWeight: 700,
          color: theme.text,
          textAlign: 'center',
          lineHeight: 1.3,
        }}
      >
        <span style={{ color: '#3B82F6' }}>6 Agents.</span>{' '}
        <span style={{ color: '#8B5CF6' }}>Infinite Possibilities.</span>
      </div>

      {/* CTA */}
      <div
        style={{
          marginTop: 40,
          opacity: ctaP,
          transform: `translateY(${(1 - ctaP) * 20}px)`,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '14px 32px',
          borderRadius: 12,
          background: 'linear-gradient(135deg, #3B82F620, #8B5CF620)',
          border: '1px solid #3B82F640',
        }}
      >
        <span style={{ fontSize: 24 }}>⭐</span>
        <span
          style={{
            fontFamily: fonts.heading,
            fontSize: 22,
            fontWeight: 600,
            color: theme.text,
          }}
        >
          Star us on GitHub
        </span>
      </div>

      {/* GitHub URL */}
      <div
        style={{
          marginTop: 16,
          opacity: githubP,
          fontFamily: fonts.mono,
          fontSize: 18,
          color: theme.textMuted,
        }}
      >
        github.com/twwch/DeepDiagram
      </div>
    </AbsoluteFill>
  );
};
