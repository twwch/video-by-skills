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

// Terminal output from `npx skills find ui ux`
const FIND_LINES = [
  {text: '$ npx skills find ui ux', color: COLORS.textPrimary},
  {text: ''},
  {text: ' ____  _  __ ___ _     _     ____', color: COLORS.green},
  {text: '/ ___|| |/ /|_ _| |   | |   / ___|', color: COLORS.green},
  {text: '\\___ \\| \' /  | || |   | |   \\___ \\', color: COLORS.green},
  {text: ' ___) | . \\\\ | || |___| |___ ___) |', color: COLORS.green},
  {text: '|____/|_|\\_\\___|_____|_____|____/', color: COLORS.green},
  {text: ''},
  {text: 'Install with npx skills add <owner/repo@skill>', color: COLORS.textMuted},
  {text: 'onmax/nuxt-skills@nuxt-ui', color: COLORS.textSecondary},
  {text: ' \u2514 https://skills.sh/onmax/nuxt-skills/nuxt-ui', color: COLORS.textMuted},
  {text: 'sickn33/antigravity-awesome-skills@ui-ux-pro-max', color: COLORS.textSecondary},
  {text: 'onmax/nuxt-skills@reka-ui', color: COLORS.textSecondary},
];

// INSTALLED_SKILLS moved inside component for i18n

// Avatars
const UserAvatar: React.FC = () => (
  <div style={{width: 28, height: 28, borderRadius: 7, background: GRADIENT.userAvatar, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
  </div>
);
const AiAvatar: React.FC = () => (
  <div style={{width: 28, height: 28, borderRadius: 7, background: GRADIENT.aiAvatar, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
  </div>
);

// Bash code block (install command)
const BashBlock: React.FC<{command: string; enterFrame: number}> = ({command, enterFrame}) => {
  const frame = useCurrentFrame();
  const e = frame - enterFrame;
  const opacity = interpolate(e, [0, 12], [0, 1], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const slideY = interpolate(e, [0, 12], [8, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <div style={{marginTop: 8, borderRadius: 12, border: `1px solid ${COLORS.borderGlass}`, background: COLORS.bgCard, overflow: 'hidden', opacity, transform: `translateY(${slideY}px)`}}>
      {/* Header */}
      <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: COLORS.bgGlass, borderBottom: `1px solid ${COLORS.borderGlass}`}}>
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={COLORS.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
        <span style={{fontFamily: FONTS.heading, fontSize: 12, fontWeight: 600, color: COLORS.textPrimary}}>Bash</span>
        <div style={{flex: 1}} />
        <div style={{display: 'flex', alignItems: 'center', gap: 4, fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted}}>
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
          Download
        </div>
      </div>
      {/* macOS dots */}
      <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
        <div style={{width: 8, height: 8, borderRadius: '50%', background: COLORS.dotRed}} />
        <div style={{width: 8, height: 8, borderRadius: '50%', background: COLORS.dotYellow}} />
        <div style={{width: 8, height: 8, borderRadius: '50%', background: COLORS.dotGreen}} />
      </div>
      {/* Code */}
      <div style={{padding: '12px 14px', background: COLORS.bgTerminal}}>
        <div style={{fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textSecondary, lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-all'}}>
          {command}
        </div>
      </div>
    </div>
  );
};

export const SkillFind: React.FC = () => {
  const frame = useCurrentFrame();
  const lang = useLanguage();
  const CONTENT = getContent(lang);
  const feature = CONTENT.features[4];

  const INSTALLED_SKILLS = [
    {name: 'find-skills', icon: '\uD83D\uDD0D', desc: L(lang, '技能查找助手', 'Skill Finder'), color: COLORS.blue},
    {name: 'code-review', icon: '\uD83D\uDD0E', desc: L(lang, '代码审查', 'Code Review'), color: COLORS.purple},
    {name: 'remotion-best-practices', icon: '\uD83C\uDFAC', desc: L(lang, 'Remotion 最佳实践', 'Remotion Best Practices'), color: COLORS.green},
    {name: 'skill-creator', icon: '\uD83D\uDEE0\uFE0F', desc: L(lang, '技能创建向导', 'Skill Creator'), color: COLORS.amber},
  ];

  // Scroll to reveal AI recommendation after Script Execution card
  const scrollY = interpolate(frame, [110, 138], [0, -320], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{background: COLORS.bgPrimary}}>
      <PulseGlow color={COLORS.blue} x="55%" y="45%" size={500} />
      <PulseGlow color={COLORS.cyan} x="38%" y="60%" size={350} />
      <ParticleField count={18} color={COLORS.blue} seed="skill-find" />
      <Scanlines opacity={0.02} />

      <AbsoluteFill style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'flex-start', gap: 50, width: 1400}}>
          {/* Left — label + installed skills */}
          <div style={{width: 420, flexShrink: 0, paddingTop: 30}}>
            <div style={{marginBottom: 6}}>
              <span style={{fontFamily: FONTS.mono, fontSize: 12, color: COLORS.blue, padding: '3px 10px', borderRadius: 12, background: COLORS.blueDim, border: `1px solid ${COLORS.blue}30`}}>
                Feature 05
              </span>
            </div>
            <FeatureLabel title={feature.title} subtitle={feature.subtitle} description={feature.description} enterFrame={10} />

            {/* Installed skills card */}
            <div style={{marginTop: 24, opacity: interpolate(frame, [35, 50], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [35, 50], [12, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
              <div style={{padding: '12px 14px', borderRadius: 10, background: COLORS.bgCard, border: `1px solid ${COLORS.borderGlass}`}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10}}>
                  <span style={{fontFamily: FONTS.cn, fontSize: 13, color: COLORS.textSecondary}}>{L(lang, '已安装技能', 'Installed Skills')}</span>
                  <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.green, padding: '2px 8px', borderRadius: 4, background: COLORS.greenDim}}>{INSTALLED_SKILLS.length} installed</span>
                </div>
                {INSTALLED_SKILLS.map((skill, i) => (
                  <div key={i} style={{display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px', borderRadius: 6, marginBottom: 2, opacity: interpolate(frame, [48 + i * 5, 56 + i * 5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), background: i === 0 ? `${skill.color}08` : 'transparent'}}>
                    <span style={{fontSize: 13}}>{skill.icon}</span>
                    <div style={{fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textPrimary}}>{skill.name}</div>
                    <div style={{flex: 1}} />
                    <div style={{width: 5, height: 5, borderRadius: '50%', background: skill.color, opacity: 0.6}} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Chat window */}
          <div style={{flex: 1, opacity: interpolate(frame, [15, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [15, 30], [20, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
            <div style={{borderRadius: 16, border: `1px solid ${COLORS.borderGlass}`, background: `${COLORS.bgSecondary}90`, overflow: 'hidden'}}>
              {/* Top bar */}
              <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderBottom: `1px solid ${COLORS.borderGlass}`, background: 'rgba(255,255,255,0.02)'}}>
                <span style={{fontFamily: FONTS.cn, fontSize: 13, fontWeight: 600, color: COLORS.textPrimary}}>{L(lang, '查找技能', 'Find Skills')}</span>
                <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.blue, padding: '2px 8px', borderRadius: 10, background: COLORS.blueDim}}>system</span>
                <div style={{flex: 1}} />
                <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted}}>tokens: 0.8k</span>
              </div>

              {/* Scrolling chat content */}
              <div style={{overflow: 'hidden', height: 480}}>
                <div style={{padding: '16px 20px', transform: `translateY(${scrollY}px)`}}>
                  {/* User message */}
                  <div style={{display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 14, opacity: interpolate(frame, [25, 38], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                    <UserAvatar />
                    <div>
                      <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3}}>
                        <span style={{fontFamily: FONTS.body, fontSize: 12, fontWeight: 600, color: COLORS.textPrimary}}>{L(lang, '你', 'You')}</span>
                        <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted}}>{L(lang, '刚刚', 'just now')}</span>
                      </div>
                      <div style={{fontFamily: FONTS.cn, fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.5}}>
                        ui-ux 的 skill
                      </div>
                    </div>
                  </div>

                  {/* AI response — invoking */}
                  <div style={{display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 14, opacity: interpolate(frame, [40, 53], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                    <AiAvatar />
                    <div>
                      <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3}}>
                        <span style={{fontFamily: FONTS.body, fontSize: 12, fontWeight: 600, color: COLORS.textPrimary}}>Chat-Skills</span>
                        <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted}}>{L(lang, '刚刚', 'just now')}</span>
                      </div>
                      <div style={{fontFamily: FONTS.cn, fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.8}}>
                        {L(lang, '我来搜索 UI/UX 相关的技能。', 'Let me search for UI/UX related skills.')}
                        <br />
                        <span style={{color: COLORS.textMuted}}>Invoking skill <span style={{fontFamily: FONTS.mono, color: COLORS.blue}}>system</span>...</span>
                        <br />
                        <span style={{color: COLORS.textMuted}}>{L(lang, '正在搜索 UI/UX 相关的技能...', 'Searching for UI/UX skills...')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Script Execution card */}
                  <div style={{marginLeft: 38, borderRadius: 16, border: `1px solid ${COLORS.borderGlass}`, background: COLORS.bgCard, overflow: 'hidden', opacity: interpolate(frame, [58, 70], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [58, 70], [10, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
                    {/* Header */}
                    <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: COLORS.bgGlass, borderBottom: `1px solid ${COLORS.borderGlass}`}}>
                      <div style={{width: 26, height: 26, borderRadius: 8, background: COLORS.greenDim, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={COLORS.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>
                      </div>
                      <span style={{fontFamily: FONTS.heading, fontSize: 13, fontWeight: 600, color: COLORS.textPrimary}}>Script Execution</span>
                      <div style={{flex: 1}} />
                      <div style={{display: 'flex', alignItems: 'center', gap: 5, padding: '2px 8px', borderRadius: 10, background: COLORS.greenDim, fontFamily: FONTS.mono, fontSize: 11, fontWeight: 500, color: COLORS.green}}>
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={COLORS.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        Done
                      </div>
                    </div>

                    {/* Terminal */}
                    <div style={{background: COLORS.bgTerminal, fontFamily: FONTS.mono, fontSize: 11, lineHeight: 1.7}}>
                      {/* macOS dots */}
                      <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                        <div style={{width: 8, height: 8, borderRadius: '50%', background: COLORS.dotRed}} />
                        <div style={{width: 8, height: 8, borderRadius: '50%', background: COLORS.dotYellow}} />
                        <div style={{width: 8, height: 8, borderRadius: '50%', background: COLORS.dotGreen}} />
                      </div>
                      <div style={{padding: 14}}>
                        {FIND_LINES.map((line, i) => {
                          const lineEnter = 72 + i * 2;
                          const lineOpacity = interpolate(frame, [lineEnter, lineEnter + 6], [0, 1], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
                          return (
                            <div key={i} style={{opacity: lineOpacity, color: line.color || COLORS.textMuted, whiteSpace: 'pre', lineHeight: line.text === '' ? 0.8 : 1.7}}>
                              {line.text || '\u00A0'}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Footer */}
                    <div style={{padding: '8px 14px', borderTop: `1px solid ${COLORS.borderGlass}`, background: 'rgba(255,255,255,0.02)', display: 'flex', gap: 16, fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textMuted}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                        <span style={{fontWeight: 600, color: COLORS.textSecondary}}>0.0s</span>
                      </div>
                      <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>
                        <span style={{fontWeight: 600, color: COLORS.textSecondary}}>exit 0</span>
                      </div>
                    </div>
                  </div>

                  {/* AI recommendation */}
                  <div style={{display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 14, opacity: interpolate(frame, [120, 133], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                    <AiAvatar />
                    <div style={{flex: 1, minWidth: 0}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3}}>
                        <span style={{fontFamily: FONTS.body, fontSize: 12, fontWeight: 600, color: COLORS.textPrimary}}>Chat-Skills</span>
                      </div>
                      <div style={{fontFamily: FONTS.cn, fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.8}}>
                        {L(lang, '找到了！这里有几个专门的 UI/UX 技能：', 'Found them! Here are some dedicated UI/UX skills:')}
                        <br /><br />
                        <span style={{fontWeight: 600, color: COLORS.textPrimary}}>{L(lang, '推荐的 UI/UX 技能', 'Recommended UI/UX Skills')}</span>
                        <br />
                        <span style={{fontWeight: 600, color: COLORS.textPrimary}}>{'1. ui-ux-pro-max '}</span>
                        <span style={{color: COLORS.amber}}>{'\u2B50'}{L(lang, '(推荐)', '(Recommended)')}</span>
                        <br />
                        {L(lang, '专业的 UI/UX 设计技能，提供全面的设计指导。', 'Professional UI/UX design skill with comprehensive guidance.')}
                        <br />
                        {L(lang, '安装命令：', 'Install command:')}
                      </div>

                      {/* Bash code block */}
                      <BashBlock
                        command="npx skills add sickn33/antigravity-awesome-skills@ui-ux-pro-max"
                        enterFrame={140}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Input area */}
              <div style={{padding: '10px 16px', borderTop: `1px solid ${COLORS.borderGlass}`, background: 'rgba(255,255,255,0.01)'}}>
                <div style={{padding: '10px 14px', borderRadius: 10, background: COLORS.bgTertiary, border: `1px solid ${COLORS.borderGlass}`, display: 'flex', alignItems: 'center', gap: 8}}>
                  <span style={{fontFamily: FONTS.cn, fontSize: 12, color: COLORS.textMuted}}>{L(lang, '输入消息...', 'Type a message...')}</span>
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
