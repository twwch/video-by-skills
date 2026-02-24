import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors } from '../../config/colors';
import { content, L } from '../../config/content';
import { useLanguage } from '../../contexts/LanguageContext';
import { easeOutCubic, progress } from '../../utils/easing';

interface EditorPreviewPanelProps {
  startFrame: number;
}

/**
 * Editor Preview Panel – matches real app:
 *  flex-[6], border-l, bg-zinc-50
 *  Header: "Preview" label + zoom controls
 *  Body: centered A4 resume with "Modern" template
 */
export const EditorPreviewPanel: React.FC<EditorPreviewPanelProps> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const lang = useLanguage();
  const p = easeOutCubic(progress(frame, startFrame, 25));
  const resume = content.resume;

  return (
    <div
      style={{
        flex: 6,
        display: 'flex',
        flexDirection: 'column',
        borderLeft: `1px solid ${colors.appBorder}`,
        backgroundColor: colors.zinc50,
        overflow: 'hidden',
        opacity: p,
        transform: `translateX(${(1 - p) * 30}px)`,
      }}
    >
      {/* Header – border-b bg-white px-4 py-2 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${colors.appBorder}`,
          backgroundColor: colors.appWhite,
          padding: '8px 16px',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 500, color: colors.zinc500, fontFamily: 'Inter, sans-serif' }}>
          {L(lang, '预览', 'Preview')}
        </span>
        {/* Zoom controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <ZoomButton icon="minus" />
          <span
            style={{
              width: 40,
              textAlign: 'center',
              fontSize: 12,
              color: colors.zinc500,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            80%
          </span>
          <ZoomButton icon="plus" />
        </div>
      </div>

      {/* Body – centered A4 paper */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          padding: 16,
          overflow: 'hidden',
        }}
      >
        {/* A4 paper – Modern template, scaled down */}
        <div
          style={{
            width: 380,
            backgroundColor: 'white',
            borderRadius: 4,
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            fontFamily: 'Inter, "Noto Sans SC", sans-serif',
            fontSize: 8,
          }}
        >
          {/* Modern template gradient header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
              padding: '18px 20px 16px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                right: -15,
                top: -15,
                width: 50,
                height: 50,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #e94560 0%, transparent 70%)',
                opacity: 0.12,
              }}
            />
            <div style={{ fontSize: 16, fontWeight: 700, color: 'white', letterSpacing: '-0.025em' }}>
              {L(lang, resume.name.zh, resume.name.en)}
            </div>
            <div style={{ fontSize: 10, fontWeight: 300, letterSpacing: '0.05em', color: '#e94560', marginTop: 3 }}>
              {L(lang, resume.title.zh, resume.title.en)}
            </div>
            <div style={{ fontSize: 8, color: '#d1d5db', marginTop: 6, display: 'flex', gap: 8 }}>
              <span>{resume.email}</span>
              <span style={{ color: colors.zinc500 }}>|</span>
              <span>{resume.phone}</span>
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 2,
                background: 'linear-gradient(90deg, #e94560 0%, #0f3460 60%, transparent 100%)',
              }}
            />
          </div>

          {/* Body */}
          <div style={{ padding: '12px 20px' }}>
            {/* Summary */}
            <SectionTitle label={L(lang, '个人总结', 'SUMMARY')} />
            <div style={{ color: colors.zinc600, lineHeight: 1.6, marginBottom: 10 }}>
              {L(lang, resume.summary.zh, resume.summary.en)}
            </div>

            {/* Experience */}
            <SectionTitle label={L(lang, '工作经历', 'EXPERIENCE')} />
            {resume.experience.slice(0, 2).map((exp, i) => (
              <div key={i} style={{ marginBottom: 8, borderLeft: '2px solid #e94560', paddingLeft: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, color: colors.zinc800 }}>
                    {L(lang, exp.role.zh, exp.role.en)}
                  </span>
                  <span
                    style={{
                      fontSize: 7,
                      padding: '1px 6px',
                      backgroundColor: colors.zinc100,
                      borderRadius: 9999,
                      color: colors.zinc500,
                    }}
                  >
                    {exp.period}
                  </span>
                </div>
                <div style={{ color: '#e94560', fontSize: 8 }}>
                  {L(lang, exp.company.zh, exp.company.en)}
                </div>
              </div>
            ))}

            {/* Education */}
            <SectionTitle label={L(lang, '教育背景', 'EDUCATION')} />
            <div style={{ borderLeft: '2px solid #e94560', paddingLeft: 10, marginBottom: 10 }}>
              <div style={{ fontWeight: 600, color: colors.zinc800 }}>
                {L(lang, resume.education.school.zh, resume.education.school.en)}
              </div>
              <div style={{ color: colors.zinc600 }}>
                {L(lang, resume.education.degree.zh, resume.education.degree.en)}
              </div>
            </div>

            {/* Skills */}
            <SectionTitle label={L(lang, '专业技能', 'SKILLS')} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {resume.skills.map((s, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 7,
                    padding: '2px 8px',
                    border: `1px solid ${colors.zinc200}`,
                    backgroundColor: colors.zinc50,
                    borderRadius: 9999,
                    color: colors.zinc700,
                    fontWeight: 500,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionTitle: React.FC<{ label: string }> = ({ label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
    <div style={{ height: 2, width: 20, borderRadius: 1, background: 'linear-gradient(90deg, #e94560, #0f3460)' }} />
    <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#e94560' }}>
      {label}
    </span>
  </div>
);

const ZoomButton: React.FC<{ icon: 'plus' | 'minus' }> = ({ icon }) => (
  <div
    style={{
      width: 28,
      height: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
    }}
  >
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={colors.zinc500} strokeWidth={2} strokeLinecap="round">
      {icon === 'plus' ? (
        <>
          <path d="M5 12h14" /><path d="M12 5v14" />
        </>
      ) : (
        <path d="M5 12h14" />
      )}
    </svg>
  </div>
);
