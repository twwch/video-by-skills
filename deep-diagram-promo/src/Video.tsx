import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { OPENING, CLOSING, AGENTS_SECTION_DURATION } from './config/constants';
import { theme } from './config/colors';
import { FontLoader } from './components/FontLoader';
import { SectionOpening } from './sections/SectionOpening';
import { SectionAgents } from './sections/SectionAgents';
import { SectionClosing } from './sections/SectionClosing';

export const Video: React.FC = () => {
  const agentsStart = OPENING.duration;
  const closingStart = agentsStart + AGENTS_SECTION_DURATION;

  return (
    <AbsoluteFill style={{ background: theme.bg }}>
      <FontLoader />
      {/* Opening */}
      <Sequence from={0} durationInFrames={OPENING.duration}>
        <SectionOpening />
      </Sequence>

      {/* Agent demos */}
      <Sequence from={agentsStart} durationInFrames={AGENTS_SECTION_DURATION}>
        <SectionAgents />
      </Sequence>

      {/* Closing */}
      <Sequence from={closingStart} durationInFrames={CLOSING.duration}>
        <SectionClosing />
      </Sequence>
    </AbsoluteFill>
  );
};
