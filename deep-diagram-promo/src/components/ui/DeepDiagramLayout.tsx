import React from 'react';
import { useCurrentFrame, AbsoluteFill, staticFile, Img } from 'remotion';
import type { AgentContent } from '../../config/content';
import { AGENT_CHIPS } from '../../config/content';
import { SCENE_TIMELINE } from '../../config/constants';
import { fonts } from '../../config/typography';
import { easeOutCubic, progress, clamp } from '../../utils/easing';
import { FontLoader } from '../FontLoader';

interface DeepDiagramLayoutProps {
  agent: AgentContent;
  canvas: (progress: number) => React.ReactNode;
}

export const DeepDiagramLayout: React.FC<DeepDiagramLayoutProps> = ({ agent, canvas }) => {
  const frame = useCurrentFrame();
  const T = SCENE_TIMELINE;

  // Scene envelope
  const fadeIn = easeOutCubic(progress(frame, T.fadeIn.start, T.fadeIn.end));
  const fadeOut = 1 - easeOutCubic(progress(frame, T.fadeOut.start, T.fadeOut.end));
  const opacity = Math.min(fadeIn, fadeOut);

  // Typing in input bar
  const typingP = progress(frame, T.typing.start, T.typing.end);
  const typedChars = Math.floor(typingP * agent.userPrompt.length);
  const inputText = agent.userPrompt.slice(0, clamp(typedChars, 0, agent.userPrompt.length));

  // Send animation
  const sendP = progress(frame, T.send.start, T.send.end);
  const sent = frame >= T.send.start;
  const bubbleP = easeOutCubic(progress(frame, T.send.end, T.bubbleSettle.end));

  // Process trace
  const traceP = progress(frame, T.trace.start, T.trace.end);

  // Diagram
  const diagP = progress(frame, T.diagram.start, T.diagram.end);

  return (
    <AbsoluteFill style={{ opacity }}>
      <FontLoader />
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#0a0b0f' }}>
        {/* Canvas side */}
        <div style={{ width: '65%', height: '100%', position: 'relative', overflow: 'hidden', background: '#0e1015' }}>
          {canvas(diagP)}
          <CanvasToolbar />
        </div>

        {/* Right panel */}
        <div style={{ width: '35%', height: '100%', display: 'flex', flexDirection: 'column', background: '#111318', borderLeft: '1px solid #1e2030' }}>
          <ChatHeader />
          <div style={{ flex: 1, overflowY: 'hidden', padding: '16px 18px', display: 'flex', flexDirection: 'column' }}>
            {sent && <UserBubble text={agent.userPrompt} mention={agent.mention} progress={bubbleP} />}
            {traceP > 0 && (
              <ProcessTrace
                agentName={agent.name.replace(' Agent', '')}
                callingFunction={agent.callingFunction}
                designDetail={agent.designDetail}
                resultCode={agent.resultCode}
                progress={traceP}
                frame={frame}
                traceStart={T.trace.start}
              />
            )}
          </div>
          <AgentChips activeIndex={agent.activeChipIndex} />
          <InputBar
            text={sent ? '' : inputText}
            sendProgress={sendP}
            showCursor={!sent && typingP > 0}
            frame={frame}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── CHAT HEADER ─────────────────────────────────
const ChatHeader: React.FC = () => (
  <div style={{ padding: '16px 18px 12px', borderBottom: '1px solid #1e2030', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <Img src={staticFile('logo.png')} style={{ width: 24, height: 24, borderRadius: 6 }} />
        <span style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 700, color: '#10B981' }}>
          DeepDiagram AI
        </span>
      </div>
      <span style={{ fontFamily: fonts.body, fontSize: 11, color: '#6B7280' }}>
        Describe what you want to create or upload an image.
      </span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: '#1a1d27', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
          <circle cx={8} cy={8} r={2.5} stroke="#6B7280" strokeWidth={1.5} />
          <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="#6B7280" strokeWidth={1.2} />
        </svg>
      </div>
      <div style={{ padding: '8px 18px', borderRadius: 20, background: '#10B981', display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 14, color: '#fff' }}>+</span>
        <span style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: '#fff' }}>New Chat</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
          <circle cx={7} cy={7} r={5.5} stroke="#6B7280" strokeWidth={1.2} />
          <path d="M7 4v3.5l2.5 1.5" stroke="#6B7280" strokeWidth={1.2} strokeLinecap="round" />
        </svg>
        <span style={{ fontFamily: fonts.body, fontSize: 13, color: '#6B7280' }}>History</span>
        <span style={{ fontSize: 10, color: '#6B7280' }}>▾</span>
      </div>
    </div>
  </div>
);

// ─── USER BUBBLE ─────────────────────────────────
const UserBubble: React.FC<{ text: string; mention: string; progress: number }> = ({ text, mention, progress: p }) => (
  <div style={{
    alignSelf: 'flex-end',
    maxWidth: '95%',
    padding: '14px 18px',
    borderRadius: '18px 18px 4px 18px',
    background: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 1.6,
    color: '#fff',
    opacity: p,
    transform: `translateY(${(1 - p) * 30}px)`,
    marginBottom: 16,
  }}>
    <span style={{ color: '#A78BFA', fontWeight: 600 }}>{mention}</span>{' '}
    {text.replace(mention + ' ', '')}
  </div>
);

// ─── PROCESS TRACE ───────────────────────────────
const ProcessTrace: React.FC<{
  agentName: string;
  callingFunction: string;
  designDetail: string;
  resultCode: string;
  progress: number;
  frame: number;
  traceStart: number;
}> = ({ agentName, callingFunction, designDetail, resultCode, progress: p, frame, traceStart }) => {
  const elapsed = frame - traceStart;
  const cursorBlink = Math.sin(frame * 0.4) > 0;

  // Row appearance timings (frames after traceStart)
  const activeP = easeOutCubic(clamp(elapsed / 6, 0, 1));
  const designHeaderP = easeOutCubic(clamp((elapsed - 4) / 6, 0, 1));
  const callingP = easeOutCubic(clamp((elapsed - 18) / 6, 0, 1));
  const resultHeaderP = easeOutCubic(clamp((elapsed - 24) / 6, 0, 1));

  // Design Concept streaming: frames 8-30
  const designStreamP = clamp((elapsed - 8) / 22, 0, 1);
  const designDone = elapsed >= 32;
  const designChars = Math.floor(designStreamP * designDetail.length);
  const designText = designDetail.slice(0, designChars);

  // Result code streaming: frames 28-50
  const resultStreamP = clamp((elapsed - 28) / 22, 0, 1);
  const resultDone = elapsed >= 52;
  const resultChars = Math.floor(resultStreamP * resultCode.length);
  const resultText = resultCode.slice(0, resultChars);

  // Is anything actively streaming?
  const isStreaming = (designStreamP > 0 && !designDone) || (resultStreamP > 0 && !resultDone);

  // Collapse phase: content sections fade out after streaming is done
  const collapseP = easeOutCubic(clamp((elapsed - 54) / 8, 0, 1));
  const contentScale = 1 - collapseP;

  // Expand states
  const designExpanded = designStreamP > 0 && contentScale > 0.01;
  const resultExpanded = resultStreamP > 0 && contentScale > 0.01;

  return (
    <div style={{
      marginBottom: 14,
      opacity: easeOutCubic(Math.min(p * 2, 1)),
    }}>
      {/* ── Process Trace Header ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 12px',
        background: '#1a1d27',
        border: '1px solid #252836',
        borderRadius: 8,
        marginBottom: 8,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          <span style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: '#9CA3AF' }}>Process Trace</span>
          {isStreaming && (
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#10B981',
              opacity: cursorBlink ? 1 : 0.3,
            }} />
          )}
        </div>
        <span style={{ fontSize: 12, color: '#6B7280' }}>⌄</span>
      </div>

      {/* ── Step Cards ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>

        {/* Active Agent Card (purple) */}
        {activeP > 0 && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 12px',
            background: 'rgba(139, 92, 246, 0.08)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: 8,
            opacity: activeP,
            transform: `translateX(${(1 - activeP) * 12}px)`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a8 8 0 0 0-8 8c0 3 1.5 5.5 4 7v3h8v-3c2.5-1.5 4-4 4-7a8 8 0 0 0-8-8z" />
                <path d="M9.5 22h5" />
              </svg>
              <span style={{ fontFamily: fonts.mono, fontSize: 12, color: '#E8E9ED', fontWeight: 600 }}>
                Active Agent: <span style={{ color: '#C4B5FD' }}>{agentName}</span>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{
                padding: '3px 10px', borderRadius: 6,
                background: '#7C3AED', color: '#fff',
                fontSize: 11, fontWeight: 600,
                fontFamily: fonts.body,
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <svg width={10} height={10} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                Render
              </span>
              <span style={{ fontSize: 13, color: '#A78BFA' }}>↻</span>
            </div>
          </div>
        )}

        {/* Design Concept Card (amber) */}
        {designHeaderP > 0 && (
          <div style={{
            background: 'rgba(234, 179, 8, 0.08)',
            border: '1px solid rgba(234, 179, 8, 0.2)',
            borderRadius: 8,
            opacity: designHeaderP,
            transform: `translateX(${(1 - designHeaderP) * 12}px)`,
            overflow: 'hidden',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12 }}>💡</span>
                <span style={{ fontFamily: fonts.mono, fontSize: 12, color: '#EAB308', fontWeight: 600 }}>Design Concept</span>
                {designStreamP > 0 && !designDone && (
                  <span style={{
                    padding: '2px 8px', borderRadius: 4,
                    background: 'rgba(234, 179, 8, 0.12)',
                    border: '1px solid rgba(234, 179, 8, 0.25)',
                    fontSize: 10, color: '#FBBF24',
                    fontFamily: fonts.body,
                    display: 'flex', alignItems: 'center', gap: 4,
                  }}>
                    <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                    Thinking...
                  </span>
                )}
              </div>
              <span style={{
                fontSize: 14, color: '#EAB308',
                transform: designExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}>›</span>
            </div>
            {designExpanded && (
              <div style={{
                margin: '0 10px 10px 10px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(234, 179, 8, 0.12)',
                borderRadius: 6,
                padding: '8px 10px',
                fontFamily: fonts.body,
                fontSize: 11,
                color: '#B0B3BC',
                lineHeight: 1.6,
                opacity: contentScale,
                maxHeight: contentScale * 120,
                overflow: 'hidden',
              }}>
                {designText}
                {!designDone && cursorBlink && (
                  <span style={{
                    display: 'inline-block', width: 2, height: 13,
                    background: '#EAB308', marginLeft: 1,
                    verticalAlign: 'text-bottom', borderRadius: 1,
                  }} />
                )}
              </div>
            )}
          </div>
        )}

        {/* Calling Card (slate, indented) */}
        {callingP > 0 && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 12px',
            marginLeft: 16,
            background: 'rgba(100, 116, 139, 0.06)',
            border: '1px solid rgba(100, 116, 139, 0.15)',
            borderLeft: '2px solid #94A3B8',
            borderRadius: 8,
            opacity: callingP,
            transform: `translateX(${(1 - callingP) * 12}px)`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5" />
                <line x1={12} y1={19} x2={20} y2={19} />
              </svg>
              <span style={{ fontFamily: fonts.mono, fontSize: 12, color: '#D1D5DB', fontWeight: 500 }}>
                Calling: <span style={{ color: '#94A3B8' }}>{callingFunction}</span>
              </span>
            </div>
            <span style={{ fontSize: 14, color: '#64748B' }}>›</span>
          </div>
        )}

        {/* Result Card (green, indented) */}
        {resultHeaderP > 0 && (
          <div style={{
            marginLeft: 16,
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderLeft: '2px solid #34D399',
            borderRadius: 8,
            opacity: resultHeaderP,
            transform: `translateX(${(1 - resultHeaderP) * 12}px)`,
            overflow: 'hidden',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span style={{ fontFamily: fonts.mono, fontSize: 12, color: '#10B981', fontWeight: 600 }}>Result</span>
              </div>
              <span style={{
                fontSize: 14, color: '#10B981',
                transform: resultExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}>›</span>
            </div>
            {resultExpanded && (
              <div style={{
                margin: '0 10px 10px 10px',
                background: '#0d0f14',
                borderRadius: 6,
                border: '1px solid rgba(16, 185, 129, 0.1)',
                overflow: 'hidden',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                  padding: '4px 8px',
                  background: 'rgba(100, 116, 139, 0.08)',
                  borderBottom: '1px solid rgba(100, 116, 139, 0.1)',
                }}>
                  <span style={{ fontSize: 11, color: '#6B7280' }}>📋</span>
                </div>
                <div style={{
                  padding: '10px 12px',
                  fontFamily: fonts.mono,
                  fontSize: 11,
                  color: '#A5F3FC',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  opacity: contentScale,
                  maxHeight: contentScale * 140,
                  overflow: 'hidden',
                }}>
                  {resultText}
                  {!resultDone && cursorBlink && (
                    <span style={{
                      display: 'inline-block', width: 2, height: 13,
                      background: '#10B981', marginLeft: 1,
                      verticalAlign: 'text-bottom', borderRadius: 1,
                    }} />
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── AGENT CHIPS ─────────────────────────────────
const AgentChips: React.FC<{ activeIndex: number }> = ({ activeIndex }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '10px 18px', borderTop: '1px solid #1e2030' }}>
    {AGENT_CHIPS.map((chip, i) => {
      const active = i === activeIndex;
      return (
        <div key={i} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 14px',
          borderRadius: 20,
          background: active ? '#10B98118' : '#1a1d27',
          border: `1px solid ${active ? '#10B98140' : '#252836'}`,
        }}>
          <span style={{ fontSize: 12, color: active ? '#10B981' : '#9CA3AF' }}>{chip.icon}</span>
          <span style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 500, color: active ? '#10B981' : '#9CA3AF' }}>
            {chip.label}
          </span>
        </div>
      );
    })}
  </div>
);

// ─── INPUT BAR ───────────────────────────────────
const InputBar: React.FC<{ text: string; sendProgress: number; showCursor: boolean; frame: number }> = ({ text, sendProgress, showCursor, frame }) => {
  const sendActive = text.length > 10;
  const cursorBlink = Math.sin(frame * 0.3) > 0;

  return (
    <div style={{ padding: '12px 18px 16px' }}>
      <div style={{ background: '#1a1d27', borderRadius: 14, border: '1px solid #252836', padding: '14px 16px' }}>
        {/* Text area */}
        <div style={{
          minHeight: 24,
          fontFamily: fonts.body,
          fontSize: 14,
          color: text ? '#E8E9ED' : '#6B7280',
          lineHeight: 1.5,
          marginBottom: 10,
        }}>
          {text || 'Ask anything... (Type @ to select agent)'}
          {showCursor && cursorBlink && (
            <span style={{ display: 'inline-block', width: 2, height: 16, background: '#10B981', marginLeft: 1, verticalAlign: 'text-bottom' }} />
          )}
        </div>

        {/* Bottom toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
              <path d="M15 9.5l-6.5 6.5a4 4 0 01-5.66-5.66l8-8a2.83 2.83 0 014 4l-7 7" stroke="#6B7280" strokeWidth={1.3} strokeLinecap="round" />
            </svg>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <path d="M9 1L3 9h4l-1 6 6-8H8l1-6z" stroke="#EAB308" strokeWidth={1.2} fill="#EAB30830" />
            </svg>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 50, height: 4, borderRadius: 2, background: '#252836', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 20, top: -4, width: 12, height: 12, borderRadius: '50%', background: '#3B82F6', border: '2px solid #1a1d27' }} />
              </div>
              <span style={{ fontFamily: fonts.mono, fontSize: 11, color: '#6B7280' }}>3</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
              <span style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 600, color: '#9CA3AF' }}>DEFAULT MODEL</span>
              <span style={{ fontSize: 8, color: '#6B7280' }}>▾</span>
            </div>
          </div>

          {/* Send button */}
          <div style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: sendActive ? 'linear-gradient(135deg, #10B981, #059669)' : '#252836',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: sendProgress > 0 ? `scale(${1 + sendProgress * 0.15})` : 'none',
            boxShadow: sendProgress > 0 ? '0 0 20px #10B98160' : 'none',
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <path d="M14 2L7 9M14 2l-4 12-3-5.5L2 6l12-4z" stroke={sendActive ? '#fff' : '#6B7280'} strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── CANVAS TOOLBAR ──────────────────────────────
const CanvasToolbar: React.FC = () => (
  <>
    {/* Top right: download, history, refresh */}
    <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', gap: 8 }}>
      {['⬇', '↺', '↻'].map((icon, i) => (
        <div key={i} style={{ width: 34, height: 34, borderRadius: 8, background: '#1a1d2790', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 16, color: '#6B7280' }}>{icon}</span>
        </div>
      ))}
    </div>
    {/* Bottom right: fullscreen, fit, zoom in, zoom out */}
    <div style={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', gap: 6 }}>
      {['⛶', '◎', '−', '+'].map((icon, i) => (
        <div key={i} style={{ width: 32, height: 32, borderRadius: 8, background: '#1a1d2790', border: '1px solid #252836', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 14, color: '#6B7280' }}>{icon}</span>
        </div>
      ))}
    </div>
  </>
);
