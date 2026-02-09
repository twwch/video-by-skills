import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../../config/colors';
import {FONTS} from '../../config/typography';
import {getContent} from '../../config/content';
import {L} from '../../config/i18n';
import {useLanguage} from '../../contexts/LanguageContext';
import {easeOutBack} from '../../utils/easing';

export const SkillDropdown: React.FC<{
  startFrame?: number;
  selectedIndex?: number;
  selectFrame?: number;
}> = ({startFrame = 0, selectedIndex = 0, selectFrame = 30}) => {
  const frame = useCurrentFrame();
  const lang = useLanguage();
  const CONTENT = getContent(lang);
  const elapsed = frame - startFrame;
  const scale = interpolate(elapsed, [0, 12], [0.9, 1], {
    easing: easeOutBack,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(elapsed, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const isSelected = frame >= startFrame + selectFrame;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        width: 260,
        background: COLORS.bgCard,
        border: `1px solid ${COLORS.borderGlass}`,
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      <div
        style={{
          padding: '8px 14px',
          fontFamily: FONTS.heading,
          fontSize: 12,
          color: COLORS.textMuted,
          borderBottom: `1px solid ${COLORS.borderGlass}`,
        }}
      >
        {L(lang, '选择技能', 'Select Skill')}
      </div>
      {CONTENT.skills.map((skill, i) => {
        const isHighlighted = isSelected && i === selectedIndex;
        return (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              background: isHighlighted ? `${COLORS.green}20` : 'transparent',
              borderLeft: isHighlighted ? `3px solid ${COLORS.green}` : '3px solid transparent',
            }}
          >
            <span style={{fontSize: 16}}>{skill.icon}</span>
            <span style={{fontFamily: FONTS.cn, fontSize: 14, color: isHighlighted ? COLORS.green : COLORS.textPrimary}}>
              {skill.name}
            </span>
            <span style={{fontFamily: FONTS.cn, fontSize: 12, color: COLORS.textMuted, marginLeft: 'auto'}}>
              {skill.desc}
            </span>
          </div>
        );
      })}
    </div>
  );
};
