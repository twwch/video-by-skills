import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors } from '../../config/colors';
import { easeOutCubic, progress } from '../../utils/easing';
import { ChatMessage } from './ChatMessage';
import { useLanguage } from '../../contexts/LanguageContext';
import { L } from '../../config/content';

interface AIChatPanelProps {
  startFrame: number;
  userMessage?: string;
  aiResponse?: string;
  userMsgFrame?: number;
  aiMsgFrame?: number;
}

export const AIChatPanel: React.FC<AIChatPanelProps> = ({
  startFrame,
  userMessage,
  aiResponse,
  userMsgFrame = 0,
  aiMsgFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const lang = useLanguage();
  const slideP = easeOutCubic(progress(frame, startFrame, 25));

  return (
    <div
      style={{
        width: 320, // w-80
        flexShrink: 0,
        backgroundColor: colors.appWhite,
        borderLeft: `1px solid ${colors.appBorder}`,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, "Noto Sans SC", sans-serif',
        opacity: slideP,
        transform: `translateX(${(1 - slideP) * 50}px)`,
        overflow: 'hidden',
      }}
    >
      {/* Header - matching ai-chat-panel.tsx */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${colors.appBorder}`,
          padding: '12px 16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Sparkles icon - pink */}
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.pink500} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
            <path d="M20 3v4" /><path d="M22 5h-4" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 600, color: colors.zinc900 }}>
            {L(lang, 'AI 助手', 'AI Assistant')}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {/* Clock icon */}
          <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.zinc500} strokeWidth={2} strokeLinecap="round">
              <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
            </svg>
          </div>
          {/* Plus icon (new chat) */}
          <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.zinc500} strokeWidth={2} strokeLinecap="round">
              <path d="M5 12h14" /><path d="M12 5v14" />
            </svg>
          </div>
          {/* X icon (close) */}
          <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.zinc500} strokeWidth={2} strokeLinecap="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </div>
        </div>
      </div>

      {/* Messages area - p-4, space-y-4 */}
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
        {/* Default greeting */}
        {!userMessage && (
          <div
            style={{
              borderRadius: 12,
              background: 'linear-gradient(to bottom right, #fdf2f8, #fff1f2)',
              padding: 12,
              fontSize: 13,
              color: colors.pink700,
              lineHeight: 1.5,
            }}
          >
            {L(lang, '你好！我是你的 AI 简历助手。我可以帮你优化简历内容。', "Hi! I'm your AI resume assistant. I can help optimize your resume.")}
          </div>
        )}
        {userMessage && (
          <ChatMessage
            type="user"
            text={userMessage}
            startFrame={userMsgFrame}
            typing
          />
        )}
        {aiResponse && (
          <ChatMessage
            type="ai"
            text={aiResponse}
            startFrame={aiMsgFrame}
            typing
            typingSpeed={0.8}
          />
        )}
      </div>

      {/* Input area - matching ai-input.tsx */}
      <div style={{ padding: 12 }}>
        <div
          style={{
            borderRadius: 16, // rounded-2xl
            border: `1px solid ${colors.zinc200}`,
            backgroundColor: `${colors.zinc50}80`,
            overflow: 'hidden',
          }}
        >
          {/* Textarea area */}
          <div
            style={{
              padding: '12px 16px 8px',
              fontSize: 14,
              color: colors.zinc400,
              minHeight: 40,
            }}
          >
            {L(lang, '输入消息...', 'Type a message...')}
          </div>
          {/* Bottom toolbar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 12px 10px',
            }}
          >
            {/* Model selector */}
            <div
              style={{
                height: 28,
                borderRadius: 9999,
                border: `1px solid ${colors.zinc200}`,
                backgroundColor: colors.appWhite,
                padding: '0 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 11,
                fontWeight: 500,
                color: colors.zinc600,
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: colors.emerald400 }} />
              GPT-4o
            </div>
            {/* Send button */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: colors.zinc200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.4,
              }}
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.zinc500} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18.168-8.215a.5.5 0 0 0 0-.904z" />
                <path d="M6 12h16" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
