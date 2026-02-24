import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors } from '../../config/colors';
import { content, L } from '../../config/content';
import { useLanguage } from '../../contexts/LanguageContext';
import { easeOutCubic, progress } from '../../utils/easing';

interface ResumeTemplateProps {
  variant: 'classic' | 'modern' | 'minimal';
  startFrame: number;
  active?: boolean;
}

export const ResumeTemplate: React.FC<ResumeTemplateProps> = ({
  variant,
  startFrame,
  active = false,
}) => {
  const frame = useCurrentFrame();
  const lang = useLanguage();
  const p = easeOutCubic(progress(frame, startFrame, 25));
  const resume = content.resume;

  return (
    <div
      style={{
        width: 320,
        opacity: p,
        transform: `translateY(${(1 - p) * 30}px)`,
      }}
    >
      {/* Paper */}
      <div
        style={{
          width: 320,
          height: 440,
          backgroundColor: 'white',
          borderRadius: 8,
          overflow: 'hidden',
          boxShadow: active
            ? `0 8px 40px rgba(236, 72, 153, 0.2), 0 0 0 2px ${colors.pink500}`
            : '0 4px 20px rgba(0,0,0,0.08)',
          transformOrigin: 'top center',
        }}
      >
        {variant === 'classic' && <ClassicTemplate lang={lang} resume={resume} />}
        {variant === 'modern' && <ModernTemplate lang={lang} resume={resume} />}
        {variant === 'minimal' && <MinimalTemplate lang={lang} resume={resume} />}
      </div>

      {/* Template label */}
      <div
        style={{
          textAlign: 'center',
          marginTop: 16,
          fontSize: 14,
          fontWeight: active ? 600 : 400,
          color: active ? colors.pink700 : colors.zinc500,
          fontFamily: 'Inter, "Noto Sans SC", sans-serif',
        }}
      >
        {variant === 'classic' && L(lang, '经典', 'Classic')}
        {variant === 'modern' && L(lang, '现代', 'Modern')}
        {variant === 'minimal' && L(lang, '简约', 'Minimal')}
      </div>
    </div>
  );
};

// Classic template - serif, formal, centered header, border-b-2 border-zinc-800
const ClassicTemplate: React.FC<{ lang: 'zh' | 'en'; resume: typeof content.resume }> = ({ lang, resume }) => (
  <div style={{ fontFamily: 'Inter, "Noto Sans SC", sans-serif', padding: 24, fontSize: 10 }}>
    {/* Header */}
    <div style={{ textAlign: 'center', marginBottom: 16, borderBottom: `2px solid ${colors.zinc800}`, paddingBottom: 12 }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: colors.zinc900 }}>
        {L(lang, resume.name.zh, resume.name.en)}
      </div>
      <div style={{ fontSize: 13, color: colors.zinc600, marginTop: 4 }}>
        {L(lang, resume.title.zh, resume.title.en)}
      </div>
      <div style={{ fontSize: 10, color: colors.zinc500, marginTop: 6, display: 'flex', gap: 12, justifyContent: 'center' }}>
        <span>{resume.email}</span>
        <span>{resume.phone}</span>
      </div>
    </div>
    {/* Experience section */}
    <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: colors.zinc800, borderBottom: `1px solid ${colors.zinc300}`, paddingBottom: 4, marginBottom: 8 }}>
      {L(lang, '工作经历', 'EXPERIENCE')}
    </div>
    {resume.experience.slice(0, 2).map((exp, i) => (
      <div key={i} style={{ marginBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 600, color: colors.zinc800 }}>{L(lang, exp.company.zh, exp.company.en)}</span>
          <span style={{ fontSize: 9, color: colors.zinc400 }}>{exp.period}</span>
        </div>
        <div style={{ color: colors.zinc600 }}>{L(lang, exp.role.zh, exp.role.en)}</div>
      </div>
    ))}
    {/* Skills */}
    <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: colors.zinc800, borderBottom: `1px solid ${colors.zinc300}`, paddingBottom: 4, marginBottom: 8, marginTop: 12 }}>
      {L(lang, '专业技能', 'SKILLS')}
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
      {resume.skills.slice(0, 4).map((s, i) => (
        <span key={i} style={{ color: colors.zinc600 }}>{s}{i < 3 ? ' ·' : ''}</span>
      ))}
    </div>
  </div>
);

// Modern template - gradient header, #e94560 accent, decorative circles
const ModernTemplate: React.FC<{ lang: 'zh' | 'en'; resume: typeof content.resume }> = ({ lang, resume }) => (
  <div style={{ fontFamily: 'Inter, "Noto Sans SC", sans-serif', fontSize: 10 }}>
    {/* Gradient header */}
    <div
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        padding: '24px 24px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      <div style={{ position: 'absolute', right: -20, top: -20, width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle, #e94560 0%, transparent 70%)', opacity: 0.1 }} />
      <div style={{ position: 'absolute', left: -10, bottom: -10, width: 60, height: 60, borderRadius: '50%', background: 'radial-gradient(circle, #e94560 0%, transparent 70%)', opacity: 0.08 }} />
      <div style={{ fontSize: 20, fontWeight: 700, color: 'white', letterSpacing: '-0.025em' }}>
        {L(lang, resume.name.zh, resume.name.en)}
      </div>
      <div style={{ fontSize: 12, fontWeight: 300, letterSpacing: '0.05em', color: '#e94560', marginTop: 4 }}>
        {L(lang, resume.title.zh, resume.title.en)}
      </div>
      <div style={{ fontSize: 10, color: '#d1d5db', marginTop: 8, display: 'flex', gap: 8 }}>
        <span>{resume.email}</span>
        <span style={{ color: colors.zinc500 }}>|</span>
        <span>{resume.phone}</span>
      </div>
      {/* Bottom accent line */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #e94560 0%, #0f3460 60%, transparent 100%)' }} />
    </div>
    {/* Body */}
    <div style={{ padding: '16px 24px' }}>
      {/* Section title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{ height: 3, width: 28, borderRadius: 2, background: 'linear-gradient(90deg, #e94560, #0f3460)' }} />
        <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#e94560' }}>
          {L(lang, '工作经历', 'EXPERIENCE')}
        </span>
      </div>
      {resume.experience.slice(0, 2).map((exp, i) => (
        <div key={i} style={{ marginBottom: 10, borderLeft: '2px solid #e94560', paddingLeft: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, color: colors.zinc800 }}>{L(lang, exp.role.zh, exp.role.en)}</span>
            <span style={{ fontSize: 9, padding: '2px 8px', backgroundColor: colors.zinc100, borderRadius: 9999, color: colors.zinc500 }}>{exp.period}</span>
          </div>
          <div style={{ color: '#e94560', fontSize: 10 }}>{L(lang, exp.company.zh, exp.company.en)}</div>
        </div>
      ))}
      {/* Skills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, marginTop: 8 }}>
        <div style={{ height: 3, width: 28, borderRadius: 2, background: 'linear-gradient(90deg, #e94560, #0f3460)' }} />
        <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#e94560' }}>
          {L(lang, '专业技能', 'SKILLS')}
        </span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {resume.skills.slice(0, 4).map((s, i) => (
          <span key={i} style={{ fontSize: 9, padding: '2px 10px', border: `1px solid ${colors.zinc200}`, backgroundColor: colors.zinc50, borderRadius: 9999, color: colors.zinc700, fontWeight: 500 }}>
            {s}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// Minimal template - clean, no borders, no decorations
const MinimalTemplate: React.FC<{ lang: 'zh' | 'en'; resume: typeof content.resume }> = ({ lang, resume }) => (
  <div style={{ fontFamily: 'Inter, "Noto Sans SC", sans-serif', padding: 28, fontSize: 10 }}>
    {/* Header */}
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 16, fontWeight: 500, color: colors.zinc900 }}>
        {L(lang, resume.name.zh, resume.name.en)}
      </div>
      <div style={{ fontSize: 10, color: colors.zinc500, marginTop: 6, display: 'flex', gap: 12 }}>
        <span>{resume.email}</span>
        <span>{resume.phone}</span>
      </div>
    </div>
    {/* Experience */}
    <div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: colors.zinc400, marginBottom: 8 }}>
      {L(lang, '工作经历', 'EXPERIENCE')}
    </div>
    {resume.experience.slice(0, 2).map((exp, i) => (
      <div key={i} style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>
            <span style={{ fontWeight: 500, color: colors.zinc800 }}>{L(lang, exp.role.zh, exp.role.en)}</span>
            <span style={{ color: colors.zinc500 }}> / {L(lang, exp.company.zh, exp.company.en)}</span>
          </span>
          <span style={{ fontSize: 9, color: colors.zinc400 }}>{exp.period}</span>
        </div>
      </div>
    ))}
    {/* Skills */}
    <div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: colors.zinc400, marginBottom: 8, marginTop: 16 }}>
      {L(lang, '专业技能', 'SKILLS')}
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
      {resume.skills.slice(0, 5).map((s, i) => (
        <span key={i} style={{ fontSize: 9, color: colors.zinc600 }}>{s}{i < 4 ? ' ·' : ''}</span>
      ))}
    </div>
  </div>
);
