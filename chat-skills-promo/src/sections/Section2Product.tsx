import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {SCENES} from '../config/constants';
import type {Language} from '../config/i18n';
import {LanguageProvider} from '../contexts/LanguageContext';
import {LogoReveal} from '../scenes/section2/LogoReveal';
import {UIOverview} from '../scenes/section2/UIOverview';

export const Section2Product: React.FC<{language?: Language}> = ({language = 'zh'}) => {
  return (
    <LanguageProvider language={language}>
      <AbsoluteFill>
        <Sequence from={SCENES.logoReveal.start} durationInFrames={SCENES.logoReveal.duration}>
          <LogoReveal />
        </Sequence>
        <Sequence from={SCENES.uiOverview.start} durationInFrames={SCENES.uiOverview.duration}>
          <UIOverview />
        </Sequence>
      </AbsoluteFill>
    </LanguageProvider>
  );
};
