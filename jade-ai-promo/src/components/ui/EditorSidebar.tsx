import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors } from '../../config/colors';
import { content, L } from '../../config/content';
import { useLanguage } from '../../contexts/LanguageContext';
import { easeOutCubic, progress } from '../../utils/easing';

// Lucide icon paths for each section (matching original)
const sectionIcons: Record<string, string[]> = {
  user: [ // Personal Info - User icon
    'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2',
    'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z', // circle
  ],
  fileText: [ // Summary - FileText
    'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z',
    'M14 2v4a2 2 0 0 0 2 2h4',
    'M10 9H8', 'M16 13H8', 'M16 17H8',
  ],
  briefcase: [ // Work Experience - Briefcase
    'M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16',
    'M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7z',
  ],
  graduationCap: [ // Education - GraduationCap
    'M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z',
    'M22 10v6', 'M6 12.5V16a6 3 0 0 0 12 0v-3.5',
  ],
  wrench: [ // Skills - Wrench
    'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
  ],
  folderKanban: [ // Projects - FolderKanban
    'M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z',
    'M8 10v4', 'M12 10v2', 'M16 10v6',
  ],
};

const sectionIconKeys = ['user', 'fileText', 'briefcase', 'graduationCap', 'wrench', 'folderKanban'];

// GripVertical icon
const GripVertical: React.FC<{ color: string }> = ({ color }) => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round">
    <circle cx="9" cy="5" r="1" /><circle cx="15" cy="5" r="1" />
    <circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" />
    <circle cx="9" cy="19" r="1" /><circle cx="15" cy="19" r="1" />
  </svg>
);

interface EditorSidebarProps {
  startFrame: number;
  activeIndex?: number;
  dragIndex?: number;
  dragOffsetY?: number;
}

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
  startFrame,
  activeIndex = 2,
  dragIndex = -1,
  dragOffsetY = 0,
}) => {
  const frame = useCurrentFrame();
  const lang = useLanguage();
  const sections = lang === 'zh' ? content.editor.sections.zh : content.editor.sections.en;

  return (
    <div
      style={{
        width: 224, // w-56
        flexShrink: 0,
        backgroundColor: colors.appWhite,
        borderRight: `1px solid ${colors.appBorder}`,
        fontFamily: 'Inter, "Noto Sans SC", sans-serif',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{ padding: 12 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: colors.zinc400,
          }}
        >
          {L(lang, '简历章节', 'SECTIONS')}
        </div>
      </div>

      {/* Section items */}
      <div style={{ padding: '0 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {sections.map((section, i) => {
          const delay = i * 5;
          const p = easeOutCubic(progress(frame, startFrame + delay, 20));
          const isActive = i === activeIndex;
          const isDragging = i === dragIndex;
          const iconKey = sectionIconKeys[i];
          const iconPaths = sectionIcons[iconKey] || [];

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 8px',
                borderRadius: 6,
                fontSize: 14,
                color: isActive ? colors.pink700 : colors.zinc600,
                backgroundColor: isActive ? colors.pink50 : 'transparent',
                fontWeight: isActive ? 600 : 400,
                opacity: p,
                transform: `translateX(${(1 - p) * -20}px)${isDragging ? ` translateY(${dragOffsetY}px)` : ''}`,
                boxShadow: isDragging ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                zIndex: isDragging ? 10 : 1,
                position: 'relative',
              }}
            >
              <GripVertical color={colors.zinc300} />
              {/* Lucide section icon */}
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke={isActive ? colors.pink700 : colors.zinc600}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {iconPaths.map((d, pi) => (
                  <path key={pi} d={d} />
                ))}
              </svg>
              {section}
            </div>
          );
        })}
      </div>

      {/* Separator */}
      <div style={{ height: 1, backgroundColor: colors.appBorder, margin: '12px 8px' }} />

      {/* Add Section label */}
      <div style={{ padding: '0 12px', marginBottom: 8 }}>
        <div style={{ fontSize: 12, color: colors.zinc400 }}>
          {L(lang, '添加章节', 'Add Section')}
        </div>
      </div>
    </div>
  );
};
