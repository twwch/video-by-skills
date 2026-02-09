import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {COLORS} from '../../config/colors';
import {getContent} from '../../config/content';
import {useLanguage} from '../../contexts/LanguageContext';
import {Sidebar} from '../../components/ui/Sidebar';
import {ChatWindow} from '../../components/ui/ChatWindow';
import {ChatMessage} from '../../components/ui/ChatMessage';
import {SkillPanel} from '../../components/ui/SkillPanel';
import {easeOutCubic} from '../../utils/easing';

export const UIOverview: React.FC = () => {
  const lang = useLanguage();
  const CONTENT = getContent(lang);
  const frame = useCurrentFrame();

  const containerScale = interpolate(frame, [0, 25], [0.92, 1], {
    easing: easeOutCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const containerOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{background: COLORS.bgPrimary}}>
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 60,
        }}
      >
        <div
          style={{
            width: 1400,
            height: 780,
            borderRadius: 16,
            border: `1px solid ${COLORS.borderGlass}`,
            overflow: 'hidden',
            display: 'flex',
            transform: `scale(${containerScale})`,
            opacity: containerOpacity,
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          <Sidebar startFrame={10} />
          <ChatWindow>
            {CONTENT.chatMessages.map((msg, i) => (
              <ChatMessage
                key={i}
                role={msg.role}
                text={msg.text}
                enterFrame={40 + i * 55}
                skillName={'skillName' in msg ? msg.skillName : undefined}
                skillStatus={'skillStatus' in msg ? msg.skillStatus : undefined}
                terminalLines={'terminalLines' in msg ? msg.terminalLines : undefined}
                duration={'duration' in msg ? msg.duration : undefined}
              />
            ))}
          </ChatWindow>
          <SkillPanel startFrame={15} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
