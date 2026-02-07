import React from 'react';
import { agents } from '../../config/content';
import { AgentScene } from './AgentScene';

export const ChartsAgent: React.FC = () => {
  return <AgentScene agent={agents[2]} />;
};
