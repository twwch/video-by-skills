import React from 'react';
import { Sequence } from 'remotion';
import { CLOSING } from '../config/constants';
import { ClosingTagline } from '../scenes/closing/ClosingTagline';

export const SectionClosing: React.FC = () => {
  return (
    <Sequence durationInFrames={CLOSING.duration}>
      <ClosingTagline />
    </Sequence>
  );
};
