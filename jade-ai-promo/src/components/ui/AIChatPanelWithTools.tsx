import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors } from '../../config/colors';
import { content, L, Language } from '../../config/content';
import { easeOutCubic, progress } from '../../utils/easing';
import { ChatMessage } from './ChatMessage';
import { ToolCallCard, ThinkingDots } from './ToolCallCard';

/*
 * Timeline for the AI chat flow (frame offsets within the scene, panel appears at startFrame):
 *
 * 40-100:  User message types in
 * 100-130: Thinking dots (pink bouncing)
 * 130-170: AI first text streams: "Let me analyze and improve..."
 * 170:     Tool call card appears (updateSection, spinner running)
 * 210:     Tool completes (spinner → Terminal icon, result block with green check)
 * 220-380: AI confirmation text streams
 */

interface AIChatPanelWithToolsProps {
  startFrame: number;
  lang: Language;
}

export const AIChatPanelWithTools: React.FC<AIChatPanelWithToolsProps> = ({
  startFrame,
  lang,
}) => {
  const frame = useCurrentFrame();
  const slideP = easeOutCubic(progress(frame, startFrame, 25));

  const userMsg = L(lang, content.ai.userMsg.zh, content.ai.userMsg.en);
  const aiFirstText = L(
    lang,
    '好的，让我来分析并优化你的工作经历描述...',
    "Let me analyze and improve your work experience descriptions..."
  );
  const aiConfirmText = L(
    lang,
    content.ai.aiResponse.zh,
    content.ai.aiResponse.en
  );

  // Frame offsets
  const userMsgFrame = 40;
  const thinkingStart = 100;
  const thinkingEnd = 130;
  const aiFirstTextFrame = 130;
  const toolCallFrame = 170;
  const toolCompleteFrame = 210;
  const aiConfirmFrame = 220;

  const showThinking = frame >= thinkingStart && frame < thinkingEnd;

  return (
    <div
      style={{
        width: 320,
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
      {/* Header */}
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
          {/* Sparkles icon */}
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.pink500} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
            <path d="M20 3v4" /><path d="M22 5h-4" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 600, color: colors.zinc900 }}>
            {L(lang, 'AI 助手', 'AI Assistant')}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {[
            // Clock
            [['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 6v6l4 2']],
            // Plus
            [['M5 12h14', 'M12 5v14']],
            // X
            [['M18 6 6 18', 'm6 6 12 12']],
          ].map((paths, idx) => (
            <div key={idx} style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.zinc500} strokeWidth={2} strokeLinecap="round">
                {(paths[0] as string[]).map((d, i) => <path key={i} d={d} />)}
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Messages area */}
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
        {/* User message */}
        <ChatMessage
          type="user"
          text={userMsg}
          startFrame={userMsgFrame}
          typing
          typingSpeed={1}
        />

        {/* Thinking dots */}
        {showThinking && <ThinkingDots startFrame={thinkingStart} />}

        {/* AI assistant message - contains text + tool call + more text */}
        {frame >= aiFirstTextFrame && (
          <div style={{ display: 'flex', gap: 10 }}>
            {/* Bot avatar */}
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: `linear-gradient(to bottom right, ${colors.pink400}, ${colors.pink500})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8V4H8" />
                <rect width="16" height="12" x="4" y="8" rx="2" />
                <path d="M2 14h2" /><path d="M20 14h2" />
                <path d="M15 13v2" /><path d="M9 13v2" />
              </svg>
            </div>

            {/* Message content column */}
            <div style={{ maxWidth: 'calc(100% - 34px)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* First text chunk */}
              <div
                style={{
                  padding: '8px 12px',
                  borderRadius: 16,
                  backgroundColor: colors.zinc50,
                  color: colors.zinc700,
                  fontSize: 13,
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                  boxShadow: `inset 0 0 0 1px ${colors.zinc200}60`,
                }}
              >
                <TypewriterInline text={aiFirstText} startFrame={aiFirstTextFrame} speed={0.8} />
              </div>

              {/* Tool call card */}
              {frame >= toolCallFrame && (
                <ToolCallCard
                  toolName="updateSection"
                  args='{"sectionId":"work_exp_1","field":"description"}'
                  startFrame={toolCallFrame}
                  completeFrame={toolCompleteFrame}
                />
              )}

              {/* AI confirmation text after tool completes */}
              {frame >= aiConfirmFrame && (
                <div
                  style={{
                    padding: '8px 12px',
                    borderRadius: 16,
                    backgroundColor: colors.zinc50,
                    color: colors.zinc700,
                    fontSize: 13,
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                    boxShadow: `inset 0 0 0 1px ${colors.zinc200}60`,
                  }}
                >
                  <TypewriterInline text={aiConfirmText} startFrame={aiConfirmFrame} speed={0.6} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div style={{ padding: 12 }}>
        <div
          style={{
            borderRadius: 16,
            border: `1px solid ${colors.zinc200}`,
            backgroundColor: `${colors.zinc50}80`,
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '12px 16px 8px', fontSize: 14, color: colors.zinc400, minHeight: 40 }}>
            {L(lang, '输入消息...', 'Type a message...')}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px 10px' }}>
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

// Inline typewriter (no cursor, just text appearing)
const TypewriterInline: React.FC<{
  text: string;
  startFrame: number;
  speed?: number;
}> = ({ text, startFrame, speed = 0.5 }) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const charCount = Math.min(text.length, Math.floor(elapsed * speed));
  const displayText = text.slice(0, charCount);
  const showCursor = charCount < text.length;

  return (
    <>
      {displayText}
      {showCursor && (
        <span
          style={{
            display: 'inline-block',
            width: 2,
            height: 13,
            backgroundColor: colors.pink500,
            marginLeft: 1,
            opacity: Math.sin(frame * 0.2) > 0 ? 1 : 0,
            verticalAlign: 'text-bottom',
          }}
        />
      )}
    </>
  );
};
