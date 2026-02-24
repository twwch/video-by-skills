export const fonts = {
  heading: 'Inter, "Noto Sans SC", sans-serif',
  body: 'Inter, "Noto Sans SC", sans-serif',
  mono: '"JetBrains Mono", monospace',
} as const;

export const fontFor = (lang: 'zh' | 'en') =>
  lang === 'zh' ? '"Noto Sans SC", Inter, sans-serif' : 'Inter, "Noto Sans SC", sans-serif';

export const googleFontUrls = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap',
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap',
];
