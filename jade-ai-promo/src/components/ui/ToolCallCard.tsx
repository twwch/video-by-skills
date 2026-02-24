import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors } from '../../config/colors';
import { easeOutCubic, progress } from '../../utils/easing';

interface ToolCallCardProps {
  toolName: string;
  args: string;
  result?: string;
  startFrame: number;
  completeFrame: number; // when tool finishes executing
}

// Lucide Terminal icon
const TerminalIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

// Lucide CheckCircle2 icon
const CheckCircleIcon: React.FC = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={colors.green500} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

// Spinner (animated border circle)
const Spinner: React.FC = () => {
  const frame = useCurrentFrame();
  const rotation = (frame * 8) % 360;
  return (
    <div
      style={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        border: `2px solid ${colors.zinc200}`,
        borderTopColor: colors.zinc500,
        transform: `rotate(${rotation}deg)`,
      }}
    />
  );
};

// ChevronRight icon
const ChevronRight: React.FC = () => (
  <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke={colors.zinc400} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

// Play icon for result
const PlayIcon: React.FC = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={colors.zinc500} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);

export const ToolCallCard: React.FC<ToolCallCardProps> = ({
  toolName,
  args,
  result,
  startFrame,
  completeFrame,
}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;
  if (elapsed < 0) return null;

  const fadeP = easeOutCubic(progress(frame, startFrame, 12));
  const isRunning = frame < completeFrame;
  const isComplete = frame >= completeFrame;
  const resultFadeP = isComplete ? easeOutCubic(progress(frame, completeFrame, 12)) : 0;

  return (
    <div
      style={{
        opacity: fadeP,
        transform: `translateY(${(1 - fadeP) * 8}px)`,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        fontSize: 12,
      }}
    >
      {/* Calling block */}
      <div
        style={{
          borderRadius: 6,
          border: `1px solid ${colors.zinc200}`,
          backgroundColor: colors.zinc50,
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 10px',
            fontSize: 11,
            fontWeight: 500,
            color: colors.zinc500,
          }}
        >
          <ChevronRight />
          {isRunning ? <Spinner /> : <TerminalIcon color={colors.zinc500} />}
          <span>Calling {toolName}</span>
        </div>
      </div>

      {/* Result block - shown after completion */}
      {isComplete && (
        <div
          style={{
            borderRadius: 6,
            border: `1px solid ${colors.zinc200}`,
            backgroundColor: colors.zinc50,
            overflow: 'hidden',
            opacity: resultFadeP,
            transform: `translateY(${(1 - resultFadeP) * 4}px)`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 10px',
              fontSize: 11,
              fontWeight: 500,
              color: colors.zinc500,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <ChevronRight />
              <PlayIcon />
              <span>Result</span>
            </div>
            <CheckCircleIcon />
          </div>
        </div>
      )}
    </div>
  );
};

// Thinking dots - 3 pink bouncing dots
export const ThinkingDots: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;
  if (elapsed < 0) return null;

  const fadeP = easeOutCubic(progress(frame, startFrame, 10));

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 12,
        color: colors.zinc400,
        opacity: fadeP,
        fontFamily: 'Inter, "Noto Sans SC", sans-serif',
      }}
    >
      <span style={{ display: 'flex', gap: 3 }}>
        {[0, 1, 2].map((i) => {
          // Simulate bounce animation with sine wave
          const bounceOffset = Math.sin((elapsed - i * 4) * 0.25) * 3;
          const opacity = 0.4 + 0.6 * Math.max(0, Math.sin((elapsed - i * 4) * 0.25));
          return (
            <span
              key={i}
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: colors.pink400,
                display: 'inline-block',
                transform: `translateY(${Math.min(0, bounceOffset)}px)`,
                opacity,
              }}
            />
          );
        })}
      </span>
    </div>
  );
};
