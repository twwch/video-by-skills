import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {COLORS, GRADIENT} from '../../config/colors';
import {FONTS} from '../../config/typography';
import {getContent} from '../../config/content';
import {L} from '../../config/i18n';
import {useLanguage} from '../../contexts/LanguageContext';
import {FeatureLabel} from '../../components/ui/FeatureLabel';
import {PulseGlow} from '../../components/effects/PulseGlow';
import {ParticleField} from '../../components/effects/ParticleField';
import {Scanlines} from '../../components/effects/Scanlines';
import {easeOutCubic} from '../../utils/easing';

const TREE_EDGES: number[][] = [
  [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [4, 6],
];

export const AutonomousSkill: React.FC = () => {
  const frame = useCurrentFrame();
  const lang = useLanguage();
  const CONTENT = getContent(lang);
  const feature = CONTENT.features[0];

  const TREE_NODES = [
    {label: L(lang, '分析请求', 'Analyze'), x: 260, y: 50, level: 0},
    {label: L(lang, '选择技能', 'Select Skill'), x: 130, y: 160, level: 1},
    {label: L(lang, '验证权限', 'Check Perms'), x: 390, y: 160, level: 1},
    {label: 'terminal', x: 70, y: 275, level: 2},
    {label: 'file-gen', x: 240, y: 275, level: 2},
    {label: 'web-search', x: 410, y: 275, level: 2},
    {label: L(lang, '执行', 'Execute'), x: 260, y: 380, level: 3},
  ];

  return (
    <AbsoluteFill style={{background: COLORS.bgPrimary}}>
      <PulseGlow color={COLORS.green} x="60%" y="45%" size={500} />
      <PulseGlow color={COLORS.blue} x="35%" y="60%" size={350} />
      <ParticleField count={20} color={COLORS.green} seed="auto-skill" />
      <Scanlines opacity={0.02} />

      <AbsoluteFill style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 50, width: 1400}}>
          {/* Left — label + chat conversation preview */}
          <div style={{width: 540, flexShrink: 0}}>
            <div style={{marginBottom: 6}}>
              <span style={{fontFamily: FONTS.mono, fontSize: 12, color: COLORS.green, padding: '3px 10px', borderRadius: 12, background: COLORS.greenDim, border: `1px solid ${COLORS.green}30`}}>
                Feature 01
              </span>
            </div>
            <FeatureLabel title={feature.title} subtitle={feature.subtitle} description={feature.description} enterFrame={10} />

            {/* Chat conversation matching original UI */}
            <div style={{marginTop: 24, opacity: interpolate(frame, [40, 55], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [40, 55], [12, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
              {/* User message */}
              <div style={{display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12}}>
                <div style={{width: 28, height: 28, borderRadius: 7, background: GRADIENT.userAvatar, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </div>
                <div>
                  <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3}}>
                    <span style={{fontFamily: FONTS.body, fontSize: 12, fontWeight: 600, color: COLORS.textPrimary}}>{L(lang, '你', 'You')}</span>
                    <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted}}>{L(lang, '刚刚', 'just now')}</span>
                  </div>
                  <div style={{fontFamily: FONTS.cn, fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.5}}>
                    {L(lang, '帮我创建一个 React 项目并安装依赖', 'Create a React project and install dependencies')}
                  </div>
                </div>
              </div>

              {/* AI response with skill analysis */}
              <div style={{display: 'flex', gap: 10, alignItems: 'flex-start', opacity: interpolate(frame, [60, 75], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                <div style={{width: 28, height: 28, borderRadius: 7, background: GRADIENT.aiAvatar, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                </div>
                <div>
                  <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3}}>
                    <span style={{fontFamily: FONTS.body, fontSize: 12, fontWeight: 600, color: COLORS.textPrimary}}>Chat-Skills</span>
                    <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted}}>{L(lang, '刚刚', 'just now')}</span>
                  </div>
                  <div style={{fontFamily: FONTS.cn, fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.5, marginBottom: 8}}>
                    {L(lang, '正在分析请求，自动选择最合适的技能...', 'Analyzing request, selecting the best skill...')}
                  </div>
                  {/* Skill selection chips */}
                  <div style={{display: 'flex', gap: 6, opacity: interpolate(frame, [80, 95], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                    {[{name: 'terminal', color: COLORS.green, active: true}, {name: 'file-gen', color: COLORS.blue, active: true}, {name: 'web-search', color: COLORS.textMuted, active: false}].map((s, i) => (
                      <div key={i} style={{padding: '3px 10px', borderRadius: 12, background: s.active ? `${s.color}15` : COLORS.bgCard, border: `1px solid ${s.active ? s.color + '40' : COLORS.borderGlass}`, fontFamily: FONTS.mono, fontSize: 11, color: s.active ? s.color : COLORS.textMuted, display: 'flex', alignItems: 'center', gap: 4}}>
                        {s.active && <span style={{width: 5, height: 5, borderRadius: '50%', background: s.color}} />}
                        {s.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Decision tree card */}
          <div style={{flex: 1, height: 460, borderRadius: 16, border: `1px solid ${COLORS.borderGlass}`, background: `${COLORS.bgSecondary}90`, position: 'relative', overflow: 'hidden', opacity: interpolate(frame, [15, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
            <div style={{padding: '10px 16px', borderBottom: `1px solid ${COLORS.borderGlass}`, display: 'flex', alignItems: 'center', gap: 8}}>
              <div style={{width: 8, height: 8, borderRadius: '50%', background: COLORS.green}} />
              <span style={{fontFamily: FONTS.mono, fontSize: 12, color: COLORS.textMuted}}>AI Decision Tree</span>
            </div>
            <div style={{position: 'relative', width: '100%', height: 'calc(100% - 38px)'}}>
              <svg style={{position: 'absolute', width: '100%', height: '100%'}}>
                <defs>
                  <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={COLORS.green} />
                    <stop offset="100%" stopColor={COLORS.blue} />
                  </linearGradient>
                </defs>
                {TREE_EDGES.map(([from, to], i) => {
                  const n1 = TREE_NODES[from]; const n2 = TREE_NODES[to];
                  const ef = 35 + Math.max(n1.level, n2.level) * 18;
                  const p = interpolate(frame, [ef, ef + 20], [0, 1], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
                  const isGreen = (from === 0 && to === 1) || (from === 1 && to === 3) || (from === 3 && to === 6);
                  return <line key={i} x1={n1.x} y1={n1.y} x2={n1.x + (n2.x - n1.x) * p} y2={n1.y + (n2.y - n1.y) * p} stroke={isGreen ? 'url(#edgeGrad)' : COLORS.borderGlass} strokeWidth={isGreen ? 2.5 : 1.5} strokeDasharray={isGreen ? 'none' : '6 4'} opacity={0.8} />;
                })}
              </svg>
              {TREE_NODES.map((node, i) => {
                const ef = 25 + node.level * 18;
                const op = interpolate(frame, [ef, ef + 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
                const isG = i === 0 || i === 1 || i === 3 || i === 6;
                const gf = 120 + i * 12;
                const go = interpolate(frame, [gf, gf + 15], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
                return (
                  <div key={i} style={{position: 'absolute', left: node.x, top: node.y, transform: 'translate(-50%, -50%)', opacity: op, padding: '9px 16px', borderRadius: 8, background: isG ? COLORS.bgPrimary : COLORS.bgCard, border: `1px solid ${isG ? COLORS.green + '80' : COLORS.borderGlass}`, fontFamily: FONTS.cn, fontSize: 14, color: isG ? COLORS.green : COLORS.textSecondary, boxShadow: isG ? `0 0 ${14 * go}px ${COLORS.green}40` : 'none', whiteSpace: 'nowrap'}}>
                    {isG && <span style={{display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: COLORS.green, marginRight: 6, verticalAlign: 'middle', boxShadow: `0 0 6px ${COLORS.green}`}} />}
                    {node.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
