import React from 'react';
import { AbsoluteFill } from 'remotion';
import type { Language } from './config/content';
import { LanguageProvider } from './contexts/LanguageContext';
import { FontLoader } from './components/FontLoader';
import { MainVideo } from './sections/MainVideo';
import { colors } from './config/colors';

export const Video: React.FC<{ language: Language }> = ({ language }) => {
  return (
    <LanguageProvider language={language}>
      <FontLoader>
        <AbsoluteFill style={{ backgroundColor: colors.bg }}>
          <MainVideo />
        </AbsoluteFill>
      </FontLoader>
    </LanguageProvider>
  );
};
