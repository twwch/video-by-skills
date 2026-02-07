import React from 'react';
import { useCurrentFrame } from 'remotion';
import { fonts } from '../../config/typography';
import { easeOutCubic, progress } from '../../utils/easing';

interface TraceCard {
  label: string;
  value: string;
  color: string;
  bgColor: string;
}

interface ExecutionTraceProps {
  designConcept: string;
  agentName: string;
  agentColor: string;
  startFrame: number;
}

export const ExecutionTrace: React.FC<ExecutionTraceProps> = ({
  designConcept,
  agentName,
  agentColor,
  startFrame,
}) => {
  const frame = useCurrentFrame();

  const cards: TraceCard[] = [
    {
      label: 'Design Concept',
      value: designConcept,
      color: '#EAB308',
      bgColor: 'rgba(234, 179, 8, 0.08)',
    },
    {
      label: 'Agent Selection',
      value: agentName,
      color: agentColor,
      bgColor: `${agentColor}14`,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
      {cards.map((card, i) => {
        const cardStart = startFrame + i * 12;
        const p = easeOutCubic(progress(frame, cardStart, cardStart + 20));
        return (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              borderRadius: 10,
              background: card.bgColor,
              border: `1px solid ${card.color}30`,
              opacity: p,
              transform: `translateX(${(1 - p) * 15}px)`,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: card.color,
                flexShrink: 0,
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 11,
                  fontWeight: 600,
                  color: card.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: 2,
                }}
              >
                {card.label}
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 13,
                  color: '#9CA3AF',
                }}
              >
                {card.value}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
