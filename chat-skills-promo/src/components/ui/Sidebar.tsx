import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../../config/colors';
import {FONTS} from '../../config/typography';
import {getContent} from '../../config/content';
import {L} from '../../config/i18n';
import {useLanguage} from '../../contexts/LanguageContext';
import {SidebarLogo} from './Logo';
import {easeOutCubic} from '../../utils/easing';

export const Sidebar: React.FC<{
  startFrame?: number;
}> = ({startFrame = 0}) => {
  const frame = useCurrentFrame();
  const lang = useLanguage();
  const CONTENT = getContent(lang);
  const elapsed = frame - startFrame;
  const slideX = interpolate(elapsed, [0, 20], [-260, 0], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: 260,
        height: '100%',
        background: COLORS.bgSecondary,
        borderRight: `1px solid ${COLORS.borderGlass}`,
        transform: `translateX(${slideX}px)`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header with logo */}
      <div style={{padding: '16px 16px 12px'}}>
        <SidebarLogo />
      </div>

      {/* New conversation button */}
      <div style={{padding: '0 12px', marginBottom: 8}}>
        <div
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: `1px dashed ${COLORS.borderGlass}`,
            fontFamily: FONTS.body,
            fontSize: 13,
            color: COLORS.textSecondary,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{fontSize: 14}}>+</span> {L(lang, '新对话', 'New Chat')}
        </div>
      </div>

      {/* Conversation list */}
      <div style={{flex: 1, padding: '0 8px', overflow: 'hidden'}}>
        {CONTENT.sidebarConversations.map((conv, i) => {
          const itemOpacity = interpolate(elapsed, [10 + i * 5, 20 + i * 5], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={i}
              style={{
                opacity: itemOpacity,
                fontFamily: FONTS.cn,
                fontSize: 14,
                color: conv.active ? COLORS.green : COLORS.textSecondary,
                padding: '10px 12px',
                borderRadius: 8,
                background: conv.active ? COLORS.greenDim : 'transparent',
                borderLeft: conv.active ? `2px solid ${COLORS.green}` : '2px solid transparent',
                marginBottom: 2,
              }}
            >
              {conv.title}
            </div>
          );
        })}
      </div>

      {/* Installed Skills section */}
      <div
        style={{
          borderTop: `1px solid ${COLORS.borderGlass}`,
          padding: '12px',
        }}
      >
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 11,
            fontWeight: 600,
            color: COLORS.textMuted,
            textTransform: 'uppercase' as const,
            letterSpacing: 1,
            padding: '4px 8px',
            marginBottom: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>Installed Skills</span>
          <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.green, fontWeight: 400, textTransform: 'none', letterSpacing: 0}}>{CONTENT.skills.length}</span>
        </div>
        {CONTENT.skills.map((skill, i) => {
          const skillOpacity = interpolate(elapsed, [25 + i * 4, 33 + i * 4], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={i}
              style={{
                opacity: skillOpacity,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 8px',
                borderRadius: 6,
                fontFamily: FONTS.body,
                fontSize: 12,
                color: COLORS.textSecondary,
              }}
            >
              <span style={{fontSize: 13}}>{skill.icon}</span>
              <span style={{fontFamily: FONTS.mono, fontSize: 11}}>{skill.name}</span>
            </div>
          );
        })}
      </div>

      {/* User profile */}
      <div
        style={{
          borderTop: `1px solid ${COLORS.borderGlass}`,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.blue})`,
          }}
        />
        <div>
          <div style={{fontFamily: FONTS.body, fontSize: 13, fontWeight: 500, color: COLORS.textPrimary}}>
            Developer
          </div>
          <div style={{fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textMuted}}>
            dev@example.com
          </div>
        </div>
      </div>
    </div>
  );
};
