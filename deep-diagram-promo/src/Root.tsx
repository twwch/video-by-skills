import React from 'react';
import { Composition } from 'remotion';
import { Video } from './Video';
import { FPS, WIDTH, HEIGHT, TOTAL_FRAMES, AGENT_SCENE_DURATION, OPENING, CLOSING } from './config/constants';
import { LogoReveal } from './scenes/opening/LogoReveal';
import { MindMapAgent } from './scenes/agents/MindMapAgent';
import { FlowchartAgent } from './scenes/agents/FlowchartAgent';
import { ChartsAgent } from './scenes/agents/ChartsAgent';
import { DrawioAgent } from './scenes/agents/DrawioAgent';
import { MermaidAgent } from './scenes/agents/MermaidAgent';
import { InfographicAgent } from './scenes/agents/InfographicAgent';
import { ClosingTagline } from './scenes/closing/ClosingTagline';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Full video */}
      <Composition
        id="DeepDiagramPromo"
        component={Video}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      {/* Individual scene previews */}
      <Composition
        id="Opening"
        component={LogoReveal}
        durationInFrames={OPENING.duration}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      <Composition
        id="MindMapAgent"
        component={MindMapAgent}
        durationInFrames={AGENT_SCENE_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      <Composition
        id="FlowchartAgent"
        component={FlowchartAgent}
        durationInFrames={AGENT_SCENE_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      <Composition
        id="ChartsAgent"
        component={ChartsAgent}
        durationInFrames={AGENT_SCENE_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      <Composition
        id="DrawioAgent"
        component={DrawioAgent}
        durationInFrames={AGENT_SCENE_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      <Composition
        id="MermaidAgent"
        component={MermaidAgent}
        durationInFrames={AGENT_SCENE_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      <Composition
        id="InfographicAgent"
        component={InfographicAgent}
        durationInFrames={AGENT_SCENE_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      <Composition
        id="Closing"
        component={ClosingTagline}
        durationInFrames={CLOSING.duration}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
