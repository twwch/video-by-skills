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

const ERROR_LINES = [
  {text: '$ python3 .../summarize.py https://...BV14rzQB9EJj', delay: 0},
  {text: '🚀 开始处理视频...', delay: 5},
  {text: '步骤 1/3: 下载视频', delay: 10},
  {text: '❌ ModuleNotFoundError: No module named \'yt_dlp\'', delay: 16},
];

const FIX_LINES = [
  {text: '$ pip install yt_dlp', delay: 0},
  {text: 'Collecting yt_dlp', delay: 5},
  {text: 'Downloading yt_dlp-2026.2.4 (3.3 MB)', delay: 10},
  {text: 'Successfully installed yt_dlp-2026.2.4', delay: 16},
];

const RECOVERY_STEPS = [
  {icon: '❌', label: '错误检测', detail: 'ModuleNotFoundError', color: COLORS.red},
  {icon: '🔍', label: '自动诊断', detail: '缺少 yt_dlp 模块', color: COLORS.amber},
  {icon: '🔧', label: '自动修复', detail: 'pip install yt_dlp', color: COLORS.blue},
  {icon: '✅', label: '重试成功', detail: '任务正常完成', color: COLORS.green},
];

export const ErrorAutoFix: React.FC = () => {
  const frame = useCurrentFrame();
  const feature = CONTENT.features[7];

  return (
    <AbsoluteFill style={{background: COLORS.bgPrimary}}>
      <PulseGlow color={COLORS.red} x="52%" y="42%" size={500} />
      <PulseGlow color={COLORS.green} x="40%" y="62%" size={350} />
      <ParticleField count={18} color={COLORS.red} seed="error-fix" />
      <Scanlines opacity={0.02} />

      <AbsoluteFill style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'flex-start', gap: 50, width: 1400}}>
          {/* Left — label + recovery flow */}
          <div style={{width: 420, flexShrink: 0, paddingTop: 30}}>
            <div style={{marginBottom: 6}}>
              <span style={{fontFamily: FONTS.mono, fontSize: 12, color: COLORS.red, padding: '3px 10px', borderRadius: 12, background: COLORS.redDim, border: `1px solid ${COLORS.red}30`}}>
                Feature 08
              </span>
            </div>
            <FeatureLabel title={feature.title} subtitle={feature.subtitle} description={feature.description} enterFrame={10} />

            {/* Recovery flow card */}
            <div style={{marginTop: 24, opacity: interpolate(frame, [40, 55], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [40, 55], [12, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
              <div style={{padding: '14px 16px', borderRadius: 10, background: COLORS.bgCard, border: `1px solid ${COLORS.borderGlass}`}}>
                <div style={{fontFamily: FONTS.cn, fontSize: 12, fontWeight: 600, color: COLORS.textPrimary, marginBottom: 12}}>自动修复流程</div>
                {RECOVERY_STEPS.map((step, i) => {
                  const stepOpacity = interpolate(frame, [50 + i * 22, 62 + i * 22], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
                  return (
                    <div key={i} style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: i < 3 ? 10 : 0, opacity: stepOpacity}}>
                      <div style={{width: 28, height: 28, borderRadius: 6, background: `${step.color}15`, border: `1px solid ${step.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0}}>
                        {step.icon}
                      </div>
                      <div>
                        <div style={{fontFamily: FONTS.cn, fontSize: 12, fontWeight: 600, color: step.color}}>{step.label}</div>
                        <div style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted}}>{step.detail}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right — Chat window: error → auto fix */}
          <div style={{flex: 1, opacity: interpolate(frame, [15, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [15, 30], [20, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
            <div style={{borderRadius: 16, border: `1px solid ${COLORS.borderGlass}`, background: `${COLORS.bgSecondary}90`, overflow: 'hidden'}}>
              {/* Top bar */}
              <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderBottom: `1px solid ${COLORS.borderGlass}`, background: 'rgba(255,255,255,0.02)'}}>
                <span style={{fontFamily: FONTS.cn, fontSize: 13, fontWeight: 600, color: COLORS.textPrimary}}>视频总结</span>
                <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.amber, padding: '2px 8px', borderRadius: 10, background: COLORS.amberDim}}>bilibili-video-summarizer</span>
                <div style={{flex: 1}} />
                <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted}}>tokens: 2.1k</span>
              </div>

              <div style={{padding: '12px 18px'}}>
                {/* User message */}
                <div style={{display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10, opacity: interpolate(frame, [22, 35], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                  <div style={{width: 26, height: 26, borderRadius: 6, background: GRADIENT.userAvatar, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  </div>
                  <div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2}}>
                      <span style={{fontFamily: FONTS.body, fontSize: 11, fontWeight: 600, color: COLORS.textPrimary}}>你</span>
                      <span style={{fontFamily: FONTS.mono, fontSize: 9, color: COLORS.textMuted}}>09:04</span>
                    </div>
                    <div style={{fontFamily: FONTS.cn, fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.5}}>
                      <span style={{fontFamily: FONTS.mono, color: COLORS.amber, fontWeight: 600}}>@bilibili-video-summarizer</span>{' '}
                      <span style={{fontFamily: FONTS.mono, fontSize: 11, color: COLORS.cyan}}>bilibili.com/video/BV14rzQB9EJj</span>{' '}
                      总结一下这个视频
                    </div>
                  </div>
                </div>

                {/* AI response */}
                <div style={{display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10, opacity: interpolate(frame, [38, 50], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                  <div style={{width: 26, height: 26, borderRadius: 6, background: GRADIENT.aiAvatar, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                  </div>
                  <div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2}}>
                      <span style={{fontFamily: FONTS.body, fontSize: 11, fontWeight: 600, color: COLORS.textPrimary}}>Chat-Skills</span>
                      <span style={{fontFamily: FONTS.mono, fontSize: 9, color: COLORS.textMuted}}>09:05</span>
                    </div>
                    <div style={{fontFamily: FONTS.cn, fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.5}}>
                      我来帮你总结这个B站视频。让我先下载视频并进行语音识别。
                    </div>
                    <div style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted, marginTop: 2}}>
                      Invoking skill <span style={{color: COLORS.amber}}>bilibili-video-summarizer</span>...
                    </div>
                  </div>
                </div>

                {/* Script Execution — ERROR */}
                <div style={{marginLeft: 36, marginBottom: 8, borderRadius: 10, border: `1px solid ${COLORS.red}25`, background: COLORS.bgCard, overflow: 'hidden', opacity: interpolate(frame, [54, 67], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [54, 67], [8, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 12px', background: COLORS.bgGlass, borderBottom: `1px solid ${COLORS.borderGlass}`}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
                      <div style={{width: 7, height: 7, borderRadius: '50%', background: COLORS.red}} />
                      <span style={{fontFamily: FONTS.heading, fontSize: 10, fontWeight: 600, color: COLORS.textPrimary}}>Script Execution</span>
                    </div>
                    <span style={{fontFamily: FONTS.mono, fontSize: 9, color: COLORS.red, padding: '1px 6px', borderRadius: 4, background: COLORS.redDim}}>⊘ Error</span>
                  </div>
                  <div style={{background: COLORS.bgTerminal, padding: '6px 10px'}}>
                    <div style={{display: 'flex', gap: 4, marginBottom: 5}}>
                      <div style={{width: 5, height: 5, borderRadius: '50%', background: COLORS.dotRed}} />
                      <div style={{width: 5, height: 5, borderRadius: '50%', background: COLORS.dotYellow}} />
                      <div style={{width: 5, height: 5, borderRadius: '50%', background: COLORS.dotGreen}} />
                    </div>
                    {ERROR_LINES.map((line, i) => {
                      const lineOp = interpolate(frame, [70 + line.delay, 76 + line.delay], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
                      const isError = line.text.includes('❌');
                      const isCmd = line.text.startsWith('$');
                      return (
                        <div key={i} style={{opacity: lineOp, fontFamily: FONTS.mono, fontSize: 10, color: isError ? COLORS.red : isCmd ? COLORS.green : COLORS.textSecondary, lineHeight: 1.6}}>
                          {line.text}
                        </div>
                      );
                    })}
                  </div>
                  <div style={{padding: '4px 10px', borderTop: `1px solid ${COLORS.borderGlass}`, background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', fontFamily: FONTS.mono, fontSize: 9, color: COLORS.textMuted}}>
                    <span>⏱ 0.8s</span>
                    <span style={{color: COLORS.red}}>exit 1</span>
                  </div>
                </div>

                {/* AI fix message */}
                <div style={{display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8, opacity: interpolate(frame, [100, 113], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                  <div style={{width: 26, height: 26, borderRadius: 6, background: GRADIENT.aiAvatar, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                  </div>
                  <div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2}}>
                      <span style={{fontFamily: FONTS.body, fontSize: 11, fontWeight: 600, color: COLORS.textPrimary}}>Chat-Skills</span>
                      <span style={{fontFamily: FONTS.mono, fontSize: 9, color: COLORS.textMuted}}>09:05</span>
                    </div>
                    <div style={{fontFamily: FONTS.cn, fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.5}}>
                      我发现缺少 <span style={{fontFamily: FONTS.mono, color: COLORS.amber, background: COLORS.amberDim, padding: '1px 5px', borderRadius: 3, fontSize: 11}}>yt_dlp</span> 模块。让我先安装它。
                    </div>
                    <div style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted, marginTop: 2}}>
                      Invoking skill <span style={{color: COLORS.green}}>system</span>... 正在安装依赖...
                    </div>
                  </div>
                </div>

                {/* Script Execution — DONE (pip install) */}
                <div style={{marginLeft: 36, borderRadius: 10, border: `1px solid ${COLORS.green}25`, background: COLORS.bgCard, overflow: 'hidden', opacity: interpolate(frame, [118, 131], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [118, 131], [8, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 12px', background: COLORS.bgGlass, borderBottom: `1px solid ${COLORS.borderGlass}`}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
                      <div style={{width: 7, height: 7, borderRadius: '50%', background: COLORS.green}} />
                      <span style={{fontFamily: FONTS.heading, fontSize: 10, fontWeight: 600, color: COLORS.textPrimary}}>Script Execution</span>
                    </div>
                    <span style={{fontFamily: FONTS.mono, fontSize: 9, color: COLORS.green, padding: '1px 6px', borderRadius: 4, background: COLORS.greenDim}}>✓ Done</span>
                  </div>
                  <div style={{background: COLORS.bgTerminal, padding: '6px 10px'}}>
                    <div style={{display: 'flex', gap: 4, marginBottom: 5}}>
                      <div style={{width: 5, height: 5, borderRadius: '50%', background: COLORS.dotRed}} />
                      <div style={{width: 5, height: 5, borderRadius: '50%', background: COLORS.dotYellow}} />
                      <div style={{width: 5, height: 5, borderRadius: '50%', background: COLORS.dotGreen}} />
                    </div>
                    {FIX_LINES.map((line, i) => {
                      const lineOp = interpolate(frame, [134 + line.delay, 140 + line.delay], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
                      const isSuccess = line.text.includes('Successfully');
                      const isCmd = line.text.startsWith('$');
                      return (
                        <div key={i} style={{opacity: lineOp, fontFamily: FONTS.mono, fontSize: 10, color: isSuccess ? COLORS.green : isCmd ? COLORS.green : COLORS.textSecondary, lineHeight: 1.6}}>
                          {line.text}
                        </div>
                      );
                    })}
                  </div>
                  <div style={{padding: '4px 10px', borderTop: `1px solid ${COLORS.borderGlass}`, background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', fontFamily: FONTS.mono, fontSize: 9, color: COLORS.textMuted}}>
                    <span>⏱ 0.8s</span>
                    <span style={{color: COLORS.green}}>exit 0</span>
                  </div>
                </div>
              </div>

              {/* Input area */}
              <div style={{padding: '8px 16px', borderTop: `1px solid ${COLORS.borderGlass}`, background: 'rgba(255,255,255,0.01)'}}>
                <div style={{padding: '8px 12px', borderRadius: 10, background: COLORS.bgTertiary, border: `1px solid ${COLORS.borderGlass}`, display: 'flex', alignItems: 'center', gap: 8}}>
                  <span style={{fontFamily: FONTS.cn, fontSize: 11, color: COLORS.textMuted}}>输入消息...</span>
                  <div style={{flex: 1}} />
                  <div style={{width: 22, height: 22, borderRadius: 6, background: GRADIENT.brand, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <svg width={10} height={10} viewBox="0 0 24 24" fill="white"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
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
