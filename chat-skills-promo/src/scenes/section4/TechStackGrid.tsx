import React from 'react';
import {AbsoluteFill} from 'remotion';
import {COLORS} from '../../config/colors';
import {CONTENT} from '../../config/content';
import {L} from '../../config/i18n';
import {useLanguage} from '../../contexts/LanguageContext';
import {TechBadge} from '../../components/ui/TechBadge';
import {GradientText} from '../../components/text/GradientText';
import {AnimatedHeadline} from '../../components/text/AnimatedHeadline';
import {ParticleField} from '../../components/effects/ParticleField';

export const TechStackGrid: React.FC = () => {
  const lang = useLanguage();

  return (
    <AbsoluteFill style={{background: COLORS.bgPrimary}}>
      <ParticleField count={20} color={COLORS.blue} seed="tech" />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
        }}
      >
        <AnimatedHeadline text={L(lang, '技术栈', 'Tech Stack')} fontSize={42} startFrame={5} />

        {/* 3x3 Grid */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 16,
            width: 520,
          }}
        >
          {CONTENT.techStack.map((tech, i) => (
            <TechBadge
              key={i}
              name={tech.name}
              color={tech.color}
              enterFrame={15 + i * 8}
            />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
