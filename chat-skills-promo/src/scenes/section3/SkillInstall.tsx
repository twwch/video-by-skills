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

const INSTALL_LINES = [
  {text: '$ npx skills add twwch/video-link-parser-skill@video-link-parser', delay: 0},
  {text: '  ⠋ 正在获取技能信息...', delay: 12},
  {text: '  ✓ 验证技能仓库', delay: 24},
  {text: '  ✓ 下载 SKILL.md + scripts/', delay: 36},
  {text: '  ✓ 安装到 ~/.claude/skills/', delay: 48},
  {text: '  ✅ 技能安装成功!', delay: 60},
];

export const SkillInstall: React.FC = () => {
  const frame = useCurrentFrame();
  const feature = CONTENT.features[6];

  return (
    <AbsoluteFill style={{background: COLORS.bgPrimary}}>
      <PulseGlow color={COLORS.green} x="55%" y="45%" size={500} />
      <PulseGlow color={COLORS.blue} x="38%" y="60%" size={350} />
      <ParticleField count={18} color={COLORS.green} seed="skill-install" />
      <Scanlines opacity={0.02} />

      <AbsoluteFill style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'flex-start', gap: 50, width: 1400}}>
          {/* Left — label + install dialog UI */}
          <div style={{width: 420, flexShrink: 0, paddingTop: 30}}>
            <div style={{marginBottom: 6}}>
              <span style={{fontFamily: FONTS.mono, fontSize: 12, color: COLORS.green, padding: '3px 10px', borderRadius: 12, background: COLORS.greenDim, border: `1px solid ${COLORS.green}30`}}>
                Feature 07
              </span>
            </div>
            <FeatureLabel title={feature.title} subtitle={feature.subtitle} description={feature.description} enterFrame={10} />

            {/* Add Skill Dialog card */}
            <div style={{marginTop: 24, opacity: interpolate(frame, [40, 55], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [40, 55], [12, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
              <div style={{padding: '14px 16px', borderRadius: 12, background: COLORS.bgCard, border: `1px solid ${COLORS.borderGlass}`}}>
                <div style={{fontFamily: FONTS.cn, fontSize: 14, fontWeight: 600, color: COLORS.textPrimary, marginBottom: 4}}>添加技能</div>
                <div style={{fontFamily: FONTS.cn, fontSize: 11, color: COLORS.textMuted, marginBottom: 12}}>输入技能仓库地址来安装新技能</div>
                {/* Input field */}
                <div style={{padding: '8px 12px', borderRadius: 8, background: COLORS.bgTerminal, border: `1px solid ${COLORS.borderGlass}`, marginBottom: 10}}>
                  <div style={{fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textPrimary}}>
                    npx skills add <span style={{color: COLORS.green}}>owner/repo@branch</span>
                  </div>
                </div>
                {/* Example */}
                <div style={{fontFamily: FONTS.cn, fontSize: 10, color: COLORS.textMuted, marginBottom: 8}}>示例：</div>
                <div style={{padding: '6px 10px', borderRadius: 6, background: COLORS.bgGlass, fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textSecondary, wordBreak: 'break-all' as const, lineHeight: 1.5}}>
                  npx skills add twwch/video-link-parser-skill@video-link-parser
                </div>
                {/* Install button */}
                <div style={{marginTop: 12, padding: '8px 0', borderRadius: 8, background: GRADIENT.brand, textAlign: 'center', fontFamily: FONTS.cn, fontSize: 13, fontWeight: 600, color: 'white'}}>
                  安装技能
                </div>
              </div>
            </div>
          </div>

          {/* Right — Chat window: install skill */}
          <div style={{flex: 1, opacity: interpolate(frame, [15, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [15, 30], [20, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
            <div style={{borderRadius: 16, border: `1px solid ${COLORS.borderGlass}`, background: `${COLORS.bgSecondary}90`, overflow: 'hidden'}}>
              {/* Top bar */}
              <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderBottom: `1px solid ${COLORS.borderGlass}`, background: 'rgba(255,255,255,0.02)'}}>
                <span style={{fontFamily: FONTS.cn, fontSize: 13, fontWeight: 600, color: COLORS.textPrimary}}>安装技能</span>
                <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.green, padding: '2px 8px', borderRadius: 10, background: COLORS.greenDim}}>terminal</span>
                <div style={{flex: 1}} />
                <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted}}>tokens: 1.2k</span>
              </div>

              <div style={{padding: '16px 20px', minHeight: 480}}>
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
                      安装 video-link-parser 技能
                    </div>
                  </div>
                </div>

                {/* AI response */}
                <div style={{display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 14, opacity: interpolate(frame, [45, 58], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                  <div style={{width: 28, height: 28, borderRadius: 7, background: GRADIENT.aiAvatar, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                  </div>
                  <div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3}}>
                      <span style={{fontFamily: FONTS.body, fontSize: 12, fontWeight: 600, color: COLORS.textPrimary}}>Chat-Skills</span>
                    </div>
                    <div style={{fontFamily: FONTS.cn, fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.5}}>
                      好的，正在为你安装视频链接解析技能。
                    </div>
                  </div>
                </div>

                {/* Script Execution — install */}
                <div style={{marginLeft: 38, borderRadius: 10, border: `1px solid ${COLORS.borderGlass}`, background: COLORS.bgCard, overflow: 'hidden', opacity: interpolate(frame, [62, 75], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [62, 75], [10, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 12px', background: COLORS.bgGlass, borderBottom: `1px solid ${COLORS.borderGlass}`}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
                      <div style={{width: 8, height: 8, borderRadius: '50%', background: frame >= 155 ? COLORS.green : COLORS.amber}} />
                      <span style={{fontFamily: FONTS.heading, fontSize: 11, fontWeight: 600, color: COLORS.textPrimary}}>Script Execution</span>
                    </div>
                    <div style={{display: 'flex', gap: 0}}>
                      {['Terminal', 'Files'].map((tab, ti) => (
                        <div key={ti} style={{padding: '2px 8px', fontFamily: FONTS.mono, fontSize: 9, color: ti === 0 ? COLORS.green : COLORS.textMuted, borderBottom: ti === 0 ? `2px solid ${COLORS.green}` : '2px solid transparent'}}>{tab}</div>
                      ))}
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 4, fontFamily: FONTS.mono, fontSize: 9, color: frame >= 155 ? COLORS.green : COLORS.amber}}>
                      {frame >= 155 ? '✓' : '●'} <span>1</span>
                    </div>
                  </div>
                  <div style={{background: COLORS.bgTerminal, padding: '8px 12px'}}>
                    <div style={{display: 'flex', gap: 5, marginBottom: 6}}>
                      <div style={{width: 6, height: 6, borderRadius: '50%', background: COLORS.dotRed}} />
                      <div style={{width: 6, height: 6, borderRadius: '50%', background: COLORS.dotYellow}} />
                      <div style={{width: 6, height: 6, borderRadius: '50%', background: COLORS.dotGreen}} />
                    </div>
                    {INSTALL_LINES.map((line, i) => {
                      const lineElapsed = frame - 78 - line.delay * 0.5;
                      const opacity = interpolate(lineElapsed, [0, 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
                      const isSuccess = line.text.includes('✓') || line.text.includes('✅');
                      const isCmd = line.text.startsWith('$');
                      return (
                        <div key={i} style={{opacity, fontFamily: FONTS.mono, fontSize: 11, color: isSuccess ? COLORS.green : isCmd ? COLORS.textPrimary : COLORS.textSecondary, lineHeight: 1.7, whiteSpace: 'pre'}}>
                          {line.text}
                        </div>
                      );
                    })}
                  </div>
                  <div style={{padding: '5px 12px', borderTop: `1px solid ${COLORS.borderGlass}`, background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted}}>
                    <span>耗时 2.8s</span>
                    <span>exit code: 0</span>
                  </div>
                </div>

                {/* AI follow-up */}
                <div style={{display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 12, opacity: interpolate(frame, [160, 175], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                  <div style={{width: 28, height: 28, borderRadius: 7, background: GRADIENT.aiAvatar, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                  </div>
                  <div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3}}>
                      <span style={{fontFamily: FONTS.body, fontSize: 12, fontWeight: 600, color: COLORS.textPrimary}}>Chat-Skills</span>
                    </div>
                    <div style={{fontFamily: FONTS.cn, fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.5}}>
                      安装完成！现在可以使用 <span style={{fontFamily: FONTS.mono, color: COLORS.green}}>@video-link-parser</span> 来解析视频链接。
                    </div>
                  </div>
                </div>
              </div>

              {/* Input area with new skill chip */}
              <div style={{padding: '10px 16px', borderTop: `1px solid ${COLORS.borderGlass}`, background: 'rgba(255,255,255,0.01)'}}>
                <div style={{display: 'flex', gap: 6, marginBottom: 8, alignItems: 'center'}}>
                  {CONTENT.skills.slice(0, 3).map((skill, i) => (
                    <div key={i} style={{padding: '3px 10px', borderRadius: 12, background: COLORS.bgCard, border: `1px solid ${COLORS.borderGlass}`, fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted, display: 'flex', alignItems: 'center', gap: 4}}>
                      <span style={{fontSize: 10}}>{skill.icon}</span>
                      {skill.name}
                    </div>
                  ))}
                  {/* Newly installed chip */}
                  <div style={{padding: '3px 10px', borderRadius: 12, background: `${COLORS.green}10`, border: `1px solid ${COLORS.green}25`, fontFamily: FONTS.mono, fontSize: 10, color: COLORS.green, display: 'flex', alignItems: 'center', gap: 4, opacity: interpolate(frame, [165, 180], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `scale(${interpolate(frame, [165, 180], [0.8, 1], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})})`}}>
                    <span style={{fontSize: 10}}>🎬</span>
                    video-link-parser
                  </div>
                </div>
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
