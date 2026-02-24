import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors } from '../config/colors';
import { content, L } from '../config/content';
import { useLanguage } from '../contexts/LanguageContext';
import { ResumeTemplate } from '../components/ui/ResumeTemplate';
import { AnimatedTitle } from '../components/text/AnimatedTitle';
import { JadeGlow } from '../components/effects/JadeGlow';
import { ParticleField } from '../components/effects/ParticleField';
import { easeOutCubic, progress } from '../utils/easing';

export const S6_Templates: React.FC = () => {
  const frame = useCurrentFrame();
  const lang = useLanguage();

  // Phase 1: title (0-30)
  // Phase 2: templates appear (30-80)
  // Phase 3: active indicator slides (100-300)
  // Phase 4: fade out (330-360)
  const fadeOut = 1 - progress(frame, 330, 30);

  // Which template is active (cycles)
  const cycleFrame = Math.max(0, frame - 100);
  const activeIndex = Math.floor(cycleFrame / 70) % 3;

  // Indicator slide position
  const indicatorX = -380 + activeIndex * 380;

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
      <ParticleField count={15} opacity={0.15} seed="templates" />
      <JadeGlow x="50%" y="60%" size={600} opacity={0.1} />

      {/* Title */}
      <div style={{ marginTop: 80, marginBottom: 60 }}>
        <AnimatedTitle
          text={L(lang, '3 套专业模板', '3 Professional Templates')}
          startFrame={0}
          fontSize={48}
        />
      </div>

      {/* Templates row */}
      <div style={{ display: 'flex', gap: 60, alignItems: 'flex-start', position: 'relative' }}>
        {(['classic', 'modern', 'minimal'] as const).map((variant, i) => (
          <ResumeTemplate
            key={variant}
            variant={variant}
            startFrame={30 + i * 10}
            active={frame > 100 && activeIndex === i}
          />
        ))}
      </div>

      {/* Active indicator bar */}
      {frame > 100 && (
        <div
          style={{
            width: 60,
            height: 4,
            borderRadius: 2,
            background: `linear-gradient(90deg, ${colors.pink400}, ${colors.pink500})`,
            marginTop: 20,
            transform: `translateX(${indicatorX}px)`,
            transition: 'transform 0.3s',
          }}
        />
      )}
    </div>
  );
};
