import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {COLORS, GRADIENT} from '../../config/colors';
import {FONTS} from '../../config/typography';
import {CONTENT} from '../../config/content';
import {FeatureLabel} from '../../components/ui/FeatureLabel';
import {PulseGlow} from '../../components/effects/PulseGlow';
import {ParticleField} from '../../components/effects/ParticleField';
import {Scanlines} from '../../components/effects/Scanlines';
import {easeOutCubic} from '../../utils/easing';

export const LiveTerminal: React.FC = () => {
  const frame = useCurrentFrame();
  const feature = CONTENT.features[1];

  return (
    <AbsoluteFill style={{background: COLORS.bgPrimary}}>
      <PulseGlow color={COLORS.blue} x="55%" y="45%" size={500} />
      <PulseGlow color={COLORS.green} x="40%" y="60%" size={350} />
      <ParticleField count={18} color={COLORS.blue} seed="live-term" />
      <Scanlines opacity={0.02} />

      <AbsoluteFill style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'flex-start', gap: 50, width: 1400}}>
          {/* Left — label */}
          <div style={{width: 420, flexShrink: 0, paddingTop: 30}}>
            <div style={{marginBottom: 6}}>
              <span style={{fontFamily: FONTS.mono, fontSize: 12, color: COLORS.blue, padding: '3px 10px', borderRadius: 12, background: COLORS.blueDim, border: `1px solid ${COLORS.blue}30`}}>
                Feature 02
              </span>
            </div>
            <FeatureLabel title={feature.title} subtitle={feature.subtitle} description={feature.description} enterFrame={10} />

            {/* Sandbox info card */}
            <div style={{marginTop: 28, opacity: interpolate(frame, [40, 55], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [40, 55], [12, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
              <div style={{padding: '12px 16px', borderRadius: 10, background: COLORS.bgCard, border: `1px solid ${COLORS.borderGlass}`}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10}}>
                  <div style={{width: 24, height: 24, borderRadius: 6, background: GRADIENT.aiAvatar, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 8h8M8 12h6M8 16h4" /></svg>
                  </div>
                  <span style={{fontFamily: FONTS.cn, fontSize: 13, color: COLORS.textSecondary}}>安全沙箱环境</span>
                  <span style={{marginLeft: 'auto', fontFamily: FONTS.mono, fontSize: 11, color: COLORS.green, padding: '2px 8px', borderRadius: 4, background: COLORS.greenDim}}>active</span>
                </div>
                <div style={{display: 'flex', gap: 16}}>
                  {[{label: '隔离级别', value: 'Container'}, {label: '超时', value: '30s'}, {label: '权限', value: 'Read/Write'}].map((item, i) => (
                    <div key={i} style={{opacity: interpolate(frame, [55 + i * 8, 65 + i * 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                      <div style={{fontFamily: FONTS.cn, fontSize: 11, color: COLORS.textMuted, marginBottom: 2}}>{item.label}</div>
                      <div style={{fontFamily: FONTS.mono, fontSize: 12, color: COLORS.textPrimary}}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right — Chat window with skill invoke card */}
          <div style={{flex: 1, opacity: interpolate(frame, [15, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [15, 30], [20, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
            <div style={{borderRadius: 16, border: `1px solid ${COLORS.borderGlass}`, background: `${COLORS.bgSecondary}90`, overflow: 'hidden'}}>
              {/* Chat top bar */}
              <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderBottom: `1px solid ${COLORS.borderGlass}`, background: 'rgba(255,255,255,0.02)'}}>
                <span style={{fontFamily: FONTS.cn, fontSize: 13, fontWeight: 600, color: COLORS.textPrimary}}>React 项目创建</span>
                <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.green, padding: '2px 8px', borderRadius: 10, background: COLORS.greenDim}}>2 Skills</span>
                <div style={{flex: 1}} />
                <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted}}>tokens: 1.2k</span>
              </div>

              {/* Chat messages */}
              <div style={{padding: '16px 20px', minHeight: 480}}>
                {/* User message */}
                <div style={{display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 16, opacity: interpolate(frame, [25, 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                  <div style={{width: 28, height: 28, borderRadius: 7, background: GRADIENT.userAvatar, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  </div>
                  <div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3}}>
                      <span style={{fontFamily: FONTS.body, fontSize: 12, fontWeight: 600, color: COLORS.textPrimary}}>你</span>
                      <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted}}>刚刚</span>
                    </div>
                    <div style={{fontFamily: FONTS.cn, fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.5}}>
                      帮我创建一个 React 项目并安装依赖
                    </div>
                  </div>
                </div>

                {/* AI message */}
                <div style={{display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 14, opacity: interpolate(frame, [45, 60], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                  <div style={{width: 28, height: 28, borderRadius: 7, background: GRADIENT.aiAvatar, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                  </div>
                  <div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3}}>
                      <span style={{fontFamily: FONTS.body, fontSize: 12, fontWeight: 600, color: COLORS.textPrimary}}>Chat-Skills</span>
                      <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted}}>刚刚</span>
                    </div>
                    <div style={{fontFamily: FONTS.cn, fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.5}}>
                      好的，我来为你创建项目并配置开发环境。
                    </div>
                  </div>
                </div>

                {/* Skill invoke card (terminal) — matching original SkillInvokeCard UI */}
                <div style={{marginLeft: 38, borderRadius: 16, border: `1px solid ${COLORS.borderGlass}`, background: COLORS.bgCard, overflow: 'hidden', opacity: interpolate(frame, [65, 80], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [65, 80], [12, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
                  {/* Header: icon + label + status badge */}
                  <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: COLORS.bgGlass, borderBottom: `1px solid ${COLORS.borderGlass}`}}>
                    <div style={{width: 28, height: 28, borderRadius: 8, background: COLORS.greenDim, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={COLORS.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>
                    </div>
                    <span style={{fontFamily: FONTS.heading, fontSize: 13, fontWeight: 600, color: COLORS.textPrimary}}>terminal</span>
                    <div style={{flex: 1}} />
                    <div style={{display: 'flex', alignItems: 'center', gap: 5, padding: '2px 8px', borderRadius: 10, background: COLORS.greenDim, fontFamily: FONTS.mono, fontSize: 11, fontWeight: 500, color: COLORS.green}}>
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={COLORS.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      完成
                    </div>
                  </div>

                  {/* Tabs row (separate from header) */}
                  <div style={{display: 'flex', borderBottom: `1px solid ${COLORS.borderGlass}`, background: 'rgba(255,255,255,0.02)'}}>
                    <div style={{padding: '8px 14px', fontFamily: FONTS.mono, fontSize: 12, color: COLORS.green, borderBottom: `2px solid ${COLORS.green}`, display: 'flex', alignItems: 'center', gap: 6}}>
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>
                      Terminal
                    </div>
                  </div>

                  {/* Terminal content */}
                  <div style={{background: COLORS.bgTerminal, fontFamily: FONTS.mono, fontSize: 12, lineHeight: 1.7}}>
                    {/* macOS dots bar */}
                    <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                      <div style={{width: 8, height: 8, borderRadius: '50%', background: COLORS.dotRed}} />
                      <div style={{width: 8, height: 8, borderRadius: '50%', background: COLORS.dotYellow}} />
                      <div style={{width: 8, height: 8, borderRadius: '50%', background: COLORS.dotGreen}} />
                    </div>
                    {/* Terminal body */}
                    <div style={{padding: 14}}>
                      {CONTENT.terminalCommands.map((line, i) => {
                        const lineElapsed = frame - 80 - line.delay * 0.6;
                        const opacity = interpolate(lineElapsed, [0, 8], [0, 1], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
                        const charCount = Math.max(0, Math.floor(lineElapsed * 1.5));
                        const displayed = line.cmd.slice(0, charCount);
                        const isComplete = charCount >= line.cmd.length;
                        const isCheck = line.cmd.includes('✓') || line.cmd.includes('✅');
                        const isPrompt = line.cmd.startsWith('$');
                        return (
                          <div key={i} style={{opacity, fontFamily: FONTS.mono, fontSize: 12, color: isCheck ? COLORS.green : isPrompt ? COLORS.textPrimary : COLORS.textSecondary, lineHeight: 1.8, whiteSpace: 'pre'}}>
                            {isComplete ? line.cmd : displayed}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer with icons */}
                  <div style={{padding: '10px 16px', borderTop: `1px solid ${COLORS.borderGlass}`, background: 'rgba(255,255,255,0.02)', display: 'flex', gap: 16, fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textMuted}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                      <span style={{fontWeight: 600, color: COLORS.textSecondary}}>12.3s</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>
                      <span style={{fontWeight: 600, color: COLORS.textSecondary}}>exit 0</span>
                    </div>
                  </div>
                </div>

                {/* AI follow-up */}
                <div style={{display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 14, opacity: interpolate(frame, [200, 215], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                  <div style={{width: 28, height: 28, borderRadius: 7, background: GRADIENT.aiAvatar, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                  </div>
                  <div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3}}>
                      <span style={{fontFamily: FONTS.body, fontSize: 12, fontWeight: 600, color: COLORS.textPrimary}}>Chat-Skills</span>
                    </div>
                    <div style={{fontFamily: FONTS.cn, fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.5}}>
                      项目已就绪！我还帮你配置了 TypeScript 和 ESLint。
                    </div>
                  </div>
                </div>
              </div>

              {/* Input area */}
              <div style={{padding: '10px 16px', borderTop: `1px solid ${COLORS.borderGlass}`, background: 'rgba(255,255,255,0.01)'}}>
                <div style={{padding: '10px 14px', borderRadius: 10, background: COLORS.bgTertiary, border: `1px solid ${COLORS.borderGlass}`, display: 'flex', alignItems: 'center', gap: 8}}>
                  <span style={{fontFamily: FONTS.cn, fontSize: 12, color: COLORS.textMuted}}>输入消息...</span>
                  <div style={{flex: 1}} />
                  <div style={{width: 24, height: 24, borderRadius: 6, background: GRADIENT.brand, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <svg width={11} height={11} viewBox="0 0 24 24" fill="white"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
