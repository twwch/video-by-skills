import React from 'react';
import { fontLinks } from '../config/typography';

const importStatements = fontLinks
  .map((link) => `@import url('${link}');`)
  .join('\n');

export const FontLoader: React.FC = () => {
  return <style dangerouslySetInnerHTML={{ __html: importStatements }} />;
};
