export const colors = {
  // Video background (dark for promo cinematic look)
  bg: '#0A0F1A',
  surface: '#111827',
  surfaceLight: '#1F2937',

  // App UI colors (light theme matching original)
  appBg: '#fafaf9',       // zinc-50
  appWhite: '#ffffff',
  appBorder: '#e5e5e5',   // zinc-200 / border
  appForeground: '#171717', // zinc-900 / foreground

  // Pink - primary action color
  pink500: '#ec4899',     // pink-500 (CTA buttons, active states)
  pink600: '#db2777',     // pink-600 (hover)
  pink700: '#be185d',     // pink-700 (active sidebar text)
  pink400: '#f472b6',     // pink-400 (AI avatar gradient from)
  pink50: '#fdf2f8',      // pink-50 (active sidebar bg, selected template bg)
  pink300: '#f9a8d4',     // pink-300 (selected ring, drag overlay border)
  pink200: '#fbcfe8',     // pink-200 (AI suggestion border)

  // Modern template accent
  modernPink: '#e94560',
  modernDarkBlue: '#0f3460',
  modernMidBlue: '#16213e',
  modernDeepBlue: '#1a1a2e',

  // Zinc scale
  zinc50: '#fafafa',
  zinc100: '#f4f4f5',
  zinc200: '#e4e4e7',
  zinc300: '#d4d4d8',
  zinc400: '#a1a1aa',
  zinc500: '#71717a',
  zinc600: '#52525b',
  zinc700: '#3f3f46',
  zinc800: '#27272a',
  zinc900: '#18181b',

  // Logo colors
  logoGradientFrom: '#34D399', // emerald-400
  logoGradientTo: '#059669',   // emerald-600
  logoTextDark: '#064E3B',     // emerald-900 ("Jade")
  logoTextGreen: '#10B981',    // emerald-500 ("AI")
  logoSpark: '#FCD34D',        // amber-300 (sparkle)

  // Semantic
  error: '#dc2626',      // red-600 / destructive
  red400: '#f87171',
  red600: '#dc2626',
  green500: '#22c55e',
  emerald400: '#34d399',

  // Text
  white: '#ffffff',
  text: '#F9FAFB',
  textDim: '#9CA3AF',
} as const;

export const gradients = {
  logoFill: `linear-gradient(135deg, ${colors.logoGradientFrom}, ${colors.logoGradientTo})`,
  modernHeader: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  pinkAvatar: `linear-gradient(to bottom right, ${colors.pink400}, ${colors.pink500})`,
  darkBg: `radial-gradient(ellipse at center, ${colors.surface}, ${colors.bg})`,
} as const;
