import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {SCENES} from '../config/constants';
import {LogoReveal} from '../scenes/section2/LogoReveal';
import {UIOverview} from '../scenes/section2/UIOverview';

export const Section2Product: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={SCENES.logoReveal.start} durationInFrames={SCENES.logoReveal.duration}>
        <LogoReveal />
      </Sequence>
      <Sequence from={SCENES.uiOverview.start} durationInFrames={SCENES.uiOverview.duration}>
        <UIOverview />
      </Sequence>
    </AbsoluteFill>
  );
};
