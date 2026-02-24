import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors } from '../../config/colors';
import { content, L } from '../../config/content';
import { useLanguage } from '../../contexts/LanguageContext';
import { easeOutCubic, progress } from '../../utils/easing';

interface EditorCanvasProps {
  startFrame: number;
  highlightSection?: number;
}

// GripVertical for section cards
const GripVertical: React.FC = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.zinc300} strokeWidth={2} strokeLinecap="round">
    <circle cx="9" cy="5" r="1" /><circle cx="15" cy="5" r="1" />
    <circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" />
    <circle cx="9" cy="19" r="1" /><circle cx="15" cy="19" r="1" />
  </svg>
);

export const EditorCanvas: React.FC<EditorCanvasProps> = ({
  startFrame,
  highlightSection = -1,
}) => {
  const frame = useCurrentFrame();
  const lang = useLanguage();
  const resume = content.resume;
  const p = easeOutCubic(progress(frame, startFrame, 30));

  return (
    <div
      style={{
        flex: 1,
        overflow: 'hidden',
        backgroundColor: colors.appBg,
      }}
    >
      {/* Scrollable canvas area - max-w-3xl mx-auto px-6 py-8 */}
      <div
        style={{
          maxWidth: 768,
          margin: '0 auto',
          padding: '32px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          opacity: p,
          transform: `translateY(${(1 - p) * 20}px)`,
        }}
      >
        {/* Personal Info section card */}
        <SectionCard
          title={L(lang, '个人信息', 'Personal Info')}
          selected={highlightSection === 0}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label={L(lang, '姓名', 'Name')} value={L(lang, resume.name.zh, resume.name.en)} />
            <Field label={L(lang, '职位', 'Job Title')} value={L(lang, resume.title.zh, resume.title.en)} />
            <Field label={L(lang, '邮箱', 'Email')} value={resume.email} />
            <Field label={L(lang, '电话', 'Phone')} value={resume.phone} />
          </div>
        </SectionCard>

        {/* Summary section card */}
        <SectionCard
          title={L(lang, '个人总结', 'Summary')}
          selected={highlightSection === 1}
        >
          <Field label={L(lang, '总结', 'Summary')} value={L(lang, resume.summary.zh, resume.summary.en)} multiline />
        </SectionCard>

        {/* Work Experience section card */}
        <SectionCard
          title={L(lang, '工作经历', 'Work Experience')}
          selected={highlightSection === 2}
        >
          {resume.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: i < 2 ? 12 : 0, paddingBottom: i < 2 ? 12 : 0, borderBottom: i < 2 ? `1px solid ${colors.appBorder}` : 'none' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Field label={L(lang, '公司', 'Company')} value={L(lang, exp.company.zh, exp.company.en)} />
                <Field label={L(lang, '职位', 'Position')} value={L(lang, exp.role.zh, exp.role.en)} />
              </div>
            </div>
          ))}
        </SectionCard>

        {/* Skills section card */}
        <SectionCard
          title={L(lang, '专业技能', 'Skills')}
          selected={highlightSection === 4}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {resume.skills.map((skill, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input
                  type="text"
                  readOnly
                  value={skill}
                  style={{
                    height: 32,
                    fontSize: 14,
                    padding: '0 12px',
                    border: `1px solid ${colors.appBorder}`,
                    borderRadius: 6,
                    backgroundColor: colors.appWhite,
                    color: colors.zinc900,
                    outline: 'none',
                    fontFamily: 'Inter, sans-serif',
                    width: 120,
                  }}
                />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

// Section card wrapper matching original section-wrapper.tsx
const SectionCard: React.FC<{
  title: string;
  selected: boolean;
  children: React.ReactNode;
}> = ({ title, selected, children }) => {
  return (
    <div
      style={{
        backgroundColor: colors.appWhite,
        borderRadius: 12, // rounded-xl
        border: `1px solid ${colors.appBorder}`,
        boxShadow: selected ? '0 4px 6px -1px rgba(0,0,0,0.1)' : '0 1px 2px rgba(0,0,0,0.03)',
        outline: selected ? `2px solid ${colors.pink300}` : 'none',
        fontFamily: 'Inter, "Noto Sans SC", sans-serif',
      }}
    >
      {/* Card header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px 8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <GripVertical />
          <span style={{ fontSize: 14, fontWeight: 600, color: colors.zinc700 }}>{title}</span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {/* Eye icon */}
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={colors.zinc400} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
            <circle cx="12" cy="12" r="2" />
          </svg>
          {/* Trash icon */}
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={colors.red400} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </div>
      </div>
      {/* Card content */}
      <div style={{ padding: '0 16px 16px' }}>
        {children}
      </div>
    </div>
  );
};

// Field input matching editable-text.tsx
const Field: React.FC<{ label: string; value: string; multiline?: boolean }> = ({ label, value, multiline }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <label style={{ fontSize: 12, fontWeight: 500, color: colors.zinc500 }}>{label}</label>
    {multiline ? (
      <div
        style={{
          fontSize: 14,
          padding: '6px 12px',
          border: `1px solid ${colors.appBorder}`,
          borderRadius: 6,
          backgroundColor: colors.appWhite,
          color: colors.zinc900,
          minHeight: 60,
          lineHeight: 1.5,
          fontFamily: 'Inter, "Noto Sans SC", sans-serif',
        }}
      >
        {value}
      </div>
    ) : (
      <div
        style={{
          height: 32,
          fontSize: 14,
          padding: '0 12px',
          border: `1px solid ${colors.appBorder}`,
          borderRadius: 6,
          backgroundColor: colors.appWhite,
          color: colors.zinc900,
          display: 'flex',
          alignItems: 'center',
          fontFamily: 'Inter, "Noto Sans SC", sans-serif',
        }}
      >
        {value}
      </div>
    )}
  </div>
);
