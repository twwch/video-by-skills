import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS, GRADIENT} from '../../config/colors';
import {FONTS} from '../../config/typography';
import {easeOutCubic} from '../../utils/easing';

// SVG icons matching the original app
const UserIcon: React.FC = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LayersIcon: React.FC = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

export const ChatMessage: React.FC<{
  role: 'user' | 'ai' | 'skill-invoke';
  text: string;
  enterFrame: number;
  skillName?: string;
  skillStatus?: 'running' | 'success' | 'error';
  terminalLines?: readonly {text: string; type: 'cmd' | 'output' | 'success' | 'error' | 'info'}[];
  duration?: string;
}> = ({role, text, enterFrame, skillName, skillStatus, terminalLines, duration}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - enterFrame;
  const opacity = interpolate(elapsed, [0, 12], [0, 1], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(elapsed, [0, 12], [16, 0], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (role === 'skill-invoke') {
    return (
      <SkillInvokeCard
        skillName={skillName || 'terminal'}
        status={skillStatus || 'success'}
        terminalLines={terminalLines || []}
        duration={duration}
        opacity={opacity}
        y={y}
        enterFrame={enterFrame}
      />
    );
  }

  const isUser = role === 'user';
  const avatarGradient = isUser ? GRADIENT.userAvatar : GRADIENT.aiAvatar;
  const label = isUser ? '你' : 'Chat-Skills';

  return (
    <div style={{opacity, transform: `translateY(${y}px)`, display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16}}>
      {/* Avatar */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: avatarGradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {isUser ? <UserIcon /> : <LayersIcon />}
      </div>

      {/* Content */}
      <div style={{flex: 1, minWidth: 0}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4}}>
          <span style={{fontFamily: FONTS.body, fontSize: 13, fontWeight: 600, color: COLORS.textPrimary}}>
            {label}
          </span>
          <span style={{fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textMuted}}>
            刚刚
          </span>
        </div>
        <div
          style={{
            fontFamily: FONTS.cn,
            fontSize: 14,
            color: COLORS.textSecondary,
            lineHeight: 1.6,
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

/** Skill invoke card matching the original's glass card design */
const SkillInvokeCard: React.FC<{
  skillName: string;
  status: 'running' | 'success' | 'error';
  terminalLines: readonly {text: string; type: string}[];
  duration?: string;
  opacity: number;
  y: number;
  enterFrame: number;
}> = ({skillName, status, terminalLines, duration, opacity, y, enterFrame}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - enterFrame;

  const statusColors: Record<string, {bg: string; text: string; label: string}> = {
    running: {bg: COLORS.blueDim, text: COLORS.blue, label: '运行中'},
    success: {bg: COLORS.greenDim, text: COLORS.green, label: '完成'},
    error: {bg: COLORS.redDim, text: COLORS.red, label: '失败'},
  };
  const st = statusColors[status];

  const lineColors: Record<string, string> = {
    cmd: COLORS.textPrimary,
    output: COLORS.textMuted,
    success: COLORS.green,
    error: COLORS.red,
    info: COLORS.blue,
  };

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        marginBottom: 16,
        marginLeft: 44,
        borderRadius: 16,
        border: `1px solid ${COLORS.borderGlass}`,
        background: COLORS.bgCard,
        overflow: 'hidden',
      }}
    >
      {/* Card header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          background: COLORS.bgGlass,
          borderBottom: `1px solid ${COLORS.borderGlass}`,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: COLORS.greenDim,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
            }}
          >
            ⌨️
          </div>
          <span style={{fontFamily: FONTS.heading, fontSize: 13, fontWeight: 600, color: COLORS.textPrimary}}>
            {skillName}
          </span>
        </div>
        {/* Status badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '3px 10px',
            borderRadius: 12,
            background: st.bg,
            fontFamily: FONTS.body,
            fontSize: 11,
            fontWeight: 500,
            color: st.text,
          }}
        >
          {status === 'success' && '✓'} {st.label}
        </div>
      </div>

      {/* Terminal content */}
      <div style={{background: COLORS.bgTerminal, padding: '12px 16px'}}>
        {/* macOS dots */}
        <div style={{display: 'flex', gap: 6, marginBottom: 10}}>
          <div style={{width: 8, height: 8, borderRadius: '50%', background: COLORS.dotRed}} />
          <div style={{width: 8, height: 8, borderRadius: '50%', background: COLORS.dotYellow}} />
          <div style={{width: 8, height: 8, borderRadius: '50%', background: COLORS.dotGreen}} />
        </div>
        {terminalLines.map((line, i) => {
          const lineOpacity = interpolate(elapsed, [15 + i * 12, 25 + i * 12], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={i}
              style={{
                opacity: lineOpacity,
                fontFamily: FONTS.mono,
                fontSize: 12,
                lineHeight: 1.7,
                color: lineColors[line.type] || COLORS.textMuted,
              }}
            >
              {line.text}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {duration && (
        <div
          style={{
            padding: '8px 14px',
            borderTop: `1px solid ${COLORS.borderGlass}`,
            background: 'rgba(255,255,255,0.02)',
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: FONTS.mono,
            fontSize: 11,
            color: COLORS.textMuted,
          }}
        >
          <span>耗时 {duration}</span>
          <span>exit code: 0</span>
        </div>
      )}
    </div>
  );
};
