import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {COLORS, GRADIENT} from '../../config/colors';
import {FONTS} from '../../config/typography';
import {CONTENT} from '../../config/content';
import {FeatureLabel} from '../../components/ui/FeatureLabel';
import {PulseGlow} from '../../components/effects/PulseGlow';
import {ParticleField} from '../../components/effects/ParticleField';
import {Scanlines} from '../../components/effects/Scanlines';
import {easeOutCubic, easeOutBack} from '../../utils/easing';

// Timeline:
// 0-25:   Chat area shows previous AI message
// 25-110: Input typing "@ui-ux-pro-max ...", dropdown visible
// 110:    Dropdown fades out
// 120:    Message "sent" — input clears, user bubble appears in chat
// 135:    AI responds with text
// 150:    Skill invoke card (wireframe) appears
// 180+:   Wireframe panels animate in

const SEND_FRAME = 120;

export const MentionSyntax: React.FC = () => {
  const frame = useCurrentFrame();
  const feature = CONTENT.features[3];

  const isSent = frame >= SEND_FRAME;

  // Input typing — only before send
  const fullText = '@ui-ux-pro-max 设计一个 AI 对话产品的原型图';
  const charCount = isSent ? 0 : Math.min(Math.floor(Math.max(0, frame - 50) * 0.5), fullText.length);
  const displayedInput = isSent ? '' : fullText.slice(0, charCount);

  // Dropdown visible only while typing
  const dropdownVisible = frame >= 25 && frame < 110;
  const dropdownSelectedFrame = 70;

  return (
    <AbsoluteFill style={{background: COLORS.bgPrimary}}>
      <PulseGlow color={COLORS.cyan} x="55%" y="45%" size={500} />
      <PulseGlow color={COLORS.green} x="35%" y="55%" size={350} />
      <ParticleField count={18} color={COLORS.cyan} seed="mention-skill" />
      <Scanlines opacity={0.02} />

      <AbsoluteFill style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'flex-start', gap: 50, width: 1400}}>
          {/* Left — label + usage examples */}
          <div style={{width: 420, flexShrink: 0, paddingTop: 30}}>
            <div style={{marginBottom: 6}}>
              <span style={{fontFamily: FONTS.mono, fontSize: 12, color: COLORS.cyan, padding: '3px 10px', borderRadius: 12, background: 'rgba(6,182,212,0.15)', border: `1px solid ${COLORS.cyan}30`}}>
                Feature 04
              </span>
            </div>
            <FeatureLabel title={feature.title} subtitle={feature.subtitle} description={feature.description} enterFrame={10} />

            {/* Usage examples */}
            <div style={{marginTop: 28, opacity: interpolate(frame, [40, 55], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [40, 55], [12, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
              <div style={{fontFamily: FONTS.cn, fontSize: 13, color: COLORS.textMuted, marginBottom: 10}}>使用示例</div>
              {[
                {text: '@terminal npm run build', desc: '执行构建命令'},
                {text: '@file-gen 创建 API 路由', desc: '生成代码文件'},
                {text: '@ui-ux-pro-max 设计原型图', desc: 'UI/UX 设计智能'},
              ].map((example, i) => (
                <div key={i} style={{padding: '8px 12px', borderRadius: 8, background: COLORS.bgCard, border: `1px solid ${i === 2 ? COLORS.cyan + '30' : COLORS.borderGlass}`, marginBottom: 8, opacity: interpolate(frame, [55 + i * 10, 65 + i * 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                  <div style={{fontFamily: FONTS.mono, fontSize: 13, color: COLORS.textPrimary, marginBottom: 2}}>
                    <span style={{color: COLORS.cyan}}>@</span>{example.text.slice(1)}
                  </div>
                  <div style={{fontFamily: FONTS.cn, fontSize: 11, color: COLORS.textMuted}}>{example.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Chat window */}
          <div style={{flex: 1, opacity: interpolate(frame, [15, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
            <div style={{borderRadius: 16, border: `1px solid ${COLORS.borderGlass}`, background: `${COLORS.bgSecondary}90`, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: 600}}>
              {/* Chat top bar */}
              <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderBottom: `1px solid ${COLORS.borderGlass}`, background: 'rgba(255,255,255,0.02)', flexShrink: 0}}>
                <span style={{fontFamily: FONTS.cn, fontSize: 13, fontWeight: 600, color: COLORS.textPrimary}}>UI 原型设计</span>
                <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.cyan, padding: '2px 8px', borderRadius: 10, background: 'rgba(6,182,212,0.15)'}}>5 Skills</span>
                <div style={{flex: 1}} />
                <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted}}>tokens: 3.4k</span>
              </div>

              {/* Chat messages area — scrolls up as new messages appear */}
              <div style={{flex: 1, padding: '16px 20px', overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
                {/* Scroll offset to keep newest content visible */}
                <div style={{transform: `translateY(${isSent ? interpolate(frame, [SEND_FRAME, SEND_FRAME + 20], [0, -40], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 0}px)`, display: 'flex', flexDirection: 'column', flex: 1}}>
                  {/* Previous AI message */}
                  <div style={{display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 14, opacity: interpolate(frame, [20, 35], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                    <div style={{width: 28, height: 28, borderRadius: 7, background: GRADIENT.aiAvatar, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                    </div>
                    <div>
                      <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3}}>
                        <span style={{fontFamily: FONTS.body, fontSize: 12, fontWeight: 600, color: COLORS.textPrimary}}>Chat-Skills</span>
                        <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted}}>1 分钟前</span>
                      </div>
                      <div style={{fontFamily: FONTS.cn, fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.5}}>
                        项目已创建完成，需要我帮你设计 UI 吗？
                      </div>
                    </div>
                  </div>

                  {/* === After send: user message appears in chat === */}
                  {isSent && (
                    <div style={{display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 14, opacity: interpolate(frame, [SEND_FRAME, SEND_FRAME + 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [SEND_FRAME, SEND_FRAME + 10], [8, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
                      <div style={{width: 28, height: 28, borderRadius: 7, background: GRADIENT.userAvatar, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      </div>
                      <div>
                        <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3}}>
                          <span style={{fontFamily: FONTS.body, fontSize: 12, fontWeight: 600, color: COLORS.textPrimary}}>你</span>
                          <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted}}>刚刚</span>
                        </div>
                        <div style={{fontFamily: FONTS.cn, fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.5}}>
                          <span style={{color: COLORS.cyan, fontWeight: 600}}>@ui-ux-pro-max</span> 设计一个 AI 对话产品的原型图
                        </div>
                      </div>
                    </div>
                  )}

                  {/* === After send: AI response + skill invoke card === */}
                  {isSent && (
                    <div style={{display: 'flex', gap: 10, alignItems: 'flex-start', opacity: interpolate(frame, [SEND_FRAME + 15, SEND_FRAME + 28], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [SEND_FRAME + 15, SEND_FRAME + 28], [8, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
                      <div style={{width: 28, height: 28, borderRadius: 7, background: GRADIENT.aiAvatar, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                      </div>
                      <div style={{flex: 1}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3}}>
                          <span style={{fontFamily: FONTS.body, fontSize: 12, fontWeight: 600, color: COLORS.textPrimary}}>Chat-Skills</span>
                          <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted}}>刚刚</span>
                        </div>
                        <div style={{fontFamily: FONTS.cn, fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.5, marginBottom: 10}}>
                          已为你生成 AI 对话产品的原型设计：
                        </div>

                        {/* Skill invoke card — ui-ux-pro-max wireframe */}
                        <div style={{borderRadius: 10, border: `1px solid ${COLORS.borderGlass}`, background: COLORS.bgCard, overflow: 'hidden', opacity: interpolate(frame, [SEND_FRAME + 28, SEND_FRAME + 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                          <div style={{display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: COLORS.bgGlass, borderBottom: `1px solid ${COLORS.borderGlass}`}}>
                            <span style={{fontSize: 11}}>🖥️</span>
                            <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.cyan}}>ui-ux-pro-max</span>
                            <span style={{marginLeft: 'auto', fontFamily: FONTS.mono, fontSize: 9, color: COLORS.green, padding: '1px 6px', borderRadius: 3, background: COLORS.greenDim}}>✓ done</span>
                          </div>

                          {/* Wireframe content */}
                          <div style={{padding: 12, background: '#111827'}}>
                            <div style={{fontFamily: FONTS.mono, fontSize: 9, color: COLORS.textMuted, marginBottom: 8}}>AI Chat Product — Wireframe</div>
                            <div style={{display: 'flex', gap: 4, borderRadius: 6, border: `1px solid ${COLORS.borderGlass}`, overflow: 'hidden', height: 120}}>
                              {/* Sidebar wireframe */}
                              <div style={{width: 45, background: 'rgba(255,255,255,0.03)', padding: 5, borderRight: `1px solid ${COLORS.borderGlass}`, display: 'flex', flexDirection: 'column', gap: 3, opacity: interpolate(frame, [SEND_FRAME + 40, SEND_FRAME + 50], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                                <div style={{height: 8, borderRadius: 2, background: 'rgba(255,255,255,0.08)'}} />
                                <div style={{height: 1, background: COLORS.borderGlass}} />
                                {[1,2,3,4].map(n => <div key={n} style={{height: 5, borderRadius: 2, background: n === 1 ? `${COLORS.green}30` : 'rgba(255,255,255,0.04)', borderLeft: n === 1 ? `2px solid ${COLORS.green}` : 'none'}} />)}
                                <div style={{flex: 1}} />
                                <div style={{height: 6, borderRadius: 2, background: 'rgba(255,255,255,0.06)'}} />
                              </div>

                              {/* Main chat wireframe */}
                              <div style={{flex: 1, padding: 5, display: 'flex', flexDirection: 'column', gap: 3, opacity: interpolate(frame, [SEND_FRAME + 45, SEND_FRAME + 55], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                                <div style={{height: 8, borderRadius: 2, background: 'rgba(255,255,255,0.04)'}} />
                                <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center'}}>
                                  <div style={{display: 'flex', gap: 3, alignItems: 'center'}}>
                                    <div style={{width: 7, height: 7, borderRadius: 2, background: GRADIENT.userAvatar}} />
                                    <div style={{height: 4, width: '45%', borderRadius: 2, background: 'rgba(99,102,241,0.12)'}} />
                                  </div>
                                  <div style={{display: 'flex', gap: 3, alignItems: 'center'}}>
                                    <div style={{width: 7, height: 7, borderRadius: 2, background: GRADIENT.aiAvatar}} />
                                    <div style={{height: 4, width: '60%', borderRadius: 2, background: 'rgba(255,255,255,0.04)'}} />
                                  </div>
                                  <div style={{marginLeft: 10, height: 14, borderRadius: 2, background: 'rgba(255,255,255,0.02)', border: `1px solid ${COLORS.borderGlass}`}} />
                                </div>
                                <div style={{height: 10, borderRadius: 3, background: 'rgba(255,255,255,0.03)', border: `1px solid ${COLORS.borderGlass}`, display: 'flex', alignItems: 'center', padding: '0 4px'}}>
                                  <div style={{width: 16, height: 3, borderRadius: 1, background: 'rgba(255,255,255,0.06)'}} />
                                  <div style={{flex: 1}} />
                                  <div style={{width: 6, height: 6, borderRadius: 2, background: GRADIENT.brand}} />
                                </div>
                              </div>

                              {/* Right panel wireframe */}
                              <div style={{width: 40, background: 'rgba(255,255,255,0.02)', borderLeft: `1px solid ${COLORS.borderGlass}`, padding: 4, display: 'flex', flexDirection: 'column', gap: 3, opacity: interpolate(frame, [SEND_FRAME + 50, SEND_FRAME + 60], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                                <div style={{height: 5, borderRadius: 2, background: 'rgba(255,255,255,0.06)'}} />
                                <div style={{height: 16, borderRadius: 2, background: 'rgba(255,255,255,0.03)', border: `1px solid ${COLORS.borderGlass}`}} />
                                <div style={{flex: 1}} />
                                <div style={{display: 'flex', gap: 2}}>
                                  {[1,2].map(n => <div key={n} style={{flex: 1, height: 8, borderRadius: 2, background: 'rgba(255,255,255,0.03)', border: `1px solid ${COLORS.borderGlass}`}} />)}
                                </div>
                              </div>
                            </div>

                            {/* Design annotations */}
                            <div style={{display: 'flex', gap: 6, marginTop: 6, opacity: interpolate(frame, [SEND_FRAME + 55, SEND_FRAME + 68], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                              {[{label: '3-Panel Layout', color: COLORS.cyan}, {label: 'Glass Effects', color: COLORS.purple}, {label: 'Dark Theme', color: COLORS.green}].map((tag, i) => (
                                <div key={i} style={{padding: '2px 6px', borderRadius: 3, background: `${tag.color}10`, border: `1px solid ${tag.color}20`, fontFamily: FONTS.mono, fontSize: 8, color: tag.color}}>
                                  {tag.label}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Input area — always at bottom */}
              <div style={{padding: '10px 16px', borderTop: `1px solid ${COLORS.borderGlass}`, background: 'rgba(255,255,255,0.01)', flexShrink: 0}}>
                {/* Skill chips */}
                <div style={{display: 'flex', gap: 6, marginBottom: 8, opacity: interpolate(frame, [20, 35], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                  {CONTENT.skills.slice(0, 4).map((skill, i) => (
                    <div key={i} style={{padding: '3px 10px', borderRadius: 12, background: COLORS.bgCard, border: `1px solid ${COLORS.borderGlass}`, fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted, display: 'flex', alignItems: 'center', gap: 4}}>
                      <span style={{fontSize: 10}}>{skill.icon}</span>
                      {skill.name}
                    </div>
                  ))}
                </div>

                <div style={{position: 'relative'}}>
                  {/* Input field */}
                  <div style={{padding: '12px 16px', borderRadius: 12, background: COLORS.bgTertiary, border: `1px solid ${!isSent && frame >= 25 ? COLORS.cyan + '50' : COLORS.borderGlass}`, display: 'flex', alignItems: 'center', gap: 8}}>
                    <div style={{flex: 1, fontFamily: FONTS.cn, fontSize: 14, color: COLORS.textPrimary, minHeight: 22, display: 'flex', alignItems: 'center'}}>
                      {displayedInput.length > 0 ? (
                        <>
                          <span style={{color: COLORS.cyan, fontWeight: 600}}>@</span>
                          <span>{displayedInput.slice(1)}</span>
                        </>
                      ) : (
                        <span style={{color: COLORS.textMuted}}>输入 @ 调用技能...</span>
                      )}
                      {!isSent && <span style={{opacity: interpolate(Math.sin(frame * 0.15), [-1, 1], [0, 1]), color: COLORS.cyan, marginLeft: 1}}>▋</span>}
                    </div>
                    <div style={{width: 28, height: 28, borderRadius: 7, background: displayedInput.length > 15 ? GRADIENT.brand : COLORS.bgCard, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: displayedInput.length > 15 ? 1 : 0.5}}>
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="white"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                    </div>
                  </div>

                  {/* Dropdown (above input) */}
                  {dropdownVisible && (
                    <div style={{position: 'absolute', bottom: '100%', left: 0, marginBottom: 8, width: 320, background: COLORS.bgSecondary, border: `1px solid ${COLORS.borderGlass}`, borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', opacity: interpolate(frame, [25, 33], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `scale(${interpolate(frame, [25, 33], [0.95, 1], {easing: easeOutBack, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}) translateY(${interpolate(frame, [25, 33], [8, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
                      <div style={{padding: '8px 14px', fontFamily: FONTS.cn, fontSize: 12, color: COLORS.textMuted, borderBottom: `1px solid ${COLORS.borderGlass}`}}>
                        选择技能
                      </div>
                      {CONTENT.skills.map((skill, i) => {
                        const isHighlighted = frame >= dropdownSelectedFrame && i === 3;
                        return (
                          <div key={i} style={{display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px', background: isHighlighted ? `${COLORS.cyan}12` : 'transparent', borderLeft: isHighlighted ? `3px solid ${COLORS.cyan}` : '3px solid transparent'}}>
                            <span style={{fontSize: 14}}>{skill.icon}</span>
                            <div>
                              <div style={{fontFamily: FONTS.mono, fontSize: 12, color: isHighlighted ? COLORS.cyan : COLORS.textPrimary}}>{skill.name}</div>
                              <div style={{fontFamily: FONTS.cn, fontSize: 10, color: COLORS.textMuted}}>{skill.desc}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
