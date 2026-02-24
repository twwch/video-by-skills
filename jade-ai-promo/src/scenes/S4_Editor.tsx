import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors } from '../config/colors';
import { EditorLayout } from '../components/ui/EditorLayout';
import { EditorSidebar } from '../components/ui/EditorSidebar';
import { EditorCanvas } from '../components/ui/EditorCanvas';
import { EditorPreviewPanel } from '../components/ui/EditorPreviewPanel';
import { JadeGlow } from '../components/effects/JadeGlow';
import { easeOutCubic, easeInOutCubic, progress } from '../utils/easing';

/**
 * S4 Editor Interface – 3-panel layout matching real app:
 *  Sidebar (w-56) + Canvas (flex-4) + Preview Panel (flex-6)
 *  Shows drag-and-drop reordering of Work Experience section.
 */
export const S4_Editor: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeOut = 1 - progress(frame, 390, 30);

  // Drag animation for section reordering
  let dragIndex = -1;
  let dragOffsetY = 0;
  if (frame >= 150 && frame < 280) {
    dragIndex = 2;
    if (frame < 170) {
      const liftP = easeOutCubic(progress(frame, 150, 20));
      dragOffsetY = -5 * liftP;
    } else if (frame < 250) {
      const moveP = easeInOutCubic(progress(frame, 170, 80));
      dragOffsetY = -5 - moveP * 45;
    } else {
      const dropP = easeOutCubic(progress(frame, 250, 30));
      dragOffsetY = -50 * (1 - dropP);
    }
  }

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: colors.bg,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeOut,
      }}
    >
      <JadeGlow x="50%" y="50%" size={800} opacity={0.06} />

      <EditorLayout startFrame={0}>
        {/* Left: Sidebar (w-56) */}
        <EditorSidebar
          startFrame={15}
          activeIndex={dragIndex >= 0 ? dragIndex : 2}
          dragIndex={dragIndex}
          dragOffsetY={dragOffsetY}
        />
        {/* Center: Canvas (flex-4) */}
        <div style={{ flex: 4, overflow: 'hidden' }}>
          <EditorCanvas
            startFrame={20}
            highlightSection={frame >= 150 && frame < 280 ? 2 : -1}
          />
        </div>
        {/* Right: Preview Panel (flex-6) */}
        <EditorPreviewPanel startFrame={25} />
      </EditorLayout>
    </div>
  );
};
