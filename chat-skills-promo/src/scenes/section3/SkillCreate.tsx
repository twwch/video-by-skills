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

// SKILL_MD_LINES moved inside component for i18n

// Directory tree
const DIR_TREE = [
  {indent: 0, name: 'video-link-parser/', icon: '📁'},
  {indent: 1, name: 'SKILL.md', icon: '📄'},
  {indent: 1, name: 'scripts/', icon: '📁'},
  {indent: 2, name: 'parse_video.py', icon: '🐍'},
  {indent: 2, name: 'setup.sh', icon: '⚙️'},
  {indent: 1, name: 'rules/', icon: '📁'},
  {indent: 2, name: 'output-format.md', icon: '📋'},
];

export const SkillCreate: React.FC = () => {
  const frame = useCurrentFrame();
  const lang = useLanguage();
  const CONTENT = getContent(lang);
  const feature = CONTENT.features[5];

  const SKILL_MD_LINES = [
    '---',
    'name: video-link-parser',
    L(lang, 'description: 解析 YouTube 和 B站视频链接', 'description: Parse YouTube and Bilibili video links'),
    'tags: video, youtube, bilibili',
    'version: 1.0.0',
    '---',
    '',
    '# Video Link Parser',
    L(lang, '支持解析 YouTube / B站 视频信息', 'Parse YouTube / Bilibili video info'),
  ];

  return (
    <AbsoluteFill style={{background: COLORS.bgPrimary}}>
      <PulseGlow color={COLORS.amber} x="55%" y="40%" size={500} />
      <PulseGlow color={COLORS.purple} x="38%" y="65%" size={350} />
      <ParticleField count={18} color={COLORS.amber} seed="skill-create" />
      <Scanlines opacity={0.02} />

      <AbsoluteFill style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'flex-start', gap: 50, width: 1400}}>
          {/* Left — label + skill directory structure */}
          <div style={{width: 420, flexShrink: 0, paddingTop: 30}}>
            <div style={{marginBottom: 6}}>
              <span style={{fontFamily: FONTS.mono, fontSize: 12, color: COLORS.amber, padding: '3px 10px', borderRadius: 12, background: COLORS.amberDim, border: `1px solid ${COLORS.amber}30`}}>
                Feature 06
              </span>
            </div>
            <FeatureLabel title={feature.title} subtitle={feature.subtitle} description={feature.description} enterFrame={10} />

            {/* Skill directory structure card */}
            <div style={{marginTop: 24, opacity: interpolate(frame, [40, 55], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [40, 55], [12, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
              <div style={{padding: '12px 14px', borderRadius: 10, background: COLORS.bgCard, border: `1px solid ${COLORS.borderGlass}`}}>
                <div style={{fontFamily: FONTS.cn, fontSize: 12, color: COLORS.textMuted, marginBottom: 8}}>{L(lang, '技能目录结构', 'Skill Directory Structure')}</div>
                {DIR_TREE.map((item, i) => (
                  <div key={i} style={{display: 'flex', alignItems: 'center', gap: 6, paddingLeft: item.indent * 16, marginBottom: 3, opacity: interpolate(frame, [55 + i * 5, 63 + i * 5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                    <span style={{fontSize: 11}}>{item.icon}</span>
                    <span style={{fontFamily: FONTS.mono, fontSize: 11, color: item.name.endsWith('/') ? COLORS.amber : COLORS.textPrimary}}>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Chat window: create skill */}
          <div style={{flex: 1, opacity: interpolate(frame, [15, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [15, 30], [20, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
            <div style={{borderRadius: 16, border: `1px solid ${COLORS.borderGlass}`, background: `${COLORS.bgSecondary}90`, overflow: 'hidden'}}>
              {/* Top bar */}
              <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderBottom: `1px solid ${COLORS.borderGlass}`, background: 'rgba(255,255,255,0.02)'}}>
                <span style={{fontFamily: FONTS.cn, fontSize: 13, fontWeight: 600, color: COLORS.textPrimary}}>{L(lang, '创建技能', 'Create Skill')}</span>
                <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.amber, padding: '2px 8px', borderRadius: 10, background: COLORS.amberDim}}>skill-creator</span>
                <div style={{flex: 1}} />
                <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted}}>tokens: 1.5k</span>
              </div>

              <div style={{padding: '16px 20px', minHeight: 480}}>
                {/* User message */}
                <div style={{display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 14, opacity: interpolate(frame, [25, 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                  <div style={{width: 28, height: 28, borderRadius: 7, background: GRADIENT.userAvatar, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  </div>
                  <div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3}}>
                      <span style={{fontFamily: FONTS.body, fontSize: 12, fontWeight: 600, color: COLORS.textPrimary}}>{L(lang, '你', 'You')}</span>
                      <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted}}>{L(lang, '刚刚', 'just now')}</span>
                    </div>
                    <div style={{fontFamily: FONTS.cn, fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.5}}>
                      {L(lang, '帮我创建一个解析 YouTube 和 B站视频链接的技能', 'Create a skill to parse YouTube and Bilibili video links')}
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
                      {L(lang, '好的，我来为你创建视频链接解析技能。', 'Sure, I\'ll create a video link parser skill for you.')}
                    </div>
                  </div>
                </div>

                {/* Script Execution — create directory structure */}
                <div style={{marginLeft: 38, marginBottom: 10, borderRadius: 10, border: `1px solid ${COLORS.borderGlass}`, background: COLORS.bgCard, overflow: 'hidden', opacity: interpolate(frame, [62, 75], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [62, 75], [10, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 12px', background: COLORS.bgGlass, borderBottom: `1px solid ${COLORS.borderGlass}`}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
                      <div style={{width: 8, height: 8, borderRadius: '50%', background: COLORS.green}} />
                      <span style={{fontFamily: FONTS.heading, fontSize: 11, fontWeight: 600, color: COLORS.textPrimary}}>Script Execution</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 4, fontFamily: FONTS.mono, fontSize: 9, color: COLORS.green}}>✓ 1</div>
                  </div>
                  <div style={{background: COLORS.bgTerminal, padding: '8px 12px'}}>
                    {[
                      {text: '$ mkdir -p ~/.claude/skills/video-link-parser/{scripts,rules}', delay: 0},
                      {text: '$ touch scripts/parse_video.py scripts/setup.sh', delay: 10},
                      {text: L(lang, '✓ 目录结构和脚本文件已创建', '✓ Directory structure and script files created'), delay: 20},
                    ].map((line, i) => (
                      <div key={i} style={{fontFamily: FONTS.mono, fontSize: 11, color: line.text.includes('✓') ? COLORS.green : COLORS.textMuted, lineHeight: 1.7, whiteSpace: 'pre', opacity: interpolate(frame, [78 + line.delay, 86 + line.delay], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                        {line.text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* SKILL.md content card */}
                <div style={{marginLeft: 38, borderRadius: 10, border: `1px solid ${COLORS.borderGlass}`, background: COLORS.bgCard, overflow: 'hidden', opacity: interpolate(frame, [100, 113], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [100, 113], [10, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', background: COLORS.bgGlass, borderBottom: `1px solid ${COLORS.borderGlass}`}}>
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={COLORS.amber} strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /></svg>
                    <span style={{fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textPrimary}}>SKILL.md</span>
                    <span style={{marginLeft: 'auto', fontFamily: FONTS.mono, fontSize: 9, color: COLORS.green}}>created</span>
                  </div>
                  <div style={{background: COLORS.bgTerminal, padding: '8px 12px'}}>
                    {SKILL_MD_LINES.map((line, i) => {
                      const lineOp = interpolate(frame, [115 + i * 3, 121 + i * 3], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
                      const isFrontmatter = line === '---';
                      const isKey = line.includes(':') && !isFrontmatter && i < 6;
                      const isHeader = line.startsWith('#');
                      return (
                        <div key={i} style={{opacity: lineOp, fontFamily: FONTS.mono, fontSize: 11, lineHeight: 1.7, color: isFrontmatter ? COLORS.textMuted : isKey ? COLORS.amber : isHeader ? COLORS.textPrimary : COLORS.textSecondary, whiteSpace: 'pre'}}>
                          <span style={{color: COLORS.textMuted, opacity: 0.3, marginRight: 10, fontSize: 9}}>{String(i + 1).padStart(2, ' ')}</span>
                          {line}
                        </div>
                      );
                    })}
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
                      {L(lang, '技能 ', 'Skill ')}<span style={{fontFamily: FONTS.mono, color: COLORS.amber}}>video-link-parser</span>{L(lang, ' 已创建！支持 YouTube 和 B站链接解析。', ' created! Supports YouTube and Bilibili link parsing.')}
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
