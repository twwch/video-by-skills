import React from 'react';
import { fonts } from '../../config/typography';
import { theme } from '../../config/colors';

interface CodeBlockProps {
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  return (
    <div
      style={{
        background: theme.bg,
        borderRadius: 8,
        padding: '12px 16px',
        marginTop: 8,
        border: `1px solid ${theme.border}`,
      }}
    >
      <pre
        style={{
          fontFamily: fonts.mono,
          fontSize: 13,
          color: theme.textSecondary,
          margin: 0,
          whiteSpace: 'pre-wrap',
          lineHeight: 1.5,
        }}
      >
        {code}
      </pre>
    </div>
  );
};
