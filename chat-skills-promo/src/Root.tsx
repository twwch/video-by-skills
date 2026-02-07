import React from 'react';
import {Composition} from 'remotion';
import {FPS, WIDTH, HEIGHT, TOTAL_FRAMES, SECTIONS} from './config/constants';
import {Video} from './Video';
import {Section1Hook} from './sections/Section1Hook';
import {Section2Product} from './sections/Section2Product';
import {Section3Features} from './sections/Section3Features';
import {Section4TechStack} from './sections/Section4TechStack';
import {Section5CTA} from './sections/Section5CTA';

export const Root: React.FC = () => {
  return (
    <>
      {/* Full video */}
      <Composition
        id="ChatSkillsPromo"
        component={Video}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      {/* Individual section previews */}
      <Composition
        id="Section1-Hook"
        component={Section1Hook}
        durationInFrames={SECTIONS.hook.duration}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Section2-Product"
        component={Section2Product}
        durationInFrames={SECTIONS.product.duration}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Section3-Features"
        component={Section3Features}
        durationInFrames={SECTIONS.features.duration}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Section4-TechStack"
        component={Section4TechStack}
        durationInFrames={SECTIONS.techStack.duration}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Section5-CTA"
        component={Section5CTA}
        durationInFrames={SECTIONS.cta.duration}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
