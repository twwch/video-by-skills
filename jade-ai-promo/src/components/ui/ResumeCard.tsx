import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors } from '../../config/colors';
import { easeOutBack, progress } from '../../utils/easing';
import { useLanguage } from '../../contexts/LanguageContext';
import { L } from '../../config/content';

interface ResumeCardProps {
  title: { zh: string; en: string };
  template: { zh: string; en: string };
  date: string;
  startFrame: number;
  index: number;
  selected?: boolean;
  /** Which template style to show: 'classic' | 'modern' | 'minimal' */
  variant?: 'classic' | 'modern' | 'minimal';
}

/**
 * Resume card matching real JadeAI dashboard:
 *  - Thumbnail section (border-b, bg-zinc-50, p-2.5) with A4-ratio preview
 *  - Info section (p-2.5): title, metadata row (badge + date), dropdown
 */
export const ResumeCard: React.FC<ResumeCardProps> = ({
  title,
  template,
  date,
  startFrame,
  index,
  selected = false,
  variant = 'classic',
}) => {
  const frame = useCurrentFrame();
  const lang = useLanguage();
  const delay = index * 8;
  const p = easeOutBack(progress(frame, startFrame + delay, 25));
  const opacity = Math.min(1, progress(frame, startFrame + delay, 15));

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: colors.appWhite,
        borderRadius: 12,
        opacity,
        transform: `translateY(${(1 - p) * 40}px) scale(${0.9 + 0.1 * p})`,
        boxShadow: selected
          ? '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)'
          : '0 1px 3px rgba(0,0,0,0.06)',
        border: `1px solid ${colors.appBorder}`,
        outline: selected ? `2px solid ${colors.pink300}` : 'none',
        outlineOffset: -1,
        fontFamily: 'Inter, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Thumbnail section – matches real app: border-b bg-zinc-50 p-2.5 */}
      <div
        style={{
          position: 'relative',
          borderBottom: `1px solid ${colors.zinc100}`,
          backgroundColor: colors.zinc50,
          padding: 10,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {/* A4 ratio thumbnail – h-[100px] w-[71px] */}
        <div
          style={{
            width: 71,
            height: 100,
            backgroundColor: colors.appWhite,
            borderRadius: 2,
            boxShadow: `0 1px 2px rgba(0,0,0,0.06), 0 0 0 1px ${colors.zinc200}99`,
            overflow: 'hidden',
          }}
        >
          <MiniResume variant={variant} />
        </div>
      </div>

      {/* Info section – p-2.5 */}
      <div style={{ padding: 10 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 8,
          }}
        >
          <div style={{ minWidth: 0, flex: 1 }}>
            {/* Title */}
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: colors.zinc900,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {L(lang, title.zh, title.en)}
            </div>
            {/* Metadata: badge + date */}
            <div
              style={{
                display: 'flex',
                gap: 6,
                alignItems: 'center',
                marginTop: 6,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: colors.zinc900,
                  backgroundColor: colors.zinc100,
                  padding: '1px 8px',
                  borderRadius: 9999,
                }}
              >
                {L(lang, template.zh, template.en)}
              </span>
              <span style={{ fontSize: 11, color: colors.zinc400 }}>{date}</span>
            </div>
          </div>

          {/* 3-dot menu – opacity-0 group-hover:opacity-100 */}
          <div
            style={{
              padding: 4,
              borderRadius: 6,
              opacity: 0.4,
              flexShrink: 0,
            }}
          >
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.zinc500}
              strokeWidth={2}
              strokeLinecap="round"
            >
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Tiny resume preview inside the thumbnail */
const MiniResume: React.FC<{ variant: 'classic' | 'modern' | 'minimal' }> = ({ variant }) => {
  if (variant === 'modern') {
    return (
      <div style={{ fontSize: 4, fontFamily: 'Inter, sans-serif' }}>
        <div
          style={{
            height: 22,
            background: 'linear-gradient(135deg, #1a1a2e, #0f3460)',
            padding: '4px 6px',
          }}
        >
          <div style={{ height: 3, width: 20, backgroundColor: 'white', borderRadius: 1 }} />
          <div style={{ height: 2, width: 14, backgroundColor: '#e94560', borderRadius: 1, marginTop: 2 }} />
        </div>
        <div style={{ padding: '4px 6px' }}>
          <div style={{ height: 2, width: 16, backgroundColor: '#e94560', borderRadius: 1, marginBottom: 3 }} />
          {[24, 20, 22].map((w, i) => (
            <div key={i} style={{ height: 1.5, width: w, backgroundColor: colors.zinc200, borderRadius: 1, marginBottom: 2 }} />
          ))}
        </div>
      </div>
    );
  }
  if (variant === 'minimal') {
    return (
      <div style={{ padding: '6px', fontSize: 4, fontFamily: 'Inter, sans-serif' }}>
        <div style={{ height: 3, width: 18, backgroundColor: colors.zinc800, borderRadius: 1, marginBottom: 4 }} />
        <div style={{ height: 1.5, width: 24, backgroundColor: colors.zinc200, borderRadius: 1, marginBottom: 2 }} />
        <div style={{ height: 1.5, width: 28, backgroundColor: colors.zinc200, borderRadius: 1, marginBottom: 4 }} />
        <div style={{ height: 1.5, width: 12, backgroundColor: colors.zinc400, borderRadius: 1, marginBottom: 3 }} />
        {[22, 20, 24].map((w, i) => (
          <div key={i} style={{ height: 1.5, width: w, backgroundColor: colors.zinc200, borderRadius: 1, marginBottom: 2 }} />
        ))}
      </div>
    );
  }
  // classic
  return (
    <div style={{ padding: '6px', fontSize: 4, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: 3 }}>
        <div style={{ height: 3, width: 20, backgroundColor: colors.zinc800, borderRadius: 1, margin: '0 auto' }} />
        <div style={{ height: 1.5, width: 14, backgroundColor: colors.zinc400, borderRadius: 1, margin: '2px auto 0' }} />
      </div>
      <div style={{ height: 1, backgroundColor: colors.zinc300, marginBottom: 3 }} />
      <div style={{ height: 1.5, width: 12, backgroundColor: colors.zinc700, borderRadius: 1, marginBottom: 2 }} />
      {[28, 24, 26].map((w, i) => (
        <div key={i} style={{ height: 1.5, width: w, backgroundColor: colors.zinc200, borderRadius: 1, marginBottom: 2 }} />
      ))}
    </div>
  );
};
