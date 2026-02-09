import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {SCENES} from '../config/constants';
import type {Language} from '../config/i18n';
import {LanguageProvider} from '../contexts/LanguageContext';
import {ChaosOpening} from '../scenes/section1/ChaosOpening';
import {TheQuestion} from '../scenes/section1/TheQuestion';

export const Section1Hook: React.FC<{language?: Language}> = ({language = 'zh'}) => {
  return (
    <LanguageProvider language={language}>
      <AbsoluteFill>
        <Sequence from={SCENES.chaosOpening.start} durationInFrames={SCENES.chaosOpening.duration}>
          <ChaosOpening />
        </Sequence>
        <Sequence from={SCENES.theQuestion.start} durationInFrames={SCENES.theQuestion.duration}>
          <TheQuestion />
        </Sequence>
      </AbsoluteFill>
    </LanguageProvider>
  );
};
