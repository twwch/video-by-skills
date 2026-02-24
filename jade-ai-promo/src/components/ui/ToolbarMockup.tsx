import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors } from '../../config/colors';
import { easeOutCubic, progress } from '../../utils/easing';
import { useLanguage } from '../../contexts/LanguageContext';
import { L } from '../../config/content';

interface ToolbarMockupProps {
  startFrame: number;
  showAutoSave?: boolean;
}

const Icon: React.FC<{ paths: string[]; size?: number; color?: string; strokeWidth?: number }> = ({
  paths, size = 16, color = colors.zinc600, strokeWidth = 2,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {paths.map((d, i) => <path key={i} d={d} />)}
  </svg>
);

/**
 * Editor Toolbar – matches real app: h-12 bg-white border-b
 * Left: back + separator + title + auto-save
 * Middle: undo/redo | export share JD translate cover grammar | theme | settings locale
 */
export const ToolbarMockup: React.FC<ToolbarMockupProps> = ({
  startFrame,
  showAutoSave = true,
}) => {
  const frame = useCurrentFrame();
  const lang = useLanguage();
  const p = easeOutCubic(progress(frame, startFrame, 20));

  return (
    <div
      style={{
        height: 48,
        backgroundColor: colors.appWhite,
        borderBottom: `1px solid ${colors.appBorder}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
        fontFamily: 'Inter, "Noto Sans SC", sans-serif',
        opacity: p,
      }}
    >
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Btn><Icon paths={['m12 19-7-7 7-7', 'M19 12H5']} /></Btn>
        <Sep />
        <div style={{ fontSize: 14, fontWeight: 500, color: colors.zinc900, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {L(lang, '前端工程师简历', 'Frontend Engineer Resume')}
        </div>
        {showAutoSave && (
          <span style={{ fontSize: 12, color: colors.zinc400 }}>
            {L(lang, '已自动保存', 'Auto-saved')}
          </span>
        )}
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Undo / Redo */}
        <Btn><Icon paths={['M3 7v6h6', 'M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13']} /></Btn>
        <Btn><Icon paths={['M21 7v6h-6', 'M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13']} /></Btn>
        <Sep />

        {/* Export */}
        <BtnWithLabel icon={['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'm7 10 5 5 5-5', 'M12 15V3']} label={L(lang, '导出', 'Export')} />
        {/* Share */}
        <BtnWithLabel icon={['M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8', 'm16 6-4-4-4 4', 'M12 2v13']} label={L(lang, '分享', 'Share')} />
        {/* JD Match */}
        <BtnWithLabel icon={['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z', 'M14 2v4a2 2 0 0 0 2 2h4', 'M10 9H8', 'M16 13H8', 'M16 17H8']} label="JD" />
        {/* Translate */}
        <BtnWithLabel icon={['m5 8 6 6', 'm4 14 6-6 2-3', 'M2 5h12', 'M7 2h1', 'M22 22l-5-10-5 10', 'M14 18h6']} label={L(lang, '翻译', 'Trans')} />
        <Sep />

        {/* Theme toggle */}
        <Btn>
          <Icon paths={['M12 20a8 8 0 0 0 8-8 8 8 0 0 0-8 8z', 'M12 4a8 8 0 0 1 8 8 8 8 0 0 1-8-8z', 'M12 2v2', 'M12 20v2', 'M22 12h-2', 'M4 12H2']} color={colors.zinc500} />
        </Btn>
        <Sep />

        {/* Settings */}
        <Btn>
          <Icon paths={['M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z']} color={colors.zinc500} />
        </Btn>

        {/* Locale switcher */}
        <Btn>
          <Icon paths={['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M2 12h20', 'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z']} color={colors.zinc500} />
        </Btn>
      </div>
    </div>
  );
};

const Btn: React.FC<{ children: React.ReactNode; active?: boolean }> = ({ children, active }) => (
  <div
    style={{
      padding: 6,
      borderRadius: 6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: active ? colors.zinc100 : 'transparent',
    }}
  >
    {children}
  </div>
);

const BtnWithLabel: React.FC<{ icon: string[]; label: string }> = ({ icon, label }) => (
  <div
    style={{
      padding: '4px 8px',
      borderRadius: 6,
      display: 'flex',
      alignItems: 'center',
      gap: 4,
    }}
  >
    <Icon paths={icon} size={14} color={colors.zinc600} />
    <span style={{ fontSize: 12, color: colors.zinc600 }}>{label}</span>
  </div>
);

const Sep: React.FC = () => (
  <div style={{ width: 1, height: 24, backgroundColor: colors.appBorder, margin: '0 4px' }} />
);
