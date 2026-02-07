import React from 'react';
import { agents } from '../../config/content';
import { AgentScene } from './AgentScene';

export const InfographicAgent: React.FC = () => {
  return <AgentScene agent={agents[5]} />;
};
