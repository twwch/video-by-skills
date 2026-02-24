import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors } from '../../config/colors';
import { easeOutCubic, progress } from '../../utils/easing';

interface ChatMessageProps {
  type: 'user' | 'ai';
  text: string;
  startFrame: number;
  typing?: boolean;
  typingSpeed?: number;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  type,
  text,
  startFrame,
  typing = false,
  typingSpeed = 1,
}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;
  if (elapsed < 0) return null;

  const fadeP = easeOutCubic(progress(frame, startFrame, 15));
  const displayText = typing
    ? text.slice(0, Math.floor(Math.max(0, elapsed) * typingSpeed))
    : text;
  const showCursor = typing && displayText.length < text.length;

  const isUser = type === 'user';

  return (
    <div
      style={{
        display: 'flex',
        gap: 10, // gap-2.5
        flexDirection: isUser ? 'row-reverse' : 'row',
        opacity: fadeP,
        transform: `translateY(${(1 - fadeP) * 10}px)`,
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 24, // h-6 w-6
          height: 24,
          borderRadius: '50%',
          background: isUser
            ? colors.zinc700
            : `linear-gradient(to bottom right, ${colors.pink400}, ${colors.pink500})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {isUser ? (
          // User icon
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        ) : (
          // Bot icon
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" /><path d="M20 14h2" />
            <path d="M15 13v2" /><path d="M9 13v2" />
          </svg>
        )}
      </div>

      {/* Bubble */}
      <div
        style={{
          maxWidth: 'calc(100% - 34px)',
          padding: '8px 12px', // px-3 py-2
          borderRadius: 16, // rounded-2xl
          backgroundColor: isUser ? colors.zinc800 : colors.zinc50,
          color: isUser ? 'white' : colors.zinc700,
          fontSize: 13, // text-[13px]
          lineHeight: 1.6, // leading-relaxed
          whiteSpace: 'pre-wrap',
          fontFamily: 'Inter, "Noto Sans SC", sans-serif',
          boxShadow: isUser ? 'none' : `inset 0 0 0 1px ${colors.zinc200}60`,
        }}
      >
        {displayText}
        {showCursor && (
          <span
            style={{
              display: 'inline-block',
              width: 2,
              height: 13,
              backgroundColor: isUser ? 'white' : colors.pink500,
              marginLeft: 2,
              opacity: Math.sin(frame * 0.2) > 0 ? 1 : 0,
              verticalAlign: 'text-bottom',
            }}
          />
        )}
      </div>
    </div>
  );
};
