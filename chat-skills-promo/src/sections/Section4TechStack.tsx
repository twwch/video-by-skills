import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {SCENES} from '../config/constants';
import {TechStackGrid} from '../scenes/section4/TechStackGrid';
import {ArchitectureFlow} from '../scenes/section4/ArchitectureFlow';

export const Section4TechStack: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={SCENES.techStackGrid.start} durationInFrames={SCENES.techStackGrid.duration}>
        <TechStackGrid />
      </Sequence>
      <Sequence from={SCENES.architectureFlow.start} durationInFrames={SCENES.architectureFlow.duration}>
        <ArchitectureFlow />
      </Sequence>
    </AbsoluteFill>
  );
};
