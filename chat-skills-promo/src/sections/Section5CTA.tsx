import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {SCENES} from '../config/constants';
import {SummaryTagline} from '../scenes/section5/SummaryTagline';
import {CallToAction} from '../scenes/section5/CallToAction';

export const Section5CTA: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={SCENES.summaryTagline.start} durationInFrames={SCENES.summaryTagline.duration}>
        <SummaryTagline />
      </Sequence>
      <Sequence from={SCENES.callToAction.start} durationInFrames={SCENES.callToAction.duration}>
        <CallToAction />
      </Sequence>
    </AbsoluteFill>
  );
};
