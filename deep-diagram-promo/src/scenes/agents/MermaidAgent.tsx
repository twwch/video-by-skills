import React from 'react';
import { agents } from '../../config/content';
import { AgentScene } from './AgentScene';

export const MermaidAgent: React.FC = () => {
  return <AgentScene agent={agents[4]} />;
};
