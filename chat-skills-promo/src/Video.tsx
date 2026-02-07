import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {SECTIONS} from './config/constants';
import {Section1Hook} from './sections/Section1Hook';
import {Section2Product} from './sections/Section2Product';
import {Section3Features} from './sections/Section3Features';
import {Section4TechStack} from './sections/Section4TechStack';
import {Section5CTA} from './sections/Section5CTA';

export const Video: React.FC = () => {
  return (
    <AbsoluteFill style={{background: '#0a0a0f'}}>
      <Sequence from={SECTIONS.hook.start} durationInFrames={SECTIONS.hook.duration}>
        <Section1Hook />
      </Sequence>
      <Sequence from={SECTIONS.product.start} durationInFrames={SECTIONS.product.duration}>
        <Section2Product />
      </Sequence>
      <Sequence from={SECTIONS.features.start} durationInFrames={SECTIONS.features.duration}>
        <Section3Features />
      </Sequence>
      <Sequence from={SECTIONS.techStack.start} durationInFrames={SECTIONS.techStack.duration}>
        <Section4TechStack />
      </Sequence>
      <Sequence from={SECTIONS.cta.start} durationInFrames={SECTIONS.cta.duration}>
        <Section5CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
