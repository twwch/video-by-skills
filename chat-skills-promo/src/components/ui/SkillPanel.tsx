import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../../config/colors';
import {FONTS} from '../../config/typography';
import {getContent} from '../../config/content';
import {L} from '../../config/i18n';
import {useLanguage} from '../../contexts/LanguageContext';
import {easeOutCubic} from '../../utils/easing';

/** Right panel — skill context + activity timeline (300px) matching original */
export const SkillPanel: React.FC<{
  startFrame?: number;
}> = ({startFrame = 0}) => {
  const frame = useCurrentFrame();
  const lang = useLanguage();
  const CONTENT = getContent(lang);
  const elapsed = frame - startFrame;
  const slideX = interpolate(elapsed, [0, 20], [300, 0], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const activityTypeColor: Record<string, string> = {
    info: COLORS.blue,
    skill: COLORS.green,
    success: COLORS.green,
    file: COLORS.amber,
  };

  return (
    <div
      style={{
        width: 300,
        minWidth: 300,
        height: '100%',
        background: COLORS.bgSecondary,
        borderLeft: `1px solid ${COLORS.borderGlass}`,
        transform: `translateX(${slideX}px)`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Skill context section */}
      <div style={{padding: '14px 16px', borderBottom: `1px solid ${COLORS.borderGlass}`}}>
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 11,
            fontWeight: 600,
            color: COLORS.textMuted,
            textTransform: 'uppercase' as const,
            letterSpacing: 1,
            marginBottom: 12,
          }}
        >
          {L(lang, 'Skill Context', 'Skill Context')}
        </div>

        {/* Active skill card */}
        <div
          style={{
            padding: 14,
            borderRadius: 12,
            border: `1px solid ${COLORS.borderGlass}`,
            background: COLORS.bgCard,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10}}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: COLORS.greenDim,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
              }}
            >
              ⌨️
            </div>
            <div>
              <div style={{fontFamily: FONTS.heading, fontSize: 13, fontWeight: 600, color: COLORS.textPrimary}}>
                terminal
              </div>
              <div style={{fontFamily: FONTS.body, fontSize: 11, color: COLORS.textMuted}}>
                {L(lang, '终端执行', 'Terminal')}
              </div>
            </div>
          </div>
          <div style={{fontFamily: FONTS.cn, fontSize: 12, color: COLORS.textMuted, lineHeight: 1.5}}>
            {L(lang, '在安全沙箱中执行命令和脚本，支持 Node.js、Python 等运行时', 'Execute commands and scripts in a sandbox with Node.js, Python, and more')}
          </div>

          {/* Meta rows */}
          {[
            {label: L(lang, '状态', 'Status'), value: L(lang, '就绪', 'Ready')},
            {label: L(lang, '超时', 'Timeout'), value: '30s'},
            {label: L(lang, '沙箱', 'Sandbox'), value: 'Docker'},
          ].map((row, i) => {
            const rowOpacity = interpolate(elapsed, [20 + i * 5, 30 + i * 5], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <div
                key={i}
                style={{
                  opacity: rowOpacity,
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '6px 0',
                  borderTop: i === 0 ? `1px solid ${COLORS.borderGlass}` : 'none',
                  marginTop: i === 0 ? 10 : 0,
                }}
              >
                <span style={{fontFamily: FONTS.body, fontSize: 11, color: COLORS.textMuted}}>
                  {row.label}
                </span>
                <span style={{fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textSecondary}}>
                  {row.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity timeline */}
      <div style={{flex: 1, padding: '14px 16px', overflow: 'hidden'}}>
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 11,
            fontWeight: 600,
            color: COLORS.textMuted,
            textTransform: 'uppercase' as const,
            letterSpacing: 1,
            marginBottom: 12,
          }}
        >
          Activity
        </div>

        <div style={{position: 'relative'}}>
          {/* Timeline line */}
          <div
            style={{
              position: 'absolute',
              left: 8,
              top: 18,
              bottom: 0,
              width: 1,
              background: COLORS.borderGlass,
            }}
          />

          {CONTENT.activityTimeline.map((item, i) => {
            const itemOpacity = interpolate(elapsed, [30 + i * 10, 45 + i * 10], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const dotColor = activityTypeColor[item.type] || COLORS.textMuted;
            return (
              <div
                key={i}
                style={{
                  opacity: itemOpacity,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  marginBottom: 16,
                  position: 'relative',
                }}
              >
                {/* Dot */}
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: `${dotColor}20`,
                    border: `1.5px solid ${dotColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <div style={{width: 6, height: 6, borderRadius: '50%', background: dotColor}} />
                </div>
                <div>
                  <div style={{fontFamily: FONTS.cn, fontSize: 12, color: COLORS.textSecondary}}>
                    {item.action}
                  </div>
                  <div style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted, marginTop: 2}}>
                    {L(lang, '刚刚', 'just now')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Session stats */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: `1px solid ${COLORS.borderGlass}`,
        }}
      >
        <div
          style={{
            padding: 12,
            borderRadius: 12,
            border: `1px solid ${COLORS.borderGlass}`,
            background: COLORS.bgCard,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 8,
          }}
        >
          {[
            {label: 'Skills Called', value: '3'},
            {label: 'Scripts Run', value: '2'},
            {label: 'Files Changed', value: '5'},
            {label: 'Deps Installed', value: '23'},
          ].map((stat, i) => {
            const statOpacity = interpolate(elapsed, [40 + i * 5, 50 + i * 5], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <div key={i} style={{opacity: statOpacity, textAlign: 'center'}}>
                <div style={{fontFamily: FONTS.mono, fontSize: 16, fontWeight: 600, color: COLORS.textPrimary}}>
                  {stat.value}
                </div>
                <div style={{fontFamily: FONTS.body, fontSize: 10, color: COLORS.textMuted}}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
