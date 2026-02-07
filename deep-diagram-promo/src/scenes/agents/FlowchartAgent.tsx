import React from 'react';
import { agents } from '../../config/content';
import { AgentScene } from './AgentScene';

export const FlowchartAgent: React.FC = () => {
  return <AgentScene agent={agents[1]} />;
};
