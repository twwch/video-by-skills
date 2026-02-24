import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors } from '../config/colors';
import { content, L } from '../config/content';
import { useLanguage } from '../contexts/LanguageContext';
import { FeatureCard } from '../components/ui/FeatureCard';
import { AnimatedTitle } from '../components/text/AnimatedTitle';
import { GridPattern } from '../components/effects/GridPattern';
import { JadeGlow } from '../components/effects/JadeGlow';
import { progress } from '../utils/easing';

export const S7_Features: React.FC = () => {
  const frame = useCurrentFrame();
  const lang = useLanguage();

  // Phase 1: title (0-30)
  // Phase 2: cards stagger in (40-140)
  // Phase 3: visible (140-340)
  // Phase 4: fade out (350-390)
  const fadeOut = 1 - progress(frame, 360, 30);

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
        opacity: fadeOut,
      }}
    >
      <GridPattern opacity={0.06} />
      <JadeGlow x="50%" y="50%" size={700} opacity={0.08} />

      {/* Title */}
      <div style={{ marginTop: 70, marginBottom: 50 }}>
        <AnimatedTitle
          text={L(lang, '核心功能', 'Key Features')}
          startFrame={0}
          fontSize={48}
        />
      </div>

      {/* 3x2 Feature grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 340px)',
          gridTemplateRows: 'repeat(2, auto)',
          gap: 24,
        }}
      >
        {content.features.map((feat, i) => (
          <FeatureCard
            key={i}
            icon={feat.icon}
            title={L(lang, feat.title.zh, feat.title.en)}
            desc={L(lang, feat.desc.zh, feat.desc.en)}
            startFrame={40}
            index={i}
          />
        ))}
      </div>
    </div>
  );
};
