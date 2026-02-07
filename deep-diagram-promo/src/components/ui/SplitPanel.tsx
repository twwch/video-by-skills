import React from 'react';
import { theme } from '../../config/colors';

interface SplitPanelProps {
  canvas: React.ReactNode;
  chat: React.ReactNode;
  agentColor: string;
}

export const SplitPanel: React.FC<SplitPanelProps> = ({
  canvas,
  chat,
  agentColor,
}) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: theme.bg,
      }}
    >
      {/* Canvas - 65% */}
      <div
        style={{
          width: '65%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {canvas}
      </div>

      {/* Divider */}
      <div
        style={{
          width: 1,
          height: '100%',
          background: `linear-gradient(180deg, transparent 0%, ${agentColor}40 30%, ${agentColor}40 70%, transparent 100%)`,
        }}
      />

      {/* Chat - 35% */}
      <div
        style={{
          width: '35%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: theme.surface,
          padding: '30px 24px',
          overflow: 'hidden',
        }}
      >
        {chat}
      </div>
    </div>
  );
};
