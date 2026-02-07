import React from 'react';
import { useCurrentFrame, AbsoluteFill, staticFile, Img } from 'remotion';
import { theme } from '../../config/colors';
import { fonts } from '../../config/typography';
import { easeOutCubic, easeOutBack, progress, clamp } from '../../utils/easing';
import { PulseGlow } from '../../components/effects/PulseGlow';
import { ParticleField } from '../../components/effects/ParticleField';
import { FontLoader } from '../../components/FontLoader';

const AGENT_CHIPS = [
  { icon: '☆', label: 'Mindmap', color: '#F59E0B' },
  { icon: '◇', label: 'Flowchart', color: '#6366F1' },
  { icon: '▥', label: 'Charts', color: '#F43F5E' },
  { icon: '◈', label: 'Draw.io', color: '#3B82F6' },
  { icon: '</>', label: 'Mermaid', color: '#10B981' },
  { icon: '▦', label: 'Infographic', color: '#8B5CF6' },
] as const;

const FEATURES = [
  { label: 'LangGraph Powered', icon: '⚡' },
  { label: 'Real-time Streaming', icon: '◉' },
  { label: 'Multimodal Input', icon: '📄' },
  { label: 'Open Source', icon: '⭐' },
] as const;

export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();

  const logoP = easeOutBack(progress(frame, 8, 40));
  const taglineP = easeOutCubic(progress(frame, 30, 55));
  const descP = easeOutCubic(progress(frame, 45, 70));
  const chipsP = progress(frame, 60, 120);
  const featuresP = progress(frame, 105, 150);
  const githubP = easeOutCubic(progress(frame, 140, 165));

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
      <ParticleField count={40} color="#3B82F6" seed="opening" />
      <PulseGlow color="#3B82F6" size={600} />
      <PulseGlow color="#8B5CF6" x="30%" y="60%" size={400} />

      {/* Logo */}
      <div
        style={{
          opacity: logoP,
          transform: `scale(${logoP}) translateY(${(1 - logoP) * 30}px)`,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        {/* Product logo */}
        <Img
          src={staticFile('logo.png')}
          style={{ width: 72, height: 72, borderRadius: 14 }}
        />

        <span
          style={{
            fontFamily: fonts.heading,
            fontSize: 72,
            fontWeight: 700,
            color: theme.text,
            letterSpacing: '-0.02em',
          }}
        >
          Deep
          <span style={{ color: '#3B82F6' }}>Diagram</span>
          {' '}
          <span style={{ fontSize: 54, fontWeight: 500, color: theme.textSecondary }}>
            AI
          </span>
        </span>
      </div>

      {/* Tagline */}
      <div
        style={{
          marginTop: 20,
          opacity: taglineP,
          transform: `translateY(${(1 - taglineP) * 20}px)`,
          fontFamily: fonts.body,
          fontSize: 32,
          color: theme.textSecondary,
          letterSpacing: '0.02em',
        }}
      >
        Turn your ideas into structured visuals instantly
      </div>

      {/* Description */}
      <div
        style={{
          marginTop: 12,
          opacity: descP,
          transform: `translateY(${(1 - descP) * 15}px)`,
          fontFamily: fonts.body,
          fontSize: 22,
          color: theme.textMuted,
          textAlign: 'center',
          maxWidth: 860,
          lineHeight: 1.5,
        }}
      >
        Agentic AI platform that transforms natural language into professional
        diagrams through 6 specialized visualization agents
      </div>

      {/* Agent Chips */}
      <div
        style={{
          marginTop: 32,
          display: 'flex',
          gap: 14,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {AGENT_CHIPS.map((chip, i) => {
          const chipDelay = i * 6;
          const chipP = easeOutCubic(clamp((chipsP * 60 - chipDelay) / 12, 0, 1));
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '9px 20px',
                borderRadius: 20,
                background: `${chip.color}15`,
                border: `1px solid ${chip.color}35`,
                opacity: chipP,
                transform: `translateY(${(1 - chipP) * 12}px) scale(${0.9 + chipP * 0.1})`,
              }}
            >
              <span style={{ fontSize: 16, color: chip.color }}>{chip.icon}</span>
              <span
                style={{
                  fontFamily: fonts.body,
                  fontSize: 17,
                  fontWeight: 500,
                  color: chip.color,
                }}
              >
                {chip.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Feature badges */}
      <div
        style={{
          marginTop: 28,
          display: 'flex',
          gap: 28,
          alignItems: 'center',
        }}
      >
        {FEATURES.map((feat, i) => {
          const featDelay = i * 5;
          const featP = easeOutCubic(clamp((featuresP * 45 - featDelay) / 10, 0, 1));
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                opacity: featP,
                transform: `translateY(${(1 - featP) * 10}px)`,
              }}
            >
              <span style={{ fontSize: 16 }}>{feat.icon}</span>
              <span
                style={{
                  fontFamily: fonts.body,
                  fontSize: 16,
                  color: theme.textMuted,
                  fontWeight: 500,
                }}
              >
                {feat.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* GitHub URL */}
      <div
        style={{
          marginTop: 28,
          opacity: githubP,
          transform: `translateY(${(1 - githubP) * 10}px)`,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 24px',
          borderRadius: 10,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <svg width={22} height={22} viewBox="0 0 24 24" fill="#9CA3AF">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 18,
            color: theme.textSecondary,
          }}
        >
          github.com/twwch/DeepDiagram
        </span>
      </div>
    </AbsoluteFill>
  );
};
