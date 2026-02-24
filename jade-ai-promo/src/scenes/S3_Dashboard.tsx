import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors } from '../config/colors';
import { content, L } from '../config/content';
import { useLanguage } from '../contexts/LanguageContext';
import { ResumeCard } from '../components/ui/ResumeCard';
import { GridPattern } from '../components/effects/GridPattern';
import { easeOutCubic, progress } from '../utils/easing';
import { fontFor } from '../config/typography';

/**
 * S3 Dashboard – 1:1 match of real JadeAI dashboard:
 *  Header: logo + nav + GitHub badge + avatar
 *  Title row: "My Resumes" + count | AI Generate (outline) + Create Resume (pink)
 *  Toolbar: search input | sort dropdown | grid/list toggle
 *  3-col grid of ResumeCards (with thumbnail previews)
 *  Create dialog overlay
 */
export const S3_Dashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const lang = useLanguage();

  const fadeOut = 1 - progress(frame, 270, 30);
  const dialogP = easeOutCubic(progress(frame, 160, 30));
  const variants: ('modern' | 'classic' | 'minimal')[] = ['modern', 'classic', 'minimal'];

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: colors.bg,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: fadeOut,
      }}
    >
      <GridPattern opacity={0.05} />

      {/* Dashboard mockup */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 1400,
          opacity: easeOutCubic(progress(frame, 0, 20)),
        }}
      >
        {/* Header bar – h-16 bg-white/80 border-b */}
        <div
          style={{
            height: 64,
            backgroundColor: `${colors.appWhite}cc`,
            borderBottom: `1px solid ${colors.appBorder}`,
            borderRadius: '12px 12px 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <JadeAILogo />
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: colors.zinc600 }}>
              {L(lang, '功能', 'Features')}
            </span>
            <span style={{ fontSize: 14, fontWeight: 500, color: colors.zinc600 }}>
              {L(lang, '模板', 'Templates')}
            </span>
            {/* GitHub star badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 10px',
                borderRadius: 9999,
                backgroundColor: colors.pink50,
                fontSize: 13,
                fontWeight: 500,
                color: colors.zinc700,
              }}
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={colors.zinc600} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" strokeWidth={1}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span style={{ fontSize: 12, color: colors.zinc500 }}>128</span>
            </div>
            <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: colors.zinc200 }} />
          </div>
        </div>

        {/* Dashboard content – bg-zinc-50 */}
        <div
          style={{
            backgroundColor: colors.appBg,
            padding: '32px 40px',
            borderRadius: '0 0 12px 12px',
            minHeight: 520,
          }}
        >
          {/* Title row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 24,
            }}
          >
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: colors.zinc900, fontFamily: fontFor(lang) }}>
                {L(lang, content.dashboard.title.zh, content.dashboard.title.en)}
              </div>
              <div style={{ fontSize: 14, color: colors.zinc500, marginTop: 4, fontFamily: fontFor(lang) }}>
                {L(lang, '3 份简历', '3 resumes')}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, opacity: easeOutCubic(progress(frame, 20, 20)) }}>
              {/* AI Generate – outline */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 14px',
                  borderRadius: 10,
                  border: `1px solid ${colors.appBorder}`,
                  backgroundColor: colors.appWhite,
                  fontSize: 14,
                  fontWeight: 500,
                  color: colors.zinc700,
                  fontFamily: fontFor(lang),
                }}
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.zinc600} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                  <path d="M20 3v4" /><path d="M22 5h-4" />
                </svg>
                {L(lang, 'AI 生成', 'AI Generate')}
              </div>
              {/* Create Resume – pink */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 16px',
                  borderRadius: 10,
                  backgroundColor: colors.pink500,
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily: fontFor(lang),
                }}
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round">
                  <path d="M5 12h14" /><path d="M12 5v14" />
                </svg>
                {L(lang, '新建简历', 'Create Resume')}
              </div>
            </div>
          </div>

          {/* Toolbar row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
              opacity: easeOutCubic(progress(frame, 25, 20)),
              fontFamily: fontFor(lang),
            }}
          >
            {/* Search */}
            <div style={{ position: 'relative', width: 260 }}>
              <svg
                width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.zinc400} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}
              >
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
              <div
                style={{
                  height: 36,
                  paddingLeft: 36,
                  border: `1px solid ${colors.appBorder}`,
                  borderRadius: 8,
                  backgroundColor: colors.appWhite,
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 14,
                  color: colors.zinc400,
                }}
              >
                {L(lang, '搜索简历...', 'Search resumes...')}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* Sort */}
              <div
                style={{
                  height: 36,
                  padding: '0 12px',
                  border: `1px solid ${colors.appBorder}`,
                  borderRadius: 8,
                  backgroundColor: colors.appWhite,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  color: colors.zinc600,
                }}
              >
                {L(lang, '最近编辑', 'Last Edited')}
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={colors.zinc400} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>

              {/* Grid / List toggle */}
              <div style={{ display: 'flex', border: `1px solid ${colors.zinc200}`, borderRadius: 6, overflow: 'hidden' }}>
                <div
                  style={{
                    width: 32, height: 32,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: colors.pink500,
                    borderRadius: '5px 0 0 5px',
                  }}
                >
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                  </svg>
                </div>
                <div
                  style={{
                    width: 32, height: 32,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: colors.appWhite,
                    borderRadius: '0 5px 5px 0',
                  }}
                >
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.zinc400} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 6h13" /><path d="M8 12h13" /><path d="M8 18h13" />
                    <path d="M3 6h.01" /><path d="M3 12h.01" /><path d="M3 18h.01" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Resume cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {content.dashboard.cards.map((card, i) => (
              <ResumeCard
                key={i}
                title={card.title}
                template={card.template}
                date={card.date}
                startFrame={30}
                index={i}
                variant={variants[i]}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Create dialog overlay */}
      {frame > 155 && (
        <>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: `rgba(0,0,0,${0.5 * dialogP})` }} />
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate(-50%, ${-50 + (1 - dialogP) * 20}%)`,
              width: 448,
              backgroundColor: colors.appWhite,
              borderRadius: 12,
              padding: 24,
              opacity: dialogP,
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              fontFamily: fontFor(lang),
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 600, color: colors.zinc900, marginBottom: 4 }}>
              {L(lang, '新建简历', 'Create Resume')}
            </div>
            <div style={{ fontSize: 14, color: colors.zinc500, marginBottom: 20 }}>
              {L(lang, '选择一个模板开始创建', 'Choose a template to get started')}
            </div>
            <div style={{ display: 'flex', gap: 4, borderRadius: 8, backgroundColor: colors.zinc100, padding: 4, marginBottom: 16 }}>
              <div style={{ flex: 1, padding: '6px 12px', borderRadius: 6, backgroundColor: colors.appWhite, textAlign: 'center', fontSize: 14, fontWeight: 500, color: colors.zinc900, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                {L(lang, '选择模板', 'Template')}
              </div>
              <div style={{ flex: 1, padding: '6px 12px', borderRadius: 6, textAlign: 'center', fontSize: 14, fontWeight: 500, color: colors.zinc500 }}>
                {L(lang, '上传简历', 'Upload')}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 20 }}>
              {['Classic', 'Modern', 'Minimal'].map((_, i) => {
                const sel = i === 1;
                return (
                  <div key={i} style={{ padding: 12, borderRadius: 8, border: sel ? `2px solid ${colors.pink500}` : `2px solid ${colors.zinc200}`, backgroundColor: sel ? colors.pink50 : colors.appWhite, textAlign: 'center' }}>
                    <div style={{ height: 60, backgroundColor: colors.zinc100, borderRadius: 4, marginBottom: 8, display: 'flex', flexDirection: 'column', padding: 6, gap: 2 }}>
                      {i === 1 ? (
                        <>
                          <div style={{ height: 10, background: 'linear-gradient(135deg, #1a1a2e, #0f3460)', borderRadius: 2 }} />
                          <div style={{ height: 2, width: '60%', backgroundColor: colors.zinc200, borderRadius: 1 }} />
                          <div style={{ height: 2, width: '80%', backgroundColor: colors.zinc200, borderRadius: 1 }} />
                        </>
                      ) : (
                        <>
                          <div style={{ height: 2, width: '50%', backgroundColor: colors.zinc300, borderRadius: 1 }} />
                          <div style={{ height: 2, width: '70%', backgroundColor: colors.zinc200, borderRadius: 1 }} />
                          <div style={{ height: 2, width: '60%', backgroundColor: colors.zinc200, borderRadius: 1 }} />
                        </>
                      )}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: sel ? colors.pink700 : colors.zinc700 }}>
                      {L(lang, content.templates.names.zh[i], content.templates.names.en[i])}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <div style={{ padding: '8px 16px', borderRadius: 10, border: `1px solid ${colors.appBorder}`, fontSize: 14, color: colors.zinc700, fontWeight: 500 }}>
                {L(lang, '取消', 'Cancel')}
              </div>
              <div style={{ padding: '8px 16px', borderRadius: 10, backgroundColor: colors.pink500, color: 'white', fontSize: 14, fontWeight: 500 }}>
                {L(lang, '创建', 'Create')}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const JadeAILogo: React.FC = () => (
  <svg width={120} height={36} viewBox="0 0 180 48" fill="none">
    <defs>
      <linearGradient id="dash-jade" x1="2" y1="2" x2="46" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="44" height="44" rx="11" fill="url(#dash-jade)" />
    <g stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M11 12H24" /><path d="M22 12V32" />
      <path d="M22 32C22 35.5 20 38 16.5 38C14.5 38 13 37 13 36" />
      <path d="M22 12H30C34.5 12 37 15 37 19C37 23 34.5 26 30 26H22" />
      <path d="M29 26L39 38" />
    </g>
    <circle cx="41" cy="9" r="6" fill="#FCD34D" opacity={0.12} />
    <path d="M41 3.5L42.4 8L47 9.5L42.4 11L41 15.5L39.6 11L35 9.5L39.6 8Z" fill="#FCD34D" />
    <text x="54" y="33" fontFamily="system-ui, sans-serif" fontSize="26" fontWeight="700" fill="#064E3B" letterSpacing="-0.5">
      Jade<tspan fill="#10B981">AI</tspan>
    </text>
  </svg>
);
