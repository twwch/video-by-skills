import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors } from '../config/colors';
import { content, L } from '../config/content';
import { useLanguage } from '../contexts/LanguageContext';
import { EditorLayout } from '../components/ui/EditorLayout';
import { EditorSidebar } from '../components/ui/EditorSidebar';
import { EditorPreviewPanel } from '../components/ui/EditorPreviewPanel';
import { ChatMessage } from '../components/ui/ChatMessage';
import { ToolCallCard, ThinkingDots } from '../components/ui/ToolCallCard';
import { SparkleEffect } from '../components/effects/SparkleEffect';
import { JadeGlow } from '../components/effects/JadeGlow';
import { easeOutCubic, easeOutBack, progress } from '../utils/easing';
import { fontFor } from '../config/typography';

/**
 * S5 AI Assistant – Matches real app's floating chat bubble:
 *
 * Timeline (450 frames):
 *   0-20   Editor with 3-panel layout appears
 *  20-35   Floating bubble appears at bottom-right
 *  35-45   Bubble "clicks" – bounces, then window opens
 *  45+     Chat window (440×620) with pink gradient title bar
 *  60-120  User message types
 * 120-150  Thinking dots
 * 150-190  AI first text streams
 * 190-230  Tool call runs
 * 230+     Content transforms + AI confirm text
 * 420-450  Fade out
 */
export const S5_AIAssistant: React.FC = () => {
  const frame = useCurrentFrame();
  const lang = useLanguage();

  const fadeOut = 1 - progress(frame, 420, 30);

  // Bubble & window animation
  const bubbleP = easeOutBack(progress(frame, 20, 15));
  const bubbleClick = frame >= 35 && frame < 40;
  const bubbleScale = bubbleClick ? 0.85 : 1;
  const windowP = easeOutCubic(progress(frame, 38, 20));
  const showWindow = frame >= 38;

  // Resume content transform
  const toolCompleteFrame = 230;
  const transformP = easeOutCubic(progress(frame, toolCompleteFrame, 40));
  const showUpdated = frame >= toolCompleteFrame;

  const beforeText = L(lang, content.ai.beforeText.zh, content.ai.beforeText.en);
  const afterText = L(lang, content.ai.afterText.zh, content.ai.afterText.en);

  // Chat flow timings (offset from scene start)
  const userMsgFrame = 60;
  const thinkingStart = 120;
  const thinkingEnd = 150;
  const aiFirstFrame = 150;
  const toolCallFrame = 190;
  const toolCompFrame = 230;
  const aiConfirmFrame = 240;

  const showThinking = frame >= thinkingStart && frame < thinkingEnd;

  const userMsg = L(lang, content.ai.userMsg.zh, content.ai.userMsg.en);
  const aiFirstText = L(lang, '好的，让我来分析并优化你的工作经历描述...', "Let me analyze and improve your work experience descriptions...");
  const aiConfirmText = L(lang, content.ai.aiResponse.zh, content.ai.aiResponse.en);

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: colors.bg,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeOut,
      }}
    >
      <JadeGlow x="65%" y="55%" size={600} opacity={0.08} pulse color={colors.pink400} />

      {/* Editor – 3-panel layout */}
      <EditorLayout startFrame={0}>
        <EditorSidebar startFrame={10} activeIndex={2} />

        {/* Canvas – resume content updates when tool completes */}
        <div style={{ flex: 4, overflow: 'hidden', backgroundColor: colors.appBg }}>
          <div
            style={{
              maxWidth: 768,
              margin: '0 auto',
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              fontFamily: fontFor(lang),
            }}
          >
            <SectionCard title={L(lang, '个人信息', 'Personal Info')} selected={false}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <Field label={L(lang, '姓名', 'Name')} value={L(lang, content.resume.name.zh, content.resume.name.en)} />
                <Field label={L(lang, '职位', 'Title')} value={L(lang, content.resume.title.zh, content.resume.title.en)} />
              </div>
            </SectionCard>

            <SectionCard
              title={L(lang, '工作经历', 'Work Experience')}
              selected={showUpdated && transformP < 1}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: colors.zinc900, marginBottom: 4 }}>
                {L(lang, '字节跳动', 'ByteDance')} · {L(lang, '高级前端工程师', 'Senior Frontend Engineer')}
              </div>
              {!showUpdated && (
                <div style={{ fontSize: 12, color: colors.zinc600, lineHeight: 1.6, marginTop: 4 }}>
                  {beforeText}
                </div>
              )}
              {showUpdated && (
                <div
                  style={{
                    fontSize: 12,
                    color: colors.pink700,
                    lineHeight: 1.6,
                    marginTop: 4,
                    fontWeight: 500,
                    backgroundColor: colors.pink50,
                    padding: '6px 8px',
                    borderRadius: 6,
                    opacity: transformP,
                    transform: `translateY(${(1 - transformP) * 6}px)`,
                  }}
                >
                  {afterText}
                </div>
              )}
            </SectionCard>

            <SectionCard title={L(lang, '专业技能', 'Skills')} selected={false}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {content.resume.skills.map((s, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: 11,
                      padding: '2px 10px',
                      border: `1px solid ${colors.zinc200}`,
                      backgroundColor: colors.zinc50,
                      color: colors.zinc700,
                      borderRadius: 9999,
                      fontWeight: 500,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>

        {/* Preview Panel */}
        <EditorPreviewPanel startFrame={15} />
      </EditorLayout>

      {/* ─── Floating Chat Bubble ─── */}
      <div
        style={{
          position: 'absolute',
          right: 160,
          bottom: 110,
          opacity: bubbleP,
          transform: `scale(${bubbleP * bubbleScale})`,
          zIndex: 20,
        }}
      >
        {/* Bubble button – h-14 w-14 rounded-full pink gradient */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: `linear-gradient(to bottom right, ${colors.pink500}, #f43f5e)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(236,72,153,0.35)',
            cursor: 'pointer',
          }}
        >
          {/* MessageSquare icon */}
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
      </div>

      {/* ─── Floating Chat Window ─── */}
      {showWindow && (
        <div
          style={{
            position: 'absolute',
            right: 160,
            bottom: 180,
            width: 420,
            height: 580,
            borderRadius: 16,
            border: `1px solid ${colors.zinc200}`,
            backgroundColor: colors.appWhite,
            boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: 'Inter, "Noto Sans SC", sans-serif',
            opacity: windowP,
            transform: `translateY(${(1 - windowP) * 20}px) scale(${0.95 + 0.05 * windowP})`,
            transformOrigin: 'bottom right',
            zIndex: 30,
          }}
        >
          {/* Title bar – pink gradient */}
          <div
            style={{
              background: `linear-gradient(to right, ${colors.pink500}, #f43f5e)`,
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                <path d="M20 3v4" /><path d="M22 5h-4" />
              </svg>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>
                {L(lang, 'AI 助手', 'AI Assistant')}
              </span>
            </div>
            {/* Close button */}
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth={2} strokeLinecap="round">
                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
              </svg>
            </div>
          </div>

          {/* Messages area */}
          <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
            {/* User message */}
            <ChatMessage type="user" text={userMsg} startFrame={userMsgFrame} typing typingSpeed={1} />

            {/* Thinking dots */}
            {showThinking && <ThinkingDots startFrame={thinkingStart} />}

            {/* AI response */}
            {frame >= aiFirstFrame && (
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
                <div style={{ maxWidth: 'calc(100% - 34px)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {/* First text */}
                  <div style={{ padding: '8px 12px', borderRadius: 16, backgroundColor: colors.zinc50, color: colors.zinc700, fontSize: 13, lineHeight: 1.6, whiteSpace: 'pre-wrap', boxShadow: `inset 0 0 0 1px ${colors.zinc200}60` }}>
                    <TypewriterInline text={aiFirstText} startFrame={aiFirstFrame} speed={0.8} />
                  </div>
                  {/* Tool call */}
                  {frame >= toolCallFrame && (
                    <ToolCallCard toolName="updateSection" args='{"sectionId":"work_exp_1","field":"description"}' startFrame={toolCallFrame} completeFrame={toolCompFrame} />
                  )}
                  {/* Confirmation text */}
                  {frame >= aiConfirmFrame && (
                    <div style={{ padding: '8px 12px', borderRadius: 16, backgroundColor: colors.zinc50, color: colors.zinc700, fontSize: 13, lineHeight: 1.6, whiteSpace: 'pre-wrap', boxShadow: `inset 0 0 0 1px ${colors.zinc200}60` }}>
                      <TypewriterInline text={aiConfirmText} startFrame={aiConfirmFrame} speed={0.6} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div style={{ padding: 12, flexShrink: 0 }}>
            <div style={{ borderRadius: 16, border: `1px solid ${colors.zinc200}`, backgroundColor: `${colors.zinc50}80`, overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px 8px', fontSize: 14, color: colors.zinc400, minHeight: 40 }}>
                {L(lang, '输入消息...', 'Type a message...')}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px 10px' }}>
                <div style={{ height: 28, borderRadius: 9999, border: `1px solid ${colors.zinc200}`, backgroundColor: colors.appWhite, padding: '0 10px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 500, color: colors.zinc600 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: colors.emerald400 }} />
                  GPT-4o
                </div>
                <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: colors.zinc200, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.4 }}>
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.zinc500} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18.168-8.215a.5.5 0 0 0 0-.904z" />
                    <path d="M6 12h16" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sparkle when content transforms */}
      {frame >= toolCompleteFrame && frame < toolCompleteFrame + 60 && (
        <SparkleEffect count={16} x={580} y={480} spread={100} startFrame={toolCompleteFrame} seed="ai-tool" />
      )}
    </div>
  );
};

// ── Helper components ──

const SectionCard: React.FC<{
  title: string;
  selected: boolean;
  children: React.ReactNode;
}> = ({ title, selected, children }) => (
  <div
    style={{
      backgroundColor: colors.appWhite,
      borderRadius: 12,
      border: `1px solid ${colors.appBorder}`,
      boxShadow: selected ? '0 4px 6px -1px rgba(0,0,0,0.1)' : '0 1px 2px rgba(0,0,0,0.03)',
      outline: selected ? `2px solid ${colors.pink300}` : 'none',
      fontFamily: 'Inter, "Noto Sans SC", sans-serif',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px 8px' }}>
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.zinc300} strokeWidth={2} strokeLinecap="round">
        <circle cx="9" cy="5" r="1" /><circle cx="15" cy="5" r="1" />
        <circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" />
        <circle cx="9" cy="19" r="1" /><circle cx="15" cy="19" r="1" />
      </svg>
      <span style={{ fontSize: 14, fontWeight: 600, color: colors.zinc700 }}>{title}</span>
    </div>
    <div style={{ padding: '0 16px 16px' }}>{children}</div>
  </div>
);

const Field: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <label style={{ fontSize: 12, fontWeight: 500, color: colors.zinc500 }}>{label}</label>
    <div
      style={{
        height: 32,
        fontSize: 14,
        padding: '0 12px',
        border: `1px solid ${colors.appBorder}`,
        borderRadius: 6,
        backgroundColor: colors.appWhite,
        color: colors.zinc900,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {value}
    </div>
  </div>
);

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
