import type { AgentKey } from './colors';

export interface AgentContent {
  key: AgentKey;
  name: string;
  icon: string;
  mention: string;          // e.g., "@mindmap"
  userPrompt: string;       // full prompt text including @mention
  callingFunction: string;  // e.g., "create_mindmap"
  activeChipIndex: number;  // which chip to highlight (Flowchart=0, Mindmap=1, Mermaid=2, Charts=3, Draw.io=4, Infographic=5)
  assistantResponse: string;
  designConcept: string;
  designDetail: string;     // streaming paragraph text shown inside Design Concept
  resultCode: string;       // streaming code shown inside Result block
}

// Chip order matches the actual DeepDiagram UI
export const AGENT_CHIPS = [
  { icon: '◇', label: 'Flowchart' },
  { icon: '☆', label: 'Mindmap' },
  { icon: '</>', label: 'Mermaid' },
  { icon: '▥', label: 'Charts' },
  { icon: '◈', label: 'Draw.io' },
  { icon: '▦', label: 'Infographic' },
] as const;

export const agents: AgentContent[] = [
  {
    key: 'mindmap',
    name: 'Mindmap Agent',
    icon: '🧠',
    mention: '@mindmap',
    userPrompt: '@mindmap create a comprehensive mind map for Machine Learning concepts and algorithms',
    callingFunction: 'create_mindmap',
    activeChipIndex: 1,
    assistantResponse: 'Here\'s a comprehensive mind map breaking down the key areas of Machine Learning into six main branches.',
    designConcept: 'Hierarchical mind map with radial layout',
    designDetail: 'A radial mind map centered on "Machine Learning" with 6 main branches: Supervised Learning, Unsupervised Learning, Reinforcement Learning, Deep Learning, Feature Engineering, and Model Evaluation. Each branch further divides into 2-3 key sub-concepts with color-coded grouping.',
    resultCode: `# Machine Learning
## Supervised Learning
- Classification
  - Decision Trees
  - SVM
- Regression
  - Linear
  - Polynomial
## Unsupervised Learning
- Clustering
  - K-Means
  - DBSCAN
- Dimensionality Reduction
  - PCA
  - t-SNE
## Deep Learning
- CNN
- RNN / LSTM
- Transformers`,
  },
  {
    key: 'flowchart',
    name: 'Flowchart Agent',
    icon: '📊',
    mention: '@flowchart',
    userPrompt: '@flowchart design a user registration flow with email verification and error handling',
    callingFunction: 'create_flowchart',
    activeChipIndex: 0,
    assistantResponse: 'I\'ve designed a complete registration flow with input validation, email verification, and error handling paths.',
    designConcept: 'Process flowchart with decision diamonds',
    designDetail: 'A vertical process flowchart with start/end terminals, 3 decision diamonds for input validation, email verification, and activation status. Error paths branch left with red connectors, success paths flow downward in green.',
    resultCode: `{
  "nodes": [
    { "id": "1", "type": "start",
      "data": { "label": "Start" } },
    { "id": "2", "type": "process",
      "data": { "label": "Enter Details" } },
    { "id": "3", "type": "decision",
      "data": { "label": "Valid Input?" } },
    { "id": "4", "type": "process",
      "data": { "label": "Send Verification" } },
    { "id": "5", "type": "decision",
      "data": { "label": "Email Verified?" } },
    { "id": "6", "type": "end",
      "data": { "label": "Account Active" } }
  ],
  "edges": [
    { "id": "e1-2", "source": "1",
      "target": "2" },
    { "id": "e2-3", "source": "2",
      "target": "3" },
    { "id": "e3-4", "source": "3",
      "target": "4", "label": "Yes" },
    { "id": "e5-6", "source": "5",
      "target": "6", "label": "Yes" }
  ]
}`,
  },
  {
    key: 'charts',
    name: 'Charts Agent',
    icon: '📈',
    mention: '@charts',
    userPrompt: '@charts visualize quarterly sales data for 2024 by region with year-over-year comparison',
    callingFunction: 'create_chart',
    activeChipIndex: 3,
    assistantResponse: 'Here\'s a grouped bar chart showing quarterly sales across North America, Europe, and Asia Pacific.',
    designConcept: 'Grouped bar chart with axis labels',
    designDetail: 'A grouped bar chart with quarterly clusters (Q1-Q4) and 3 color-coded series for North America, Europe, and Asia Pacific. Includes Y-axis revenue labels ($M), gridlines, legend, and value annotations on each bar.',
    resultCode: `{
  "xAxis": {
    "data": ["Q1", "Q2", "Q3", "Q4"]
  },
  "series": [
    { "name": "NA", "type": "bar",
      "data": [4.2, 5.1, 4.8, 6.3] },
    { "name": "EU", "type": "bar",
      "data": [3.1, 3.8, 4.2, 4.9] },
    { "name": "APAC", "type": "bar",
      "data": [2.8, 3.2, 3.9, 4.5] }
  ]
}`,
  },
  {
    key: 'drawio',
    name: 'Draw.io Agent',
    icon: '🏗️',
    mention: '@drawio',
    userPrompt: '@drawio design a microservices architecture on AWS with API Gateway, ECS, and data stores',
    callingFunction: 'create_drawio',
    activeChipIndex: 4,
    assistantResponse: 'I\'ve created an AWS architecture diagram with API Gateway, three microservices, and their data stores.',
    designConcept: 'Architecture diagram with service icons',
    designDetail: 'An AWS cloud architecture diagram with API Gateway as the entry point, routing to 3 ECS microservices (Auth, Orders, Notifications) within a VPC. Each service connects to its data store: RDS, DynamoDB, and SQS respectively.',
    resultCode: `<mxGraphModel>
  <root>
    <mxCell id="gw" value="API Gateway"
      style="shape=mxgraph.aws4"
      vertex="1" />
    <mxCell id="auth"
      value="Auth Service"
      vertex="1" />
    <mxCell id="orders"
      value="Orders Service"
      vertex="1" />
  </root>
</mxGraphModel>`,
  },
  {
    key: 'mermaid',
    name: 'Mermaid Agent',
    icon: '🧜',
    mention: '@mermaid',
    userPrompt: '@mermaid a comprehensive sequence diagram for a distributed OAuth2.0 authentication flow involving Client, Auth Server, and Resource Server.',
    callingFunction: 'create_mermaid',
    activeChipIndex: 2,
    assistantResponse: 'Here\'s the OAuth 2.0 authorization code flow showing interactions between Client, Auth Server, and Resource Server.',
    designConcept: 'Sequence diagram with lifelines',
    designDetail: 'A 4-lifeline sequence diagram modeling the OAuth 2.0 authorization code flow. Covers: login initiation, authorization redirect, code exchange, token issuance, and protected resource access with JWT validation.',
    resultCode: `sequenceDiagram
  participant U as User
  participant C as Client App
  participant A as Auth Server
  participant R as Resource Server
  U->>C: Click Login
  C->>A: Authorization Request
  A->>U: Login Page
  U->>A: Credentials`,
  },
  {
    key: 'infographic',
    name: 'Infographic Agent',
    icon: '🎨',
    mention: '@infographic',
    userPrompt: '@infographic create a visual timeline of AI development milestones from 1950 to 2024',
    callingFunction: 'create_infographic',
    activeChipIndex: 5,
    assistantResponse: 'Here\'s a timeline infographic covering key milestones in AI from 1950 to 2024.',
    designConcept: 'Timeline infographic with milestones',
    designDetail: 'A horizontal timeline spanning 1950-2024 with 6 milestone markers. Each milestone features a year badge, icon, title, and brief description — from the Turing Test through to modern large language models and generative AI.',
    resultCode: `infographic timeline-horizontal
  data
    item 1950 "Turing Test"
    item 1997 "Deep Blue"
    item 2012 "Deep Learning"
    item 2017 "Transformer"
    item 2022 "ChatGPT"
    item 2024 "Multimodal AI"
  style
    layout horizontal
    theme tech-dark
    color-scheme blue-gradient`,
  },
];
