import React from 'react';
import { Sequence } from 'remotion';
import { AGENT_SCENES, AGENT_SCENE_DURATION } from '../config/constants';
import { MindMapAgent } from '../scenes/agents/MindMapAgent';
import { FlowchartAgent } from '../scenes/agents/FlowchartAgent';
import { ChartsAgent } from '../scenes/agents/ChartsAgent';
import { DrawioAgent } from '../scenes/agents/DrawioAgent';
import { MermaidAgent } from '../scenes/agents/MermaidAgent';
import { InfographicAgent } from '../scenes/agents/InfographicAgent';

const agentComponents = [
  MindMapAgent,
  FlowchartAgent,
  ChartsAgent,
  DrawioAgent,
  MermaidAgent,
  InfographicAgent,
];

export const SectionAgents: React.FC = () => {
  return (
    <>
      {AGENT_SCENES.map((scene, i) => {
        const Component = agentComponents[i];
        return (
          <Sequence key={scene.name} from={scene.start} durationInFrames={AGENT_SCENE_DURATION}>
            <Component />
          </Sequence>
        );
      })}
    </>
  );
};
