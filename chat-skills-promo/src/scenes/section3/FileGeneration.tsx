import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {COLORS, GRADIENT} from '../../config/colors';
import {FONTS} from '../../config/typography';
import {FeatureLabel} from '../../components/ui/FeatureLabel';
import {PulseGlow} from '../../components/effects/PulseGlow';
import {ParticleField} from '../../components/effects/ParticleField';
import {Scanlines} from '../../components/effects/Scanlines';
import {easeOutCubic} from '../../utils/easing';
import {CONTENT} from '../../config/content';

// HTML code lines for the code view
const HTML_CODE = [
  '<!DOCTYPE html>',
  '<html lang="zh">',
  '<head>',
  '  <title>AI Chat Product</title>',
  '  <style>',
  '    body { background: #0A0E1A; }',
  '    .chat { display: flex; }',
  '    .sidebar { width: 260px; }',
  '    .main { flex: 1; }',
  '  </style>',
  '</head>',
  '<body>',
  '  <div class="chat">...</div>',
  '</body>',
  '</html>',
];

export const FileGeneration: React.FC = () => {
  const frame = useCurrentFrame();
  const feature = CONTENT.features[2];

  // Code/Preview toggle — switches at frame 140
  const showPreview = frame >= 140;
  const toggleProgress = interpolate(frame, [138, 145], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{background: COLORS.bgPrimary}}>
      <PulseGlow color={COLORS.purple} x="55%" y="40%" size={500} />
      <PulseGlow color={COLORS.blue} x="40%" y="65%" size={350} />
      <ParticleField count={18} color={COLORS.purple} seed="file-gen" />
      <Scanlines opacity={0.02} />

      <AbsoluteFill style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'flex-start', gap: 50, width: 1400}}>
          {/* Left — label */}
          <div style={{width: 420, flexShrink: 0, paddingTop: 30}}>
            <div style={{marginBottom: 6}}>
              <span style={{fontFamily: FONTS.mono, fontSize: 12, color: COLORS.purple, padding: '3px 10px', borderRadius: 12, background: COLORS.purpleDim, border: `1px solid ${COLORS.purple}30`}}>
                Feature 03
              </span>
            </div>
            <FeatureLabel title={feature.title} subtitle={feature.subtitle} description={feature.description} enterFrame={10} />

            {/* File saved banner */}
            <div style={{marginTop: 28, opacity: interpolate(frame, [90, 105], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [90, 105], [12, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
              <div style={{padding: '10px 14px', borderRadius: 10, background: `${COLORS.green}10`, border: `1px solid ${COLORS.green}25`, display: 'flex', alignItems: 'center', gap: 8}}>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={COLORS.green} strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /><path d="M9 15l2 2 4-4" /></svg>
                <span style={{fontFamily: FONTS.cn, fontSize: 13, color: COLORS.green}}>File saved:</span>
                <span style={{fontFamily: FONTS.mono, fontSize: 12, color: COLORS.textPrimary}}>landing-page.html</span>
              </div>
            </div>

            {/* Generated files list */}
            <div style={{marginTop: 12, opacity: interpolate(frame, [105, 120], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
              {[{name: 'landing-page.html', size: '4.2 KB', color: COLORS.purple}, {name: 'styles.css', size: '1.8 KB', color: COLORS.blue}, {name: 'script.js', size: '0.6 KB', color: COLORS.amber}].map((f, i) => (
                <div key={i} style={{display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 6, background: i === 0 ? `${f.color}08` : 'transparent', marginBottom: 2, opacity: interpolate(frame, [108 + i * 8, 118 + i * 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={f.color} strokeWidth="2" opacity={0.7}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /></svg>
                  <span style={{fontFamily: FONTS.mono, fontSize: 12, color: COLORS.textPrimary}}>{f.name}</span>
                  <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted, marginLeft: 'auto'}}>{f.size}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Chat window with code block + preview */}
          <div style={{flex: 1, opacity: interpolate(frame, [15, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [15, 30], [20, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
            <div style={{borderRadius: 16, border: `1px solid ${COLORS.borderGlass}`, background: `${COLORS.bgSecondary}90`, overflow: 'hidden'}}>
              {/* Chat top bar */}
              <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderBottom: `1px solid ${COLORS.borderGlass}`, background: 'rgba(255,255,255,0.02)'}}>
                <span style={{fontFamily: FONTS.cn, fontSize: 13, fontWeight: 600, color: COLORS.textPrimary}}>HTML 文件生成</span>
                <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.purple, padding: '2px 8px', borderRadius: 10, background: COLORS.purpleDim}}>file-gen</span>
                <div style={{flex: 1}} />
                <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted}}>tokens: 2.1k</span>
              </div>

              <div style={{padding: '16px 20px', minHeight: 520}}>
                {/* User message */}
                <div style={{display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 14, opacity: interpolate(frame, [25, 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                  <div style={{width: 28, height: 28, borderRadius: 7, background: GRADIENT.userAvatar, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  </div>
                  <div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3}}>
                      <span style={{fontFamily: FONTS.body, fontSize: 12, fontWeight: 600, color: COLORS.textPrimary}}>你</span>
                      <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted}}>刚刚</span>
                    </div>
                    <div style={{fontFamily: FONTS.cn, fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.5}}>
                      帮我生成一个 AI 对话产品的落地页 HTML
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
                    </div>
                    <div style={{fontFamily: FONTS.cn, fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.5}}>
                      好的，我来生成一个完整的落地页 HTML 文件。
                    </div>
                  </div>
                </div>

                {/* Code block card with Code/Preview toggle */}
                <div style={{marginLeft: 38, borderRadius: 12, border: `1px solid ${COLORS.borderGlass}`, background: COLORS.bgCard, overflow: 'hidden', opacity: interpolate(frame, [65, 80], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [65, 80], [12, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
                  {/* Header with language tag + Code/Preview toggle + actions */}
                  <div style={{display: 'flex', alignItems: 'center', padding: '8px 12px', background: COLORS.bgGlass, borderBottom: `1px solid ${COLORS.borderGlass}`}}>
                    <div style={{display: 'flex', gap: 6, marginRight: 10}}>
                      <div style={{width: 7, height: 7, borderRadius: '50%', background: COLORS.dotRed}} />
                      <div style={{width: 7, height: 7, borderRadius: '50%', background: COLORS.dotYellow}} />
                      <div style={{width: 7, height: 7, borderRadius: '50%', background: COLORS.dotGreen}} />
                    </div>
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={COLORS.purple} strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /></svg>
                    <span style={{fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textPrimary, marginLeft: 6}}>landing-page.html</span>
                    <div style={{flex: 1}} />
                    {/* Code / Preview toggle */}
                    <div style={{display: 'flex', borderRadius: 6, background: COLORS.bgTerminal, border: `1px solid ${COLORS.borderGlass}`, overflow: 'hidden'}}>
                      <div style={{padding: '3px 10px', fontFamily: FONTS.mono, fontSize: 10, color: !showPreview ? COLORS.textPrimary : COLORS.textMuted, background: !showPreview ? 'rgba(255,255,255,0.06)' : 'transparent'}}>Code</div>
                      <div style={{padding: '3px 10px', fontFamily: FONTS.mono, fontSize: 10, color: showPreview ? COLORS.purple : COLORS.textMuted, background: showPreview ? COLORS.purpleDim : 'transparent'}}>Preview</div>
                    </div>
                    <div style={{display: 'flex', gap: 6, marginLeft: 10}}>
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                    </div>
                  </div>

                  {/* Content: Code view or Preview */}
                  {!showPreview ? (
                    /* Code view */
                    <div style={{background: COLORS.bgTerminal, padding: '12px 16px', minHeight: 260}}>
                      {HTML_CODE.map((line, i) => {
                        const lineElapsed = frame - 80 - i * 4;
                        const opacity = interpolate(lineElapsed, [0, 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
                        const isTag = line.includes('<') || line.includes('>');
                        const isAttr = line.includes(':') && !line.includes('<');
                        return (
                          <div key={i} style={{opacity, fontFamily: FONTS.mono, fontSize: 11, lineHeight: 1.8, color: isTag ? COLORS.purple : isAttr ? COLORS.blue : COLORS.textMuted, whiteSpace: 'pre'}}>
                            <span style={{color: COLORS.textMuted, opacity: 0.3, marginRight: 12, fontSize: 10}}>{String(i + 1).padStart(2, ' ')}</span>
                            {line}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* Preview view — rendered HTML preview (white bg iframe style) */
                    <div style={{background: '#ffffff', padding: 0, minHeight: 260, opacity: toggleProgress}}>
                      {/* Mini landing page preview */}
                      <div style={{padding: 16}}>
                        {/* Nav bar */}
                        <div style={{display: 'flex', alignItems: 'center', padding: '8px 12px', marginBottom: 16, opacity: interpolate(frame, [148, 158], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                          <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
                            <div style={{width: 18, height: 18, borderRadius: 4, background: 'linear-gradient(135deg, #22C55E, #3B82F6)'}} />
                            <span style={{fontFamily: FONTS.heading, fontSize: 12, fontWeight: 700, color: '#111'}}>AI Chat</span>
                          </div>
                          <div style={{flex: 1}} />
                          {['Features', 'Pricing', 'Docs'].map((t, i) => (
                            <span key={i} style={{fontFamily: FONTS.body, fontSize: 10, color: '#666', marginLeft: 16}}>{t}</span>
                          ))}
                        </div>

                        {/* Hero section */}
                        <div style={{textAlign: 'center', padding: '20px 0 16px', opacity: interpolate(frame, [155, 168], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                          <div style={{fontFamily: FONTS.cn, fontSize: 18, fontWeight: 700, color: '#111', marginBottom: 6}}>
                            让 AI 拥有技能
                          </div>
                          <div style={{fontFamily: FONTS.cn, fontSize: 10, color: '#666', marginBottom: 12}}>
                            AI 驱动的技能集成对话平台
                          </div>
                          <div style={{display: 'inline-flex', padding: '6px 20px', borderRadius: 6, background: 'linear-gradient(135deg, #22C55E, #3B82F6)', fontFamily: FONTS.cn, fontSize: 10, color: 'white', fontWeight: 600}}>
                            开始使用
                          </div>
                        </div>

                        {/* Feature cards */}
                        <div style={{display: 'flex', gap: 8, padding: '0 8px', opacity: interpolate(frame, [165, 180], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                          {[{title: '终端执行', color: '#22C55E'}, {title: '文件生成', color: '#A855F7'}, {title: '网页搜索', color: '#3B82F6'}].map((card, i) => (
                            <div key={i} style={{flex: 1, padding: '10px 8px', borderRadius: 6, border: '1px solid #e5e7eb', textAlign: 'center'}}>
                              <div style={{width: 20, height: 20, borderRadius: 4, background: `${card.color}15`, margin: '0 auto 6px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <div style={{width: 8, height: 8, borderRadius: 2, background: card.color}} />
                              </div>
                              <div style={{fontFamily: FONTS.cn, fontSize: 9, fontWeight: 600, color: '#333'}}>{card.title}</div>
                            </div>
                          ))}
                        </div>

                        {/* Chat UI preview inside the landing page */}
                        <div style={{margin: '12px 8px 0', padding: 8, borderRadius: 8, background: '#0A0E1A', opacity: interpolate(frame, [175, 190], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                          <div style={{display: 'flex', gap: 6, padding: 6}}>
                            {/* Mini sidebar */}
                            <div style={{width: 40, borderRadius: 4, background: 'rgba(255,255,255,0.04)', padding: 4}}>
                              {[1,2,3].map(n => <div key={n} style={{height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.08)', marginBottom: 3}} />)}
                            </div>
                            {/* Mini chat area */}
                            <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 4}}>
                              <div style={{display: 'flex', gap: 4, alignItems: 'center'}}>
                                <div style={{width: 10, height: 10, borderRadius: 3, background: 'linear-gradient(135deg, #A855F7, #3B82F6)'}} />
                                <div style={{height: 6, flex: 1, borderRadius: 3, background: 'rgba(255,255,255,0.06)'}} />
                              </div>
                              <div style={{display: 'flex', gap: 4, alignItems: 'center'}}>
                                <div style={{width: 10, height: 10, borderRadius: 3, background: 'linear-gradient(135deg, #22C55E, #3B82F6)'}} />
                                <div style={{height: 6, width: '60%', borderRadius: 3, background: 'rgba(255,255,255,0.04)'}} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
