import React from 'react';
import {COLORS} from '../../config/colors';
import {FONTS} from '../../config/typography';
import {CONTENT} from '../../config/content';

export const ChatWindow: React.FC<{
  children: React.ReactNode;
}> = ({children}) => {
  return (
    <div
      style={{
        flex: 1,
        height: '100%',
        background: COLORS.bgPrimary,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Top bar — matches original h-[52px] */}
      <div
        style={{
          height: 52,
          borderBottom: `1px solid ${COLORS.borderGlass}`,
          background: COLORS.bgSecondary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
          <span style={{fontFamily: FONTS.heading, fontSize: 14, fontWeight: 600, color: COLORS.textPrimary}}>
            React 项目创建
          </span>
          {/* Active skill count badge */}
          <div
            style={{
              padding: '2px 8px',
              borderRadius: 10,
              background: COLORS.greenDim,
              fontFamily: FONTS.mono,
              fontSize: 11,
              fontWeight: 500,
              color: COLORS.green,
            }}
          >
            2 Skills
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          {/* Token count */}
          <span style={{fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textMuted}}>
            1.2k / 856 tokens
          </span>
          {/* Settings button */}
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: COLORS.bgGlass,
              border: `1px solid ${COLORS.borderGlass}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          </div>
        </div>
      </div>

      {/* Messages area — max-w-[820px] centered */}
      <div style={{flex: 1, overflow: 'hidden', display: 'flex', justifyContent: 'center'}}>
        <div style={{width: '100%', maxWidth: 820, padding: '20px 24px'}}>
          {children}
        </div>
      </div>

      {/* Input area */}
      <div
        style={{
          borderTop: `1px solid ${COLORS.borderGlass}`,
          background: COLORS.bgSecondary,
          padding: '12px 24px 16px',
        }}
      >
        {/* Skill chips row */}
        <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8}}>
          <span style={{fontFamily: FONTS.body, fontSize: 11, color: COLORS.textMuted, marginRight: 4}}>
            Skills
          </span>
          {CONTENT.activeSkillChips.map((chip, i) => (
            <div
              key={i}
              style={{
                padding: '3px 10px',
                borderRadius: 12,
                border: `1px solid ${COLORS.green}40`,
                background: COLORS.greenDim,
                fontFamily: FONTS.mono,
                fontSize: 11,
                color: COLORS.green,
              }}
            >
              {chip}
            </div>
          ))}
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              border: `1px solid ${COLORS.borderGlass}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: FONTS.body,
              fontSize: 12,
              color: COLORS.textMuted,
            }}
          >
            +
          </div>
        </div>

        {/* Input box */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 14px',
            borderRadius: 10,
            background: COLORS.bgCard,
            border: `1px solid ${COLORS.green}40`,
          }}
        >
          {/* Paperclip icon */}
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="2" strokeLinecap="round">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </svg>

          <span style={{flex: 1, fontFamily: FONTS.cn, fontSize: 14, color: COLORS.textMuted}}>
            输入消息...
          </span>

          {/* Model selector */}
          <span style={{fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textMuted, marginRight: 4}}>
            gpt-4o
          </span>

          {/* Send button */}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: COLORS.green,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" fill="white" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
