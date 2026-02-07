import React from 'react';
import type { AgentContent } from '../../config/content';
import { DeepDiagramLayout } from '../../components/ui/DeepDiagramLayout';
import { DiagramPreview } from '../../components/ui/DiagramPreview';

interface AgentSceneProps {
  agent: AgentContent;
}

export const AgentScene: React.FC<AgentSceneProps> = ({ agent }) => {
  return (
    <DeepDiagramLayout
      agent={agent}
      canvas={(diagramProgress) => (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <DiagramPreview agentKey={agent.key} progress={diagramProgress} />
        </div>
      )}
    />
  );
};
