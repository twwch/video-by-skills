import React from 'react';
import { Sequence } from 'remotion';
import { SCENES } from '../config/constants';
import { S1_OpeningHook } from '../scenes/S1_OpeningHook';
import { S2_LogoReveal } from '../scenes/S2_LogoReveal';
import { S3_Dashboard } from '../scenes/S3_Dashboard';
import { S4_Editor } from '../scenes/S4_Editor';
import { S5_AIAssistant } from '../scenes/S5_AIAssistant';
import { S6_Templates } from '../scenes/S6_Templates';
import { S7_Features } from '../scenes/S7_Features';
import { S8_Closing } from '../scenes/S8_Closing';

export const MainVideo: React.FC = () => {
  return (
    <>
      <Sequence from={SCENES.S1_OPENING.start} durationInFrames={SCENES.S1_OPENING.duration} name="S1-OpeningHook">
        <S1_OpeningHook />
      </Sequence>

      <Sequence from={SCENES.S2_LOGO.start} durationInFrames={SCENES.S2_LOGO.duration} name="S2-LogoReveal">
        <S2_LogoReveal />
      </Sequence>

      <Sequence from={SCENES.S3_DASHBOARD.start} durationInFrames={SCENES.S3_DASHBOARD.duration} name="S3-Dashboard">
        <S3_Dashboard />
      </Sequence>

      <Sequence from={SCENES.S4_EDITOR.start} durationInFrames={SCENES.S4_EDITOR.duration} name="S4-Editor">
        <S4_Editor />
      </Sequence>

      <Sequence from={SCENES.S5_AI.start} durationInFrames={SCENES.S5_AI.duration} name="S5-AIAssistant">
        <S5_AIAssistant />
      </Sequence>

      <Sequence from={SCENES.S6_TEMPLATES.start} durationInFrames={SCENES.S6_TEMPLATES.duration} name="S6-Templates">
        <S6_Templates />
      </Sequence>

      <Sequence from={SCENES.S7_FEATURES.start} durationInFrames={SCENES.S7_FEATURES.duration} name="S7-Features">
        <S7_Features />
      </Sequence>

      <Sequence from={SCENES.S8_CLOSING.start} durationInFrames={SCENES.S8_CLOSING.duration} name="S8-Closing">
        <S8_Closing />
      </Sequence>
    </>
  );
};
