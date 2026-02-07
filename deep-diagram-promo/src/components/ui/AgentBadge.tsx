import React from 'react';
import { useCurrentFrame } from 'remotion';
import { fonts } from '../../config/typography';
import { easeOutCubic, progress } from '../../utils/easing';
import { SCENE_TIMELINE } from '../../config/constants';

interface AgentBadgeProps {
  name: string;
  icon: string;
  color: string;
}

export const AgentBadge: React.FC<AgentBadgeProps> = ({ name, icon, color }) => {
  const frame = useCurrentFrame();
  const { start, end } = SCENE_TIMELINE.fadeIn;
  const p = easeOutCubic(progress(frame, start, end));

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 20px',
        borderRadius: 30,
        background: `${color}18`,
        border: `1px solid ${color}40`,
        opacity: p,
        transform: `translateY(${(1 - p) * 10}px)`,
      }}
    >
      <span style={{ fontSize: 22 }}>{icon}</span>
      <span
        style={{
          fontFamily: fonts.heading,
          fontWeight: 600,
          fontSize: 18,
          color,
          letterSpacing: '0.02em',
        }}
      >
        {name}
      </span>
    </div>
  );
};
