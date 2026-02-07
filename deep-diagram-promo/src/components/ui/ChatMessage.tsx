import React from 'react';
import { fonts } from '../../config/typography';
import { theme } from '../../config/colors';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  text: string;
  agentColor?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  role,
  text,
  agentColor,
}) => {
  const isUser = role === 'user';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
        marginBottom: 16,
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontFamily: fonts.body,
          fontWeight: 500,
          color: theme.textMuted,
          marginBottom: 6,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        {isUser ? 'You' : 'Assistant'}
      </div>
      <div
        style={{
          maxWidth: '92%',
          padding: '14px 18px',
          borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
          background: isUser ? theme.userBubble : theme.assistantBubble,
          border: isUser ? 'none' : `1px solid ${agentColor || theme.border}40`,
          fontFamily: fonts.body,
          fontSize: 15,
          lineHeight: 1.6,
          color: theme.text,
        }}
      >
        {text}
        {text.length > 0 && (
          <span
            style={{
              display: 'inline-block',
              width: 2,
              height: 16,
              backgroundColor: isUser ? '#ffffff80' : (agentColor || theme.accentBlue),
              marginLeft: 2,
              verticalAlign: 'text-bottom',
              opacity: 0.8,
            }}
          />
        )}
      </div>
    </div>
  );
};
