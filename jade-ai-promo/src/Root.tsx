import React from 'react';
import { Composition } from 'remotion';
import { Video } from './Video';
import { FPS, WIDTH, HEIGHT, TOTAL_FRAMES, SCENES } from './config/constants';
import { LanguageProvider } from './contexts/LanguageContext';
import { FontLoader } from './components/FontLoader';
import { colors } from './config/colors';
import { AbsoluteFill } from 'remotion';

// Individual scene imports for preview
import { S1_OpeningHook } from './scenes/S1_OpeningHook';
import { S2_LogoReveal } from './scenes/S2_LogoReveal';
import { S3_Dashboard } from './scenes/S3_Dashboard';
import { S4_Editor } from './scenes/S4_Editor';
import { S5_AIAssistant } from './scenes/S5_AIAssistant';
import { S6_Templates } from './scenes/S6_Templates';
import { S7_Features } from './scenes/S7_Features';
import { S8_Closing } from './scenes/S8_Closing';

const SceneWrapper: React.FC<{
  language: 'zh' | 'en';
  children: React.ReactNode;
}> = ({ language, children }) => (
  <LanguageProvider language={language}>
    <FontLoader>
      <AbsoluteFill style={{ backgroundColor: colors.bg }}>
        {children}
      </AbsoluteFill>
    </FontLoader>
  </LanguageProvider>
);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Full compositions */}
      <Composition
        id="JadeAIPromo-zh"
        component={Video}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{ language: 'zh' as const }}
      />
      <Composition
        id="JadeAIPromo-en"
        component={Video}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{ language: 'en' as const }}
      />

      {/* Individual scene previews */}
      {([
        { id: 'S1-OpeningHook', scene: SCENES.S1_OPENING, Component: S1_OpeningHook },
        { id: 'S2-LogoReveal', scene: SCENES.S2_LOGO, Component: S2_LogoReveal },
        { id: 'S3-Dashboard', scene: SCENES.S3_DASHBOARD, Component: S3_Dashboard },
        { id: 'S4-Editor', scene: SCENES.S4_EDITOR, Component: S4_Editor },
        { id: 'S5-AIAssistant', scene: SCENES.S5_AI, Component: S5_AIAssistant },
        { id: 'S6-Templates', scene: SCENES.S6_TEMPLATES, Component: S6_Templates },
        { id: 'S7-Features', scene: SCENES.S7_FEATURES, Component: S7_Features },
        { id: 'S8-Closing', scene: SCENES.S8_CLOSING, Component: S8_Closing },
      ] as const).map(({ id, scene, Component }) => (
        <Composition
          key={id}
          id={id}
          component={() => (
            <SceneWrapper language="zh">
              <Component />
            </SceneWrapper>
          )}
          durationInFrames={scene.duration}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      ))}
    </>
  );
};
