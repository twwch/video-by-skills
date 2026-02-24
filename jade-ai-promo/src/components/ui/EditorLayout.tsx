import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors } from '../../config/colors';
import { easeOutCubic, progress } from '../../utils/easing';
import { ToolbarMockup } from './ToolbarMockup';

interface EditorLayoutProps {
  startFrame: number;
  children: React.ReactNode;
  showToolbar?: boolean;
}

export const EditorLayout: React.FC<EditorLayoutProps> = ({
  startFrame,
  children,
  showToolbar = true,
}) => {
  const frame = useCurrentFrame();
  const p = easeOutCubic(progress(frame, startFrame, 30));

  return (
    <div
      style={{
        width: 1680,
        height: 920,
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 8px 60px rgba(0,0,0,0.3)',
        border: `1px solid ${colors.appBorder}`,
        opacity: p,
        transform: `scale(${0.92 + 0.08 * p})`,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.appBg,
      }}
    >
      {showToolbar && <ToolbarMockup startFrame={startFrame + 10} />}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>{children}</div>
    </div>
  );
};
