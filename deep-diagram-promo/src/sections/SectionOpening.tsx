import React from 'react';
import { Sequence } from 'remotion';
import { OPENING } from '../config/constants';
import { LogoReveal } from '../scenes/opening/LogoReveal';

export const SectionOpening: React.FC = () => {
  return (
    <Sequence durationInFrames={OPENING.duration}>
      <LogoReveal />
    </Sequence>
  );
};
