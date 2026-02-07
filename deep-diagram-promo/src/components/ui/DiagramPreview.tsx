import React from 'react';
import type { AgentKey } from '../../config/colors';
import { agentColors, theme } from '../../config/colors';
import { fonts } from '../../config/typography';
import { easeOutCubic, easeOutBack, clamp } from '../../utils/easing';

type ColorSet = { primary: string; light: string; dark: string; bg: string; gradient: string };

interface DiagramPreviewProps {
  agentKey: AgentKey;
  progress: number;
}

const diagramComponents: Record<AgentKey, React.FC<{ progress: number; color: ColorSet }>> = {
  mindmap: MindMapDiagram,
  flowchart: FlowchartDiagram,
  charts: ChartsDiagram,
  drawio: DrawioDiagram,
  mermaid: MermaidDiagram,
  infographic: InfographicDiagram,
};

export const DiagramPreview: React.FC<DiagramPreviewProps> = ({ agentKey, progress }) => {
  const colors: ColorSet = agentColors[agentKey];
  const Component = diagramComponents[agentKey];
  return <Component progress={progress} color={colors} />;
};

// ═══════════════════════════════════════════════════
// MIND MAP (mind-elixir style with curved branches)
// ═══════════════════════════════════════════════════

interface Branch {
  label: string;
  color: string;
  x: number;
  y: number;
  subs: { label: string; x: number; y: number; leaves?: { label: string; x: number; y: number }[] }[];
}

function MindMapDiagram({ progress: p }: { progress: number; color: ColorSet }) {
  const cx = 520, cy = 400;

  // Right-side branches (compacted)
  const rightBranches: Branch[] = [
    {
      label: 'Supervised Learning', color: '#E8846B', x: 720, y: 160,
      subs: [
        { label: 'Classification', x: 860, y: 115, leaves: [{ label: 'SVM, Random Forest', x: 970, y: 115 }] },
        { label: 'Regression', x: 860, y: 160, leaves: [{ label: 'Linear, Polynomial', x: 970, y: 160 }] },
        { label: 'Evaluation', x: 860, y: 205, leaves: [{ label: 'Accuracy, F1, AUC', x: 970, y: 205 }] },
      ],
    },
    {
      label: 'Deep Learning', color: '#4A9BD9', x: 720, y: 390,
      subs: [
        { label: 'CNN', x: 860, y: 325, leaves: [{ label: 'Image, Detection', x: 960, y: 325 }] },
        { label: 'RNN / LSTM', x: 860, y: 370, leaves: [{ label: 'Sequence, NLP', x: 960, y: 370 }] },
        { label: 'Transformer', x: 860, y: 415, leaves: [{ label: 'BERT, GPT', x: 960, y: 415 }] },
        { label: 'Generative', x: 860, y: 460, leaves: [{ label: 'GANs, Diffusion', x: 960, y: 460 }] },
      ],
    },
    {
      label: 'Reinforcement Learning', color: '#5CB85C', x: 720, y: 620,
      subs: [
        { label: 'Value-Based', x: 860, y: 575, leaves: [{ label: 'DQN, Double DQN', x: 970, y: 575 }] },
        { label: 'Policy Gradient', x: 860, y: 620, leaves: [{ label: 'PPO, A3C', x: 970, y: 620 }] },
        { label: 'Applications', x: 860, y: 665, leaves: [{ label: 'Game AI, Robotics', x: 970, y: 665 }] },
      ],
    },
  ];

  // Left-side branches (compacted)
  const leftBranches: Branch[] = [
    {
      label: 'Unsupervised Learning', color: '#9B6BCD', x: 320, y: 160,
      subs: [
        { label: 'Clustering', x: 175, y: 115, leaves: [{ label: 'K-Means, DBSCAN', x: 65, y: 115 }] },
        { label: 'Dim. Reduction', x: 175, y: 160, leaves: [{ label: 'PCA, t-SNE', x: 65, y: 160 }] },
        { label: 'Anomaly Detect.', x: 175, y: 205, leaves: [{ label: 'Isolation Forest', x: 65, y: 205 }] },
      ],
    },
    {
      label: 'Feature Engineering', color: '#E57373', x: 320, y: 390,
      subs: [
        { label: 'Selection', x: 175, y: 345, leaves: [{ label: 'Filter, Wrapper', x: 65, y: 345 }] },
        { label: 'Scaling', x: 175, y: 390, leaves: [{ label: 'Norm, Standard.', x: 65, y: 390 }] },
        { label: 'Creation', x: 175, y: 435, leaves: [{ label: 'Polynomial, Cross', x: 65, y: 435 }] },
      ],
    },
    {
      label: 'Model Evaluation', color: '#26A69A', x: 320, y: 620,
      subs: [
        { label: 'Cross-Validation', x: 175, y: 575, leaves: [{ label: 'K-Fold, Stratified', x: 65, y: 575 }] },
        { label: 'Hyperparam Tuning', x: 175, y: 620, leaves: [{ label: 'Grid, Bayesian', x: 65, y: 620 }] },
        { label: 'Bias-Variance', x: 175, y: 665 },
      ],
    },
  ];

  const allBranches = [...rightBranches, ...leftBranches];

  return (
    <svg width={1200} height={840} viewBox="0 0 1050 800">
      {/* Center node */}
      {(() => {
        const np = easeOutBack(clamp(p * 3, 0, 1));
        return (
          <g opacity={np} transform={`translate(${cx},${cy}) scale(${np})`}>
            <rect x={-115} y={-22} width={230} height={44} rx={22} fill="#F59E0B" />
            <text x={0} y={6} textAnchor="middle" fill="#fff" fontFamily={fonts.heading} fontWeight={700} fontSize={15}>
              Machine Learning
            </text>
          </g>
        );
      })()}

      {/* Branches */}
      {allBranches.map((branch, bi) => {
        const isRight = branch.x > cx;
        const branchDelay = 0.08 + bi * 0.06;
        const bp = easeOutCubic(clamp(p * 2.5 - branchDelay, 0, 1));

        return (
          <g key={bi} opacity={bp}>
            {/* Main branch curve */}
            <CurvedLine
              x1={cx + (isRight ? 115 : -115)} y1={cy}
              x2={branch.x} y2={branch.y}
              color={branch.color} width={3} progress={bp}
            />
            {/* Branch label with colored underline */}
            <g transform={`translate(${branch.x},${branch.y})`}>
              <text
                x={0} y={4}
                textAnchor={isRight ? 'start' : 'end'}
                fill={branch.color}
                fontFamily={fonts.heading}
                fontWeight={600}
                fontSize={13}
              >
                {branch.label}
              </text>
              <line
                x1={isRight ? 0 : -branch.label.length * 7}
                y1={9}
                x2={isRight ? branch.label.length * 7 : 0}
                y2={9}
                stroke={branch.color}
                strokeWidth={2.5}
                opacity={0.7}
              />
            </g>

            {/* Sub-branches */}
            {branch.subs.map((sub, si) => {
              const subDelay = branchDelay + 0.08 + si * 0.04;
              const sp = easeOutCubic(clamp(p * 2.5 - subDelay, 0, 1));

              return (
                <g key={si} opacity={sp}>
                  <CurvedLine
                    x1={branch.x + (isRight ? branch.label.length * 3.5 : -branch.label.length * 3.5)}
                    y1={branch.y}
                    x2={sub.x} y2={sub.y}
                    color={branch.color} width={1.8} progress={sp}
                  />
                  <text
                    x={sub.x} y={sub.y + 4}
                    textAnchor={isRight ? 'start' : 'end'}
                    fill="#D1D5DB"
                    fontFamily={fonts.body}
                    fontWeight={500}
                    fontSize={11}
                  >
                    {sub.label}
                  </text>

                  {/* Leaf nodes */}
                  {sub.leaves?.map((leaf, li) => {
                    const lp = easeOutCubic(clamp(p * 2.5 - subDelay - 0.06 - li * 0.03, 0, 1));
                    return (
                      <g key={li} opacity={lp}>
                        <CurvedLine
                          x1={sub.x + (isRight ? sub.label.length * 3 : -sub.label.length * 3)}
                          y1={sub.y}
                          x2={leaf.x} y2={leaf.y}
                          color={branch.color} width={1} progress={lp}
                        />
                        <text
                          x={leaf.x} y={leaf.y + 4}
                          textAnchor={isRight ? 'start' : 'end'}
                          fill="#9CA3AF"
                          fontFamily={fonts.body}
                          fontSize={9}
                        >
                          {leaf.label}
                        </text>
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

// Curved connection line (mind-elixir style cubic bezier)
const CurvedLine: React.FC<{
  x1: number; y1: number; x2: number; y2: number;
  color: string; width: number; progress: number;
}> = ({ x1, y1, x2, y2, color, width, progress: p }) => {
  const dx = (x2 - x1) * 0.5;
  const d = `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`;
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      opacity={p * 0.6}
      strokeLinecap="round"
    />
  );
};

// ═══════════════════════════════════════════════════
// FLOWCHART
// ═══════════════════════════════════════════════════

function FlowchartDiagram({ progress: p, color }: { progress: number; color: ColorSet }) {
  const nodes = [
    { x: 400, y: 60, w: 140, h: 44, label: 'Start', type: 'round' as const },
    { x: 400, y: 150, w: 160, h: 44, label: 'Enter Details', type: 'rect' as const },
    { x: 400, y: 250, w: 140, h: 50, label: 'Valid Input?', type: 'diamond' as const },
    { x: 620, y: 250, w: 120, h: 40, label: 'Show Error', type: 'rect' as const },
    { x: 400, y: 360, w: 160, h: 44, label: 'Send Email', type: 'rect' as const },
    { x: 400, y: 460, w: 140, h: 50, label: 'Verified?', type: 'diamond' as const },
    { x: 620, y: 460, w: 120, h: 40, label: 'Resend', type: 'rect' as const },
    { x: 400, y: 560, w: 160, h: 44, label: 'Create Account', type: 'rect' as const },
    { x: 400, y: 660, w: 140, h: 44, label: 'Done', type: 'round' as const },
  ];

  const edges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [2, 4], [4, 5], [5, 6], [5, 7], [7, 8],
  ];

  return (
    <svg width={1120} height={840} viewBox="0 0 800 740">
      {edges.map(([from, to], i) => {
        const ep = easeOutCubic(clamp(p * 1.8 - i * 0.08, 0, 1));
        const f = nodes[from];
        const t = nodes[to];
        const isHoriz = f.y === t.y;
        return (
          <g key={`e-${i}`} opacity={ep}>
            <line
              x1={f.x} y1={f.y + f.h / 2}
              x2={isHoriz ? f.x + (t.x - f.x) * ep : f.x}
              y2={isHoriz ? t.y : f.y + f.h / 2 + (t.y - f.y - f.h / 2 - t.h / 2 + t.h / 2) * ep}
              stroke={color.primary} strokeWidth={2} opacity={0.5}
            />
          </g>
        );
      })}

      {nodes.map((node, i) => {
        const np = easeOutBack(clamp(p * 2 - i * 0.12, 0, 1));
        const isTerminal = i === 0 || i === nodes.length - 1;
        return (
          <g key={i} opacity={np} transform={`translate(${node.x}, ${node.y}) scale(${np})`}>
            {node.type === 'diamond' ? (
              <polygon
                points={`0,${-node.h / 2} ${node.w / 2},0 0,${node.h / 2} ${-node.w / 2},0`}
                fill={`${color.primary}20`} stroke={color.primary} strokeWidth={2}
              />
            ) : (
              <rect
                x={-node.w / 2} y={-node.h / 2} width={node.w} height={node.h}
                rx={node.type === 'round' ? node.h / 2 : 8}
                fill={isTerminal ? color.primary : `${color.primary}15`}
                stroke={color.primary} strokeWidth={isTerminal ? 0 : 2}
              />
            )}
            <text x={0} y={5} textAnchor="middle" fill={isTerminal ? '#fff' : color.light} fontFamily={fonts.body} fontWeight={500} fontSize={13}>
              {node.label}
            </text>
          </g>
        );
      })}

      <text x={430} y={310} fill={color.light} fontFamily={fonts.mono} fontSize={11} opacity={easeOutCubic(clamp(p * 2 - 0.4, 0, 1))}>Yes</text>
      <text x={540} y={245} fill={color.light} fontFamily={fonts.mono} fontSize={11} opacity={easeOutCubic(clamp(p * 2 - 0.4, 0, 1))}>No</text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════
// BAR CHART
// ═══════════════════════════════════════════════════

function ChartsDiagram({ progress: p }: { progress: number; color: ColorSet }) {
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  const regions = [
    { name: 'N. America', color: '#F43F5E' },
    { name: 'Europe', color: '#8B5CF6' },
    { name: 'Asia Pacific', color: '#3B82F6' },
  ];
  const data = [[85, 70, 55], [90, 80, 65], [78, 85, 75], [95, 90, 88]];

  const chartLeft = 120, chartBottom = 620, chartWidth = 700, chartHeight = 450;
  const barWidth = 40, groupGap = 50;
  const groupWidth = regions.length * barWidth + groupGap;

  return (
    <svg width={1120} height={840} viewBox="0 0 960 740">
      <text x={480} y={60} textAnchor="middle" fill={theme.text} fontFamily={fonts.heading} fontWeight={600} fontSize={20} opacity={easeOutCubic(clamp(p * 3, 0, 1))}>
        Quarterly Sales by Region — 2024
      </text>

      <line x1={chartLeft} y1={chartBottom - chartHeight} x2={chartLeft} y2={chartBottom} stroke={theme.border} strokeWidth={1} />
      {[0, 25, 50, 75, 100].map((v, i) => {
        const y = chartBottom - (v / 100) * chartHeight;
        return (
          <g key={i} opacity={easeOutCubic(clamp(p * 2, 0, 1))}>
            <line x1={chartLeft - 5} y1={y} x2={chartLeft + chartWidth} y2={y} stroke={theme.border} strokeWidth={0.5} strokeDasharray="4,4" />
            <text x={chartLeft - 12} y={y + 4} textAnchor="end" fill={theme.textMuted} fontFamily={fonts.mono} fontSize={12}>{v}K</text>
          </g>
        );
      })}
      <line x1={chartLeft} y1={chartBottom} x2={chartLeft + chartWidth} y2={chartBottom} stroke={theme.border} strokeWidth={1} />

      {quarters.map((q, qi) => {
        const groupX = chartLeft + 60 + qi * (groupWidth + 20);
        return (
          <g key={qi}>
            <text x={groupX + groupWidth / 2 - groupGap / 2} y={chartBottom + 30} textAnchor="middle" fill={theme.textSecondary} fontFamily={fonts.body} fontWeight={500} fontSize={14} opacity={easeOutCubic(clamp(p * 2, 0, 1))}>{q}</text>
            {regions.map((region, ri) => {
              const barHeight = (data[qi][ri] / 100) * chartHeight;
              const barP = easeOutCubic(clamp(p * 2.5 - qi * 0.2 - ri * 0.1, 0, 1));
              return (
                <rect key={ri} x={groupX + ri * barWidth} y={chartBottom - barHeight * barP} width={barWidth - 4} height={barHeight * barP} rx={4} fill={region.color} opacity={0.85} />
              );
            })}
          </g>
        );
      })}

      {regions.map((region, i) => (
        <g key={i} opacity={easeOutCubic(clamp(p * 2 - 0.5, 0, 1))} transform={`translate(${300 + i * 180}, 690)`}>
          <rect x={0} y={0} width={14} height={14} rx={3} fill={region.color} />
          <text x={20} y={12} fill={theme.textSecondary} fontFamily={fonts.body} fontSize={13}>{region.name}</text>
        </g>
      ))}
    </svg>
  );
}

// ═══════════════════════════════════════════════════
// ARCHITECTURE (Draw.io style)
// ═══════════════════════════════════════════════════

function DrawioDiagram({ progress: p, color }: { progress: number; color: ColorSet }) {
  const nodes = [
    { x: 440, y: 80, w: 180, h: 55, label: 'API Gateway', sub: 'AWS API GW', fill: '#FF9900', icon: '🌐' },
    { x: 180, y: 260, w: 160, h: 50, label: 'User Service', sub: 'ECS Fargate', fill: color.primary, icon: '👤' },
    { x: 440, y: 260, w: 160, h: 50, label: 'Order Service', sub: 'ECS Fargate', fill: color.primary, icon: '📦' },
    { x: 700, y: 260, w: 160, h: 50, label: 'Payment Service', sub: 'Lambda', fill: color.primary, icon: '💳' },
    { x: 180, y: 420, w: 140, h: 45, label: 'PostgreSQL', sub: 'RDS', fill: '#2563EB', icon: '🗄️' },
    { x: 440, y: 420, w: 140, h: 45, label: 'DynamoDB', sub: '', fill: '#2563EB', icon: '📊' },
    { x: 700, y: 420, w: 140, h: 45, label: 'Redis Cache', sub: 'ElastiCache', fill: '#DC2626', icon: '⚡' },
    { x: 440, y: 560, w: 180, h: 50, label: 'Message Queue', sub: 'SQS / SNS', fill: '#7C3AED', icon: '📨' },
  ];

  const edges: [number, number][] = [[0, 1], [0, 2], [0, 3], [1, 4], [2, 5], [3, 6], [1, 7], [2, 7], [3, 7]];

  return (
    <svg width={1120} height={840} viewBox="0 0 960 660">
      {edges.map(([from, to], i) => {
        const f = nodes[from]; const t = nodes[to];
        const ep = easeOutCubic(clamp(p * 2 - 0.3 - i * 0.05, 0, 1));
        return (
          <line key={`e-${i}`} x1={f.x} y1={f.y + f.h / 2} x2={f.x + (t.x - f.x) * ep} y2={f.y + f.h / 2 + (t.y - f.y) * ep} stroke={theme.border} strokeWidth={1.5} strokeDasharray="6,4" opacity={ep * 0.6} />
        );
      })}

      {nodes.map((node, i) => {
        const np = easeOutBack(clamp(p * 2.2 - i * 0.1, 0, 1));
        return (
          <g key={i} opacity={np} transform={`translate(${node.x}, ${node.y}) scale(${np})`}>
            <rect x={-node.w / 2} y={-node.h / 2} width={node.w} height={node.h} rx={10} fill={`${node.fill}18`} stroke={node.fill} strokeWidth={1.5} />
            <text x={-node.w / 2 + 36} y={node.sub ? -2 : 5} fill={theme.text} fontFamily={fonts.heading} fontWeight={600} fontSize={13}>{node.label}</text>
            {node.sub && <text x={-node.w / 2 + 36} y={16} fill={theme.textMuted} fontFamily={fonts.body} fontSize={10}>{node.sub}</text>}
            <text x={-node.w / 2 + 16} y={node.sub ? 6 : 8} fontSize={16} textAnchor="middle">{node.icon}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ═══════════════════════════════════════════════════
// MERMAID SEQUENCE DIAGRAM (detailed OAuth 2.0)
// ═══════════════════════════════════════════════════

function MermaidDiagram({ progress: p, color }: { progress: number; color: ColorSet }) {
  const lx = [95, 310, 560, 810];
  const labels = ['Resource Owner', 'Client Application\n(Web/Mobile)', 'Authorization Server\n(IdP)', 'Resource Server\n(API)'];

  return (
    <svg width={940} height={820} viewBox="0 0 940 780" style={{ transform: 'scale(0.95)', transformOrigin: 'top center' }}>
      {/* Title */}
      <text x={470} y={25} textAnchor="middle" fill="#9CA3AF" fontFamily={fonts.body} fontWeight={500} fontSize={12} opacity={easeOutCubic(clamp(p * 4, 0, 1))}>
        OAuth 2.0 Distributed Authentication Flow (Authorization Code Grant)
      </text>

      {/* Lifeline headers */}
      {lx.map((x, i) => {
        const hp = easeOutBack(clamp(p * 4 - i * 0.08, 0, 1));
        const isActor = i === 0;
        return (
          <g key={`h-${i}`} opacity={hp}>
            {isActor ? (
              <>
                <circle cx={x} cy={55} r={10} stroke="#6B7280" strokeWidth={1.3} fill="none" />
                <line x1={x} y1={65} x2={x} y2={82} stroke="#6B7280" strokeWidth={1.3} />
                <line x1={x - 8} y1={72} x2={x + 8} y2={72} stroke="#6B7280" strokeWidth={1.3} />
                <line x1={x} y1={82} x2={x - 7} y2={94} stroke="#6B7280" strokeWidth={1.3} />
                <line x1={x} y1={82} x2={x + 7} y2={94} stroke="#6B7280" strokeWidth={1.3} />
              </>
            ) : (
              <rect x={x - 75} y={46} width={150} height={36} rx={4} fill="#1a1d27" stroke="#3a3f52" strokeWidth={1} />
            )}
            {labels[i].split('\n').map((line, li) => (
              <text key={li} x={x} y={isActor ? 108 + li * 13 : 62 + li * 13} textAnchor="middle" fill="#D1D5DB" fontFamily={fonts.body} fontWeight={500} fontSize={10}>{line}</text>
            ))}
          </g>
        );
      })}

      {/* Lifelines */}
      {lx.map((x, i) => (
        <line key={`l-${i}`} x1={x} y1={i === 0 ? 122 : 86} x2={x} y2={700} stroke="#3a3f52" strokeWidth={1} strokeDasharray="4,4" opacity={easeOutCubic(clamp(p * 3, 0, 1)) * 0.5} />
      ))}

      {/* Phase 1 */}
      <PhaseBar y={132} label="Phase 1: User Authorization" p={clamp(p * 3.5 - 0.15, 0, 1)} />
      <SeqMsg from={0} to={1} y={162} label='Click "Login with OAuth"' n={1} p={clamp(p * 3 - 0.2, 0, 1)} lx={lx} />
      <SeqMsg from={1} to={2} y={192} label="GET /authorize?response_type=code&client_id=ID&scope=read" n={2} p={clamp(p * 3 - 0.28, 0, 1)} lx={lx} />
      <SeqMsg from={2} to={0} y={222} label="Prompt for Credentials & Consent" n={3} p={clamp(p * 3 - 0.36, 0, 1)} lx={lx} dashed />
      <SeqMsg from={0} to={2} y={252} label="Submit Credentials" n={4} p={clamp(p * 3 - 0.42, 0, 1)} lx={lx} />
      <SeqMsg from={2} to={1} y={282} label="302 Redirect to CALLBACK with ?code=AUTH_CODE" n={5} p={clamp(p * 3 - 0.48, 0, 1)} lx={lx} dashed />

      {/* Phase 2 */}
      <PhaseBar y={312} label="Phase 2: Token Exchange (Server-to-Server)" p={clamp(p * 3 - 0.55, 0, 1)} />
      <SeqMsg from={1} to={2} y={344} label="POST /token (grant_type=authorization_code, code=AUTH_CODE)" n={6} p={clamp(p * 3 - 0.6, 0, 1)} lx={lx} />
      <NoteBox x={690} y={352} label="Validate Code & Client Secret" p={clamp(p * 3 - 0.65, 0, 1)} />
      <SeqMsg from={2} to={1} y={386} label='200 OK {access_token: "JWT", refresh_token: "REF_123"}' n={7} p={clamp(p * 3 - 0.7, 0, 1)} lx={lx} dashed />

      {/* Phase 3 */}
      <PhaseBar y={418} label="Phase 3: Resource Access" p={clamp(p * 3 - 0.75, 0, 1)} />
      <SeqMsg from={1} to={3} y={450} label="GET /api/v1/data (Authorization: Bearer ACCESS_TOKEN)" n={8} p={clamp(p * 3 - 0.8, 0, 1)} lx={lx} />
      <NoteBox x={690} y={470} label="Distributed Validation (Introspection)" p={clamp(p * 3 - 0.82, 0, 1)} />
      <SeqMsg from={3} to={2} y={498} label="POST /introspect?token=ACCESS_TOKEN" n={9} p={clamp(p * 3 - 0.84, 0, 1)} lx={lx} />
      <SeqMsg from={2} to={3} y={528} label='200 OK {active: true, scope: "read", sub: "user_123"}' n={10} p={clamp(p * 3 - 0.88, 0, 1)} lx={lx} dashed />
      <NoteBox x={870} y={538} label="Apply RBAC Policy Check" p={clamp(p * 3 - 0.9, 0, 1)} />
      <SeqMsg from={3} to={1} y={572} label='200 OK {data: "Protected Resource Content"}' n={11} p={clamp(p * 3 - 0.93, 0, 1)} lx={lx} dashed />

      {/* Flow Complete */}
      <g opacity={easeOutCubic(clamp(p * 3 - 0.96, 0, 1))}>
        <rect x={70} y={604} width={800} height={28} rx={4} fill="#10B981" opacity={0.9} />
        <text x={470} y={622} textAnchor="middle" fill="#fff" fontFamily={fonts.body} fontWeight={600} fontSize={11}>Flow Complete - Session Established</text>
      </g>

      {/* Footer lifeline labels */}
      {lx.map((x, i) => {
        const fp = easeOutCubic(clamp(p * 3 - 0.96, 0, 1));
        return (
          <g key={`f-${i}`} opacity={fp}>
            {i === 0 ? (
              <circle cx={x} cy={660} r={10} stroke="#6B7280" strokeWidth={1.3} fill="none" />
            ) : (
              <rect x={x - 75} y={650} width={150} height={28} rx={4} fill="#1a1d27" stroke="#3a3f52" strokeWidth={1} />
            )}
            <text x={x} y={i === 0 ? 685 : 668} textAnchor="middle" fill="#D1D5DB" fontFamily={fonts.body} fontWeight={500} fontSize={10}>{labels[i].split('\n')[0]}</text>
          </g>
        );
      })}
    </svg>
  );
}

// Mermaid sub-components
const PhaseBar: React.FC<{ y: number; label: string; p: number }> = ({ y, label, p }) => (
  <g opacity={easeOutCubic(clamp(p, 0, 1))}>
    <rect x={70} y={y} width={620} height={24} rx={4} fill="#EAB308" opacity={0.85} />
    <text x={380} y={y + 16} textAnchor="middle" fill="#1a1d27" fontFamily={fonts.body} fontWeight={600} fontSize={10}>{label}</text>
  </g>
);

const SeqMsg: React.FC<{
  from: number; to: number; y: number; label: string; n: number;
  p: number; lx: number[]; dashed?: boolean;
}> = ({ from, to, y, label, n, p: rawP, lx, dashed }) => {
  const mp = easeOutCubic(clamp(rawP, 0, 1));
  const x1 = lx[from]; const x2 = lx[to];
  const dir = x2 > x1 ? 1 : -1;
  const display = label.length > 55 ? label.slice(0, 55) + '...' : label;

  return (
    <g opacity={mp}>
      <circle cx={x1 + dir * -12} cy={y} r={8} fill="#EAB308" opacity={0.9} />
      <text x={x1 + dir * -12} y={y + 3.5} textAnchor="middle" fill="#1a1d27" fontFamily={fonts.mono} fontWeight={700} fontSize={7}>{n}</text>
      <line x1={x1} y1={y} x2={x1 + (x2 - x1) * mp} y2={y} stroke={dashed ? '#6B7280' : '#D1D5DB'} strokeWidth={1.2} strokeDasharray={dashed ? '6,3' : 'none'} />
      {mp > 0.85 && (
        <polygon
          points={dir > 0 ? `${x2},${y} ${x2 - 6},${y - 3} ${x2 - 6},${y + 3}` : `${x2},${y} ${x2 + 6},${y - 3} ${x2 + 6},${y + 3}`}
          fill={dashed ? '#6B7280' : '#D1D5DB'}
        />
      )}
      <text x={(x1 + x2) / 2} y={y - 7} textAnchor="middle" fill="#9CA3AF" fontFamily={fonts.mono} fontSize={8}>{display}</text>
    </g>
  );
};

const NoteBox: React.FC<{ x: number; y: number; label: string; p: number }> = ({ x, y, label, p }) => (
  <g opacity={easeOutCubic(clamp(p, 0, 1))} transform={`translate(${x},${y})`}>
    <rect x={-70} y={-11} width={140} height={22} rx={4} fill="#EAB30815" stroke="#EAB30840" strokeWidth={1} />
    <text x={0} y={3} textAnchor="middle" fill="#EAB308" fontFamily={fonts.body} fontSize={8} fontWeight={500}>{label}</text>
  </g>
);

// ═══════════════════════════════════════════════════
// TIMELINE INFOGRAPHIC
// ═══════════════════════════════════════════════════

function InfographicDiagram({ progress: p, color }: { progress: number; color: ColorSet }) {
  const milestones = [
    { year: '1950', title: 'Turing Test', desc: 'Alan Turing proposes\nmachine intelligence' },
    { year: '1997', title: 'Deep Blue', desc: 'IBM defeats chess\nworld champion' },
    { year: '2011', title: 'Watson', desc: 'IBM Watson wins\nJeopardy!' },
    { year: '2016', title: 'AlphaGo', desc: 'DeepMind beats Go\nworld champion' },
    { year: '2022', title: 'ChatGPT', desc: 'OpenAI launches\nconversational AI' },
    { year: '2024', title: 'Multimodal', desc: 'AI agents across\nall modalities' },
  ];

  const lineY = 400, startX = 100, gap = 150;

  return (
    <svg width={1120} height={840} viewBox="0 0 1060 740">
      <text x={530} y={70} textAnchor="middle" fill={theme.text} fontFamily={fonts.heading} fontWeight={700} fontSize={24} opacity={easeOutCubic(clamp(p * 3, 0, 1))}>
        The Evolution of AI
      </text>

      <line x1={startX} y1={lineY} x2={startX + (milestones.length - 1) * gap * easeOutCubic(clamp(p * 1.5, 0, 1))} y2={lineY} stroke={color.primary} strokeWidth={3} opacity={0.4} />

      {milestones.map((ms, i) => {
        const x = startX + i * gap;
        const mp = easeOutBack(clamp(p * 2.2 - i * 0.15, 0, 1));
        const isTop = i % 2 === 0;
        const cardY = isTop ? lineY - 170 : lineY + 50;

        return (
          <g key={i} opacity={mp}>
            <circle cx={x} cy={lineY} r={8 * mp} fill={color.primary} />
            <circle cx={x} cy={lineY} r={4 * mp} fill={theme.bg} />
            <line x1={x} y1={lineY + (isTop ? -12 : 12)} x2={x} y2={lineY + (isTop ? -12 : 12) + (cardY - lineY + (isTop ? 120 : -10)) * mp} stroke={color.primary} strokeWidth={1.5} opacity={0.4} />
            <g transform={`translate(${x}, ${cardY}) scale(${mp})`}>
              <rect x={-60} y={0} width={120} height={110} rx={12} fill={`${color.primary}12`} stroke={color.primary} strokeWidth={1} />
              <text x={0} y={28} textAnchor="middle" fill={color.primary} fontFamily={fonts.heading} fontWeight={700} fontSize={18}>{ms.year}</text>
              <text x={0} y={50} textAnchor="middle" fill={theme.text} fontFamily={fonts.heading} fontWeight={600} fontSize={13}>{ms.title}</text>
              {ms.desc.split('\n').map((line, li) => (
                <text key={li} x={0} y={68 + li * 16} textAnchor="middle" fill={theme.textMuted} fontFamily={fonts.body} fontSize={10}>{line}</text>
              ))}
            </g>
          </g>
        );
      })}
    </svg>
  );
}
