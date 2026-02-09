import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../../config/colors';
import {FONTS} from '../../config/typography';
import {L} from '../../config/i18n';
import {useLanguage} from '../../contexts/LanguageContext';
import {easeOutCubic} from '../../utils/easing';
import {ParticleField} from '../../components/effects/ParticleField';
import {AnimatedHeadline} from '../../components/text/AnimatedHeadline';

// ─── Layout Grid ───
const COL_X = [500, 960, 1420];
const ROW_Y = [230, 460, 690];
const CARD_W = 230;
const CARD_H = 68;
const PANEL_X = 220;
const PANEL_W = 1480;
const PANEL_H = CARD_H + 48;

// ─── Architecture Nodes ───
interface ArchNode {
  id: string;
  label: string;
  sub?: string;
  col: number;
  row: number;
  color: string;
  abbr: string;
}

const ARCH_NODES: ArchNode[] = [
  // Layer 1 — Presentation
  {id: 'user', label: 'User', col: 0, row: 0, color: COLORS.purple, abbr: 'U'},
  {id: 'chatui', label: 'Chat UI', sub: 'React · Next.js · shadcn/ui', col: 1, row: 0, color: COLORS.blue, abbr: 'C'},
  // Layer 2 — Service
  {id: 'ai', label: 'AI Engine', sub: 'Vercel AI SDK', col: 0, row: 1, color: COLORS.green, abbr: 'AI'},
  {id: 'router', label: 'Skill Router', sub: '技能解析 · 调度', col: 1, row: 1, color: COLORS.amber, abbr: 'R'},
  {id: 'registry', label: 'Skill Registry', sub: '~/.claude/skills', col: 2, row: 1, color: COLORS.cyan, abbr: 'P'},
  // Layer 3 — Infrastructure
  {id: 'openai', label: 'OpenAI API', sub: 'LLM · Streaming', col: 0, row: 2, color: COLORS.green, abbr: 'O'},
  {id: 'executor', label: 'Sandbox', sub: 'Python · Node · Bash', col: 1, row: 2, color: COLORS.amber, abbr: 'E'},
  {id: 'storage', label: 'Storage', sub: 'SQLite · PostgreSQL', col: 2, row: 2, color: COLORS.blue, abbr: 'D'},
];

const nodePos = (id: string) => {
  const n = ARCH_NODES.find((nd) => nd.id === id)!;
  return {x: COL_X[n.col], y: ROW_Y[n.row]};
};

// ─── Connections ───
interface Conn {
  from: string;
  to: string;
  bidir?: boolean;
}

const CONNS: Conn[] = [
  {from: 'user', to: 'chatui'},
  {from: 'chatui', to: 'ai'},
  {from: 'chatui', to: 'router'},
  {from: 'ai', to: 'router', bidir: true},
  {from: 'router', to: 'registry'},
  {from: 'ai', to: 'openai'},
  {from: 'router', to: 'executor'},
  {from: 'registry', to: 'storage'},
];

// ─── Layer Panels ───
const LAYERS = [
  {label: '表现层', en: 'Presentation', row: 0, color: COLORS.blue},
  {label: '服务层', en: 'Service', row: 1, color: COLORS.green},
  {label: '基础层', en: 'Infrastructure', row: 2, color: COLORS.amber},
];

// ─── Endpoint calculation ───
const getEndpoints = (fromId: string, toId: string) => {
  const f = nodePos(fromId);
  const t = nodePos(toId);
  const fn = ARCH_NODES.find((n) => n.id === fromId)!;
  const tn = ARCH_NODES.find((n) => n.id === toId)!;
  if (fn.row === tn.row) {
    // Same row — horizontal
    const goRight = f.x < t.x;
    return {
      x1: f.x + (goRight ? CARD_W / 2 : -CARD_W / 2),
      y1: f.y,
      x2: t.x + (goRight ? -CARD_W / 2 : CARD_W / 2),
      y2: t.y,
    };
  }
  // Cross-row — vertical / diagonal
  const goDown = f.y < t.y;
  return {
    x1: f.x,
    y1: f.y + (goDown ? CARD_H / 2 : -CARD_H / 2),
    x2: t.x,
    y2: t.y + (goDown ? -CARD_H / 2 : CARD_H / 2),
  };
};

// ═══════════════════════════════════════════
//  Sub-Components
// ═══════════════════════════════════════════

// ── Layer Panel ──
const LayerPanel: React.FC<{
  row: number;
  label: string;
  en: string;
  color: string;
  enterFrame: number;
}> = ({row, label, en, color, enterFrame}) => {
  const frame = useCurrentFrame();
  const e = frame - enterFrame;
  const opacity = interpolate(e, [0, 15], [0, 1], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const slideX = interpolate(e, [0, 15], [-40, 0], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const py = ROW_Y[row] - PANEL_H / 2;

  return (
    <div
      style={{
        position: 'absolute',
        left: PANEL_X + slideX,
        top: py,
        width: PANEL_W,
        height: PANEL_H,
        background: `linear-gradient(135deg, ${color}0A, ${color}04)`,
        border: `1px solid ${color}18`,
        borderRadius: 16,
        opacity,
      }}
    >
      {/* Layer label */}
      <div
        style={{
          position: 'absolute',
          left: 18,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.cn,
            fontSize: 14,
            fontWeight: 700,
            color,
            letterSpacing: 1,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 10,
            color: `${color}90`,
            letterSpacing: 0.5,
          }}
        >
          {en}
        </span>
      </div>
    </div>
  );
};

// ── Node Card ──
const NodeCard: React.FC<{node: ArchNode; enterFrame: number}> = ({
  node,
  enterFrame,
}) => {
  const frame = useCurrentFrame();
  const e = frame - enterFrame;
  const opacity = interpolate(e, [0, 12], [0, 1], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(e, [0, 12], [0.82, 1], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Subtle pulse glow for AI Engine (the central brain)
  const isCenter = node.id === 'ai';
  const pulse = isCenter
    ? 0.5 + 0.5 * Math.sin((frame / 30) * Math.PI * 2 * 0.4)
    : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: COL_X[node.col] - CARD_W / 2,
        top: ROW_Y[node.row] - CARD_H / 2,
        width: CARD_W,
        height: CARD_H,
        background: COLORS.bgSecondary,
        borderRadius: 12,
        border: `1px solid ${node.color}35`,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '0 14px',
        opacity,
        transform: `scale(${scale})`,
        boxShadow: isCenter
          ? `0 0 ${24 + pulse * 14}px ${node.color}${Math.round(20 + pulse * 12).toString(16)}, inset 0 1px 0 rgba(255,255,255,0.05)`
          : `0 0 20px ${node.color}12, inset 0 1px 0 rgba(255,255,255,0.04)`,
      }}
    >
      {/* Icon circle */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: `${node.color}18`,
          border: `1.5px solid ${node.color}50`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: node.abbr.length > 1 ? 11 : 14,
            fontWeight: 700,
            color: node.color,
          }}
        >
          {node.abbr}
        </span>
      </div>
      {/* Text */}
      <div style={{display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0}}>
        <span
          style={{
            fontFamily: FONTS.heading,
            fontSize: 14,
            fontWeight: 600,
            color: COLORS.textPrimary,
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
          }}
        >
          {node.label}
        </span>
        {node.sub && (
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 9,
              color: COLORS.textMuted,
              lineHeight: 1.2,
              whiteSpace: 'nowrap',
            }}
          >
            {node.sub}
          </span>
        )}
      </div>
    </div>
  );
};

// ── Cubic bezier helper ──
const bezierPoint = (
  t: number,
  x1: number,
  y1: number,
  cx1: number,
  cy1: number,
  cx2: number,
  cy2: number,
  x2: number,
  y2: number,
) => ({
  x:
    (1 - t) ** 3 * x1 +
    3 * (1 - t) ** 2 * t * cx1 +
    3 * (1 - t) * t ** 2 * cx2 +
    t ** 3 * x2,
  y:
    (1 - t) ** 3 * y1 +
    3 * (1 - t) ** 2 * t * cy1 +
    3 * (1 - t) * t ** 2 * cy2 +
    t ** 3 * y2,
});

// ── SVG Connection + Data Flow ──
const ConnSvg: React.FC<{
  conn: Conn;
  idx: number;
  enterFrame: number;
  frame: number;
}> = ({conn, idx, enterFrame, frame}) => {
  const e = frame - enterFrame;
  const progress = interpolate(e, [0, 16], [0, 1], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  if (progress <= 0) return null;

  const {x1, y1, x2, y2} = getEndpoints(conn.from, conn.to);
  const fn = ARCH_NODES.find((n) => n.id === conn.from)!;
  const tn = ARCH_NODES.find((n) => n.id === conn.to)!;
  const sameRow = fn.row === tn.row;
  const gradId = `cg-${conn.from}-${conn.to}`;

  // Build path
  let pathD: string;
  let cx1: number, cy1: number, cx2: number, cy2: number;

  if (sameRow) {
    // Straight horizontal
    pathD = `M${x1},${y1} L${x2},${y2}`;
    cx1 = x1;
    cy1 = y1;
    cx2 = x2;
    cy2 = y2;
  } else {
    // Cubic bezier for cross-layer
    const midY = (y1 + y2) / 2;
    cx1 = x1;
    cy1 = midY;
    cx2 = x2;
    cy2 = midY;
    pathD = `M${x1},${y1} C${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`;
  }

  // Animated draw via stroke-dashoffset
  const pathLength = sameRow
    ? Math.abs(x2 - x1)
    : Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) * 1.3; // approximate curve length

  const dashOffset = pathLength * (1 - progress);

  // Data flow particle
  const showParticle = progress >= 1;
  const cycleLen = 55;
  const t = showParticle ? (((frame + idx * 11) % cycleLen) / cycleLen) : 0;
  let px: number, py: number;
  if (sameRow) {
    px = x1 + (x2 - x1) * t;
    py = y1;
  } else {
    const pt = bezierPoint(t, x1, y1, cx1, cy1, cx2, cy2, x2, y2);
    px = pt.x;
    py = pt.y;
  }

  // Arrow marker (small triangle at endpoint)
  const arrowAngle = sameRow
    ? (x2 > x1 ? 0 : 180)
    : Math.atan2(y2 - cy2, x2 - cx2) * (180 / Math.PI);

  return (
    <g>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={fn.color} />
          <stop offset="100%" stopColor={tn.color} />
        </linearGradient>
      </defs>

      {/* Main path */}
      <path
        d={pathD}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth={1.8}
        strokeDasharray={pathLength}
        strokeDashoffset={dashOffset}
        opacity={0.55}
      />

      {/* Arrow head */}
      {progress > 0.9 && !conn.bidir && (
        <g transform={`translate(${x2},${y2}) rotate(${arrowAngle})`}>
          <polygon
            points="-7,-4 0,0 -7,4"
            fill={tn.color}
            opacity={0.7 * Math.min((progress - 0.9) * 10, 1)}
          />
        </g>
      )}

      {/* Bidirectional dots */}
      {progress > 0.9 && conn.bidir && (
        <>
          <circle cx={x1} cy={y1} r={3} fill={fn.color} opacity={0.6} />
          <circle cx={x2} cy={y2} r={3} fill={tn.color} opacity={0.6} />
        </>
      )}

      {/* Data flow particle */}
      {showParticle && (
        <circle cx={px} cy={py} r={3.5} fill={fn.color} opacity={0.75}>
          {/* glow */}
        </circle>
      )}
      {showParticle && (
        <circle cx={px} cy={py} r={8} fill={fn.color} opacity={0.15} />
      )}
    </g>
  );
};

// ═══════════════════════════════════════════
//  Main Component
// ═══════════════════════════════════════════
export const ArchitectureFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const lang = useLanguage();

  return (
    <AbsoluteFill style={{background: COLORS.bgPrimary}}>
      <ParticleField count={15} color={COLORS.green} seed="arch" />

      {/* Central radial glow behind AI Engine */}
      <div
        style={{
          position: 'absolute',
          left: COL_X[0] - 280,
          top: ROW_Y[1] - 200,
          width: 560,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${COLORS.green}0C 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 65,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <AnimatedHeadline text={L(lang, '系统架构', 'Architecture')} fontSize={42} startFrame={3} />
      </div>

      {/* Title underline */}
      <div
        style={{
          position: 'absolute',
          left: 860,
          top: 128,
          width: interpolate(frame, [5, 20], [0, 200], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          height: 2,
          background: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.blue})`,
          borderRadius: 1,
          opacity: interpolate(frame, [5, 15], [0, 0.5], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      />

      {/* Layer panels */}
      {LAYERS.map((layer, i) => (
        <LayerPanel
          key={i}
          row={layer.row}
          label={L(lang, layer.label, layer.en)}
          en={L(lang, layer.en, layer.label)}
          color={layer.color}
          enterFrame={6 + i * 14}
        />
      ))}

      {/* SVG overlay: connections + particles */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1920,
          height: 1080,
          pointerEvents: 'none',
        }}
      >
        {CONNS.map((conn, i) => (
          <ConnSvg
            key={i}
            conn={conn}
            idx={i}
            enterFrame={50 + i * 5}
            frame={frame}
          />
        ))}
      </svg>

      {/* Node cards */}
      {ARCH_NODES.map((node) => {
        const layerEnter = 6 + node.row * 14;
        const nodeEnter = layerEnter + 6 + node.col * 6;
        return <NodeCard key={node.id} node={node} enterFrame={nodeEnter} />;
      })}
    </AbsoluteFill>
  );
};
