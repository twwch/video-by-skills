import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {SCENES} from '../config/constants';
import type {Language} from '../config/i18n';
import {LanguageProvider} from '../contexts/LanguageContext';
import {SummaryTagline} from '../scenes/section5/SummaryTagline';
import {CallToAction} from '../scenes/section5/CallToAction';

export const Section5CTA: React.FC<{language?: Language}> = ({language = 'zh'}) => {
  return (
    <LanguageProvider language={language}>
      <AbsoluteFill>
        <Sequence from={SCENES.summaryTagline.start} durationInFrames={SCENES.summaryTagline.duration}>
          <SummaryTagline />
        </Sequence>
        <Sequence from={SCENES.callToAction.start} durationInFrames={SCENES.callToAction.duration}>
          <CallToAction />
        </Sequence>
      </AbsoluteFill>
    </LanguageProvider>
  );
};
