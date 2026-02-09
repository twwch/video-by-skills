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

// DOWNLOAD_LINES, WHISPER_LINES, SUMMARY_CONTENT, PIPELINE_STEPS moved inside component for i18n

// Shared avatar components
const UserAvatar: React.FC = () => (
  <div style={{width: 26, height: 26, borderRadius: 6, background: GRADIENT.userAvatar, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
  </div>
);

const AiAvatar: React.FC = () => (
  <div style={{width: 26, height: 26, borderRadius: 6, background: GRADIENT.aiAvatar, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
  </div>
);

// Script Execution card component
const ScriptCard: React.FC<{
  lines: {text: string; d: number}[];
  baseFrame: number;
  enterFrame: number;
  frame: number;
  exitCode: number;
  duration: string;
}> = ({lines, baseFrame, enterFrame, frame, exitCode, duration}) => {
  const cardOp = interpolate(frame, [enterFrame, enterFrame + 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const cardY = interpolate(frame, [enterFrame, enterFrame + 12], [8, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const isDone = exitCode === 0;
  return (
    <div style={{marginLeft: 36, marginBottom: 8, borderRadius: 10, border: `1px solid ${isDone ? COLORS.green : COLORS.red}25`, background: COLORS.bgCard, overflow: 'hidden', opacity: cardOp, transform: `translateY(${cardY}px)`}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 12px', background: COLORS.bgGlass, borderBottom: `1px solid ${COLORS.borderGlass}`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
          <div style={{width: 7, height: 7, borderRadius: '50%', background: COLORS.green}} />
          <span style={{fontFamily: FONTS.heading, fontSize: 10, fontWeight: 600, color: COLORS.textPrimary}}>Script Execution</span>
        </div>
        <span style={{fontFamily: FONTS.mono, fontSize: 9, color: COLORS.green, padding: '1px 6px', borderRadius: 4, background: COLORS.greenDim}}>✓ Done</span>
      </div>
      <div style={{background: COLORS.bgTerminal, padding: '5px 10px'}}>
        <div style={{display: 'flex', gap: 4, marginBottom: 4}}>
          <div style={{width: 5, height: 5, borderRadius: '50%', background: COLORS.dotRed}} />
          <div style={{width: 5, height: 5, borderRadius: '50%', background: COLORS.dotYellow}} />
          <div style={{width: 5, height: 5, borderRadius: '50%', background: COLORS.dotGreen}} />
        </div>
        {lines.map((line, i) => {
          const lineOp = interpolate(frame, [baseFrame + line.d, baseFrame + line.d + 4], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const isCmd = line.text.startsWith('$');
          const isSuccess = line.text.includes('✅');
          const isSeparator = line.text.startsWith('===');
          return (
            <div key={i} style={{opacity: lineOp, fontFamily: FONTS.mono, fontSize: 9, color: isSuccess ? COLORS.green : isCmd ? COLORS.green : isSeparator ? COLORS.textMuted : COLORS.textSecondary, lineHeight: 1.5}}>
              {line.text}
            </div>
          );
        })}
      </div>
      <div style={{padding: '4px 10px', borderTop: `1px solid ${COLORS.borderGlass}`, background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', fontFamily: FONTS.mono, fontSize: 9, color: COLORS.textMuted}}>
        <span>⏱ {duration}</span>
        <span style={{color: isDone ? COLORS.green : COLORS.red}}>exit {exitCode}</span>
      </div>
    </div>
  );
};

export const FullDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const lang = useLanguage();
  const CONTENT = getContent(lang);
  const feature = CONTENT.features[8];

  const DOWNLOAD_LINES = [
    {text: '$ python3 .../download_video.py https://www.bilibili.com/video/BV14rzQB9EJj', d: 0},
    {text: '[BiliBili] Extracting URL: https://www.bilibili.com/video/BV14rzQB9EJj', d: 4},
    {text: L(lang, '🎬 开始下载视频: https://www.bilibili.com/video/BV14rzQB9EJj', '🎬 Downloading video: https://www.bilibili.com/video/BV14rzQB9EJj'), d: 8},
    {text: L(lang, '📁 输出目录: /tmp/chat-skills-output/bilibili-video-summarizer/downloads', '📁 Output dir: /tmp/chat-skills-output/bilibili-video-summarizer/downloads'), d: 11},
    {text: '[BiliBili] BV14rzQB9EJj: Downloading webpage', d: 14},
    {text: '[BiliBili] BV14rzQB9EJj: Extracting videos in anthology', d: 17},
    {text: '[BiliBili] BV14rzQB9EJj: Downloading wbi sign', d: 20},
    {text: '[BiliBili] BV14rzQB9EJj: Downloading video formats for cid 3560204...', d: 23},
  ];

  const WHISPER_LINES = [
    {text: '$ python3 .../transcribe_audio.py .../downloads/BV14rzQB9EJj.m4a', d: 0},
    {text: L(lang, '🔧 开始识别: .../downloads/BV14rzQB9EJj.m4a', '🔧 Starting recognition: .../downloads/BV14rzQB9EJj.m4a'), d: 4},
    {text: L(lang, '🧠 模型: base', '🧠 Model: base'), d: 7},
    {text: L(lang, '📦 加载 Whisper 模型: base', '📦 Loading Whisper model: base'), d: 10},
    {text: L(lang, '🔧 开始识别音频: BV14rzQB9EJj.m4a', '🔧 Recognizing audio: BV14rzQB9EJj.m4a'), d: 13},
    {text: '===================================================', d: 17},
    {text: L(lang, '✅ 识别完成', '✅ Recognition complete'), d: 20},
    {text: L(lang, '📄 转录文本: .../downloads/BV14rzQB9EJj_transcript.txt', '📄 Transcript: .../downloads/BV14rzQB9EJj_transcript.txt'), d: 23},
  ];

  const SUMMARY_CONTENT = [
    {text: L(lang, '标题: Claude Code 从 0 到 1 全攻略: MCP / SubAgent / Agent Skill / Hook', 'Title: Claude Code From 0 to 1: MCP / SubAgent / Agent Skill / Hook'), type: 'meta'},
    {text: L(lang, '时长: 44分44秒 | 链接: bilibili.com/video/BV14rzQB9EJj', 'Duration: 44m44s | Link: bilibili.com/video/BV14rzQB9EJj'), type: 'meta'},
    {text: L(lang, '🎯 核心内容概述', '🎯 Core Overview'), type: 'header'},
    {text: L(lang, '从零到精通 Claude Code 的完整实战教程，涵盖环境搭建、任务处理、多模态交互、高级功能定制等流程。', 'A complete hands-on tutorial for mastering Claude Code from scratch, covering environment setup, task processing, multimodal interaction, and advanced customization.'), type: 'body'},
    {text: L(lang, '📁 内容结构（按时间线）', '📁 Content Structure (Timeline)'), type: 'header'},
    {text: L(lang, '1. 安装与登录 — 订阅制 / API key 两种登录方式', '1. Install & Login — Subscription / API key login methods'), type: 'item'},
    {text: L(lang, '2. 三种工作模式 — 默认/自动/规划，Shift+Tab 切换', '2. Three Modes — Default/Auto/Plan, Shift+Tab to switch'), type: 'item'},
    {text: L(lang, '3. 技术栈迁移 — HTML 重构为 React + TypeScript + Vite', '3. Stack Migration — HTML refactored to React + TypeScript + Vite'), type: 'item'},
    {text: L(lang, '4. 权限管理 — 终端命令需单独授权，危险参数慎用', '4. Permission Control — Terminal commands need authorization'), type: 'item'},
  ];

  const PIPELINE_STEPS = [
    {label: L(lang, '下载视频', 'Download Video'), completedAt: 100},
    {label: L(lang, '语音识别', 'Speech Recognition'), completedAt: 218},
    {label: L(lang, '生成摘要', 'Generate Summary'), completedAt: 270},
  ];

  // Smooth scroll: phase1 → phase2 → phase3
  const scroll1 = interpolate(frame, [118, 145], [0, -240], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const scroll2 = interpolate(frame, [232, 258], [0, -160], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const scrollY = scroll1 + scroll2;

  return (
    <AbsoluteFill style={{background: COLORS.bgPrimary}}>
      <PulseGlow color={COLORS.cyan} x="50%" y="40%" size={500} />
      <PulseGlow color={COLORS.green} x="42%" y="62%" size={400} />
      <ParticleField count={20} color={COLORS.cyan} seed="full-demo" />
      <Scanlines opacity={0.02} />

      <AbsoluteFill style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'flex-start', gap: 50, width: 1400}}>
          {/* Left — label + pipeline + skill info */}
          <div style={{width: 420, flexShrink: 0, paddingTop: 30}}>
            <div style={{marginBottom: 6}}>
              <span style={{fontFamily: FONTS.mono, fontSize: 12, color: COLORS.cyan, padding: '3px 10px', borderRadius: 12, background: `${COLORS.cyan}15`, border: `1px solid ${COLORS.cyan}30`}}>
                Feature 09
              </span>
            </div>
            <FeatureLabel title={feature.title} subtitle={feature.subtitle} description={feature.description} enterFrame={10} />

            {/* Processing pipeline */}
            <div style={{marginTop: 24, opacity: interpolate(frame, [35, 50], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [35, 50], [12, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
              <div style={{padding: '14px 16px', borderRadius: 10, background: COLORS.bgCard, border: `1px solid ${COLORS.borderGlass}`}}>
                <div style={{fontFamily: FONTS.cn, fontSize: 12, fontWeight: 600, color: COLORS.textPrimary, marginBottom: 12}}>{L(lang, '处理流程', 'Processing Pipeline')}</div>
                {PIPELINE_STEPS.map((step, i) => {
                  const done = frame >= step.completedAt;
                  const stepOp = interpolate(frame, [40 + i * 12, 52 + i * 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
                  return (
                    <div key={i} style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: i < 2 ? 10 : 0, opacity: stepOp}}>
                      <div style={{width: 22, height: 22, borderRadius: '50%', background: done ? COLORS.greenDim : COLORS.bgGlass, border: `1.5px solid ${done ? COLORS.green : COLORS.borderGlass}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                        {done && <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.green}}>✓</span>}
                      </div>
                      <span style={{fontFamily: FONTS.cn, fontSize: 12, color: done ? COLORS.textPrimary : COLORS.textMuted}}>{step.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Skill info */}
            <div style={{marginTop: 14, opacity: interpolate(frame, [55, 68], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
              <div style={{padding: '10px 14px', borderRadius: 8, background: COLORS.bgCard, border: `1px solid ${COLORS.borderGlass}`, display: 'flex', alignItems: 'center', gap: 10}}>
                <span style={{fontSize: 16}}>📺</span>
                <div>
                  <div style={{fontFamily: FONTS.mono, fontSize: 11, fontWeight: 600, color: COLORS.textPrimary}}>bilibili-video-summarizer <span style={{fontSize: 9, color: COLORS.textMuted, fontWeight: 400}}>v1.2.0</span></div>
                  <div style={{fontFamily: FONTS.cn, fontSize: 10, color: COLORS.textMuted}}>{L(lang, 'B站视频下载 + Whisper 转录 + AI 摘要', 'Bilibili Download + Whisper Transcription + AI Summary')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Scrolling chat window */}
          <div style={{flex: 1, opacity: interpolate(frame, [15, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [15, 30], [20, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
            <div style={{borderRadius: 16, border: `1px solid ${COLORS.borderGlass}`, background: `${COLORS.bgSecondary}90`, overflow: 'hidden'}}>
              {/* Top bar */}
              <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderBottom: `1px solid ${COLORS.borderGlass}`, background: 'rgba(255,255,255,0.02)'}}>
                <span style={{fontFamily: FONTS.cn, fontSize: 13, fontWeight: 600, color: COLORS.textPrimary}}>{L(lang, '视频总结', 'Video Summary')}</span>
                <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.cyan, padding: '2px 8px', borderRadius: 10, background: `${COLORS.cyan}15`}}>bilibili-video-summarizer</span>
                <div style={{flex: 1}} />
                <span style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted}}>tokens: 3.2k</span>
              </div>

              {/* Scrollable content area */}
              <div style={{height: 440, overflow: 'hidden', position: 'relative'}}>
                <div style={{padding: '12px 18px', transform: `translateY(${scrollY}px)`}}>

                  {/* === Phase 1: User + AI + Download === */}

                  {/* User message */}
                  <div style={{display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10, opacity: interpolate(frame, [22, 35], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                    <UserAvatar />
                    <div>
                      <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2}}>
                        <span style={{fontFamily: FONTS.body, fontSize: 11, fontWeight: 600, color: COLORS.textPrimary}}>{L(lang, '你', 'You')}</span>
                        <span style={{fontFamily: FONTS.mono, fontSize: 9, color: COLORS.textMuted}}>09:04</span>
                      </div>
                      <div style={{fontFamily: FONTS.cn, fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.5}}>
                        <span style={{fontFamily: FONTS.mono, color: COLORS.cyan, fontWeight: 600}}>@bilibili-video-summarizer</span>{' '}
                        <span style={{fontFamily: FONTS.mono, fontSize: 10, color: '#00A1D6'}}>bilibili.com/video/BV14rzQB9EJj</span>{' '}
                        {L(lang, '总结一下这个视频', 'Summarize this video')}
                      </div>
                    </div>
                  </div>

                  {/* AI response 1: downloading */}
                  <div style={{display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10, opacity: interpolate(frame, [38, 50], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                    <AiAvatar />
                    <div>
                      <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2}}>
                        <span style={{fontFamily: FONTS.body, fontSize: 11, fontWeight: 600, color: COLORS.textPrimary}}>Chat-Skills</span>
                        <span style={{fontFamily: FONTS.mono, fontSize: 9, color: COLORS.textMuted}}>09:05</span>
                      </div>
                      <div style={{fontFamily: FONTS.cn, fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.5}}>
                        {L(lang, '我来帮你总结这个B站视频。让我先下载视频并进行语音识别。', 'I\'ll summarize this Bilibili video. Let me download it and run speech recognition.')}
                      </div>
                      <div style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted, marginTop: 2}}>
                        Invoking skill <span style={{color: COLORS.cyan, fontWeight: 600}}>bilibili-video-summarizer</span>...
                      </div>
                      <div style={{fontFamily: FONTS.cn, fontSize: 11, color: COLORS.cyan, marginTop: 2}}>
                        {L(lang, '正在下载视频...', 'Downloading video...')}
                      </div>
                    </div>
                  </div>

                  {/* Script Execution #1: Download */}
                  <ScriptCard lines={DOWNLOAD_LINES} baseFrame={50} enterFrame={42} frame={frame} exitCode={0} duration="8.2s" />

                  {/* === Phase 2: Whisper === */}

                  {/* AI response 2: whisper */}
                  <div style={{display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10, opacity: interpolate(frame, [142, 155], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                    <AiAvatar />
                    <div>
                      <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2}}>
                        <span style={{fontFamily: FONTS.body, fontSize: 11, fontWeight: 600, color: COLORS.textPrimary}}>Chat-Skills</span>
                        <span style={{fontFamily: FONTS.mono, fontSize: 9, color: COLORS.textMuted}}>09:05</span>
                      </div>
                      <div style={{fontFamily: FONTS.cn, fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.5}}>
                        {L(lang, '太好了！视频下载成功。现在进行语音识别：', 'Great! Video downloaded. Now running speech recognition:')}
                      </div>
                      <div style={{fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted, marginTop: 2}}>
                        Invoking skill <span style={{color: COLORS.cyan, fontWeight: 600}}>bilibili-video-summarizer</span>...
                      </div>
                      <div style={{fontFamily: FONTS.cn, fontSize: 11, color: COLORS.cyan, marginTop: 2}}>
                        {L(lang, '正在使用 Whisper 进行语音识别，这个视频约44分钟，请稍候...', 'Running Whisper speech recognition, ~44 min video, please wait...')}
                      </div>
                    </div>
                  </div>

                  {/* Script Execution #2: Whisper */}
                  <ScriptCard lines={WHISPER_LINES} baseFrame={172} enterFrame={160} frame={frame} exitCode={0} duration="186.4s" />

                  {/* === Phase 3: Summary === */}

                  {/* AI response 3: summary result */}
                  <div style={{display: 'flex', gap: 10, alignItems: 'flex-start', opacity: interpolate(frame, [255, 268], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                    <AiAvatar />
                    <div style={{flex: 1}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2}}>
                        <span style={{fontFamily: FONTS.body, fontSize: 11, fontWeight: 600, color: COLORS.textPrimary}}>Chat-Skills</span>
                        <span style={{fontFamily: FONTS.mono, fontSize: 9, color: COLORS.textMuted}}>09:15</span>
                      </div>
                      <div style={{fontFamily: FONTS.cn, fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.5, marginBottom: 6}}>
                        {L(lang, '太好了！语音识别完成。现在我根据识别出的文本为你生成结构化的视频摘要：', 'Great! Speech recognition complete. Now generating a structured video summary from the transcript:')}
                      </div>
                      <div style={{fontFamily: FONTS.cn, fontSize: 12, fontWeight: 600, color: COLORS.textPrimary, marginBottom: 6}}>
                        {L(lang, '视频摘要：Claude Code 从 0 到 1 全攻略', 'Video Summary: Claude Code From 0 to 1')}
                      </div>

                      {/* Summary card */}
                      <div style={{borderRadius: 8, border: `1px solid ${COLORS.cyan}25`, background: `${COLORS.cyan}06`, overflow: 'hidden', opacity: interpolate(frame, [275, 288], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(frame, [275, 288], [6, 0], {easing: easeOutCubic, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`}}>
                        {/* Video info header */}
                        <div style={{padding: '8px 12px', borderBottom: `1px solid ${COLORS.cyan}15`}}>
                          <div style={{fontFamily: FONTS.cn, fontSize: 11, fontWeight: 600, color: COLORS.textMuted, marginBottom: 4}}>{L(lang, '📺 视频信息', '📺 Video Info')}</div>
                          {SUMMARY_CONTENT.filter(c => c.type === 'meta').map((line, i) => (
                            <div key={i} style={{fontFamily: FONTS.mono, fontSize: 9, color: COLORS.textSecondary, lineHeight: 1.6, opacity: interpolate(frame, [288 + i * 6, 294 + i * 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                              {line.text}
                            </div>
                          ))}
                        </div>

                        {/* Summary body */}
                        <div style={{padding: '8px 12px'}}>
                          {SUMMARY_CONTENT.filter(c => c.type !== 'meta').map((line, i) => {
                            const lineOp = interpolate(frame, [300 + i * 5, 306 + i * 5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
                            const isHeader = line.type === 'header';
                            const isItem = line.type === 'item';
                            return (
                              <div key={i} style={{
                                opacity: lineOp,
                                fontFamily: isItem ? FONTS.mono : FONTS.cn,
                                fontSize: isHeader ? 10 : isItem ? 9 : 10,
                                fontWeight: isHeader ? 600 : 400,
                                color: isHeader ? COLORS.textPrimary : COLORS.textSecondary,
                                lineHeight: 1.6,
                                marginTop: isHeader && i > 0 ? 4 : 0,
                                paddingLeft: isItem ? 4 : 0,
                              }}>
                                {line.text}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Input area (fixed at bottom) */}
              <div style={{padding: '8px 16px', borderTop: `1px solid ${COLORS.borderGlass}`, background: 'rgba(255,255,255,0.01)'}}>
                <div style={{display: 'flex', gap: 6, marginBottom: 6, alignItems: 'center'}}>
                  {CONTENT.skills.slice(0, 3).map((skill, i) => (
                    <div key={i} style={{padding: '3px 8px', borderRadius: 12, background: COLORS.bgCard, border: `1px solid ${COLORS.borderGlass}`, fontFamily: FONTS.mono, fontSize: 9, color: COLORS.textMuted, display: 'flex', alignItems: 'center', gap: 4}}>
                      <span style={{fontSize: 9}}>{skill.icon}</span>
                      {skill.name}
                    </div>
                  ))}
                  <div style={{padding: '3px 8px', borderRadius: 12, background: `${COLORS.cyan}10`, border: `1px solid ${COLORS.cyan}25`, fontFamily: FONTS.mono, fontSize: 9, color: COLORS.cyan, display: 'flex', alignItems: 'center', gap: 4}}>
                    <span style={{fontSize: 9}}>📺</span>
                    bilibili-video-summarizer
                  </div>
                </div>
                <div style={{padding: '8px 12px', borderRadius: 10, background: COLORS.bgTertiary, border: `1px solid ${COLORS.borderGlass}`, display: 'flex', alignItems: 'center', gap: 8}}>
                  <span style={{fontFamily: FONTS.cn, fontSize: 11, color: COLORS.textMuted}}>{L(lang, '输入消息...', 'Type a message...')}</span>
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
