import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {SCENES} from '../config/constants';
import {AutonomousSkill} from '../scenes/section3/AutonomousSkill';
import {LiveTerminal} from '../scenes/section3/LiveTerminal';
import {FileGeneration} from '../scenes/section3/FileGeneration';
import {MentionSyntax} from '../scenes/section3/MentionSyntax';
import {SkillFind} from '../scenes/section3/SkillFind';
import {SkillCreate} from '../scenes/section3/SkillCreate';
import {SkillInstall} from '../scenes/section3/SkillInstall';
import {ErrorAutoFix} from '../scenes/section3/ErrorAutoFix';
import {FullDemo} from '../scenes/section3/FullDemo';

export const Section3Features: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={SCENES.autonomousSkill.start} durationInFrames={SCENES.autonomousSkill.duration}>
        <AutonomousSkill />
      </Sequence>
      <Sequence from={SCENES.liveTerminal.start} durationInFrames={SCENES.liveTerminal.duration}>
        <LiveTerminal />
      </Sequence>
      <Sequence from={SCENES.fileGeneration.start} durationInFrames={SCENES.fileGeneration.duration}>
        <FileGeneration />
      </Sequence>
      <Sequence from={SCENES.mentionSyntax.start} durationInFrames={SCENES.mentionSyntax.duration}>
        <MentionSyntax />
      </Sequence>
      <Sequence from={SCENES.skillFind.start} durationInFrames={SCENES.skillFind.duration}>
        <SkillFind />
      </Sequence>
      <Sequence from={SCENES.skillCreate.start} durationInFrames={SCENES.skillCreate.duration}>
        <SkillCreate />
      </Sequence>
      <Sequence from={SCENES.skillInstall.start} durationInFrames={SCENES.skillInstall.duration}>
        <SkillInstall />
      </Sequence>
      <Sequence from={SCENES.errorAutoFix.start} durationInFrames={SCENES.errorAutoFix.duration}>
        <ErrorAutoFix />
      </Sequence>
      <Sequence from={SCENES.fullDemo.start} durationInFrames={SCENES.fullDemo.duration}>
        <FullDemo />
      </Sequence>
    </AbsoluteFill>
  );
};
