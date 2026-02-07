// Matches the original Next-Chat-Skills dark theme
export const COLORS = {
  // Brand accents
  green: '#22C55E',
  blue: '#3B82F6',
  purple: '#A855F7',
  amber: '#F59E0B',
  red: '#EF4444',
  cyan: '#06B6D4',

  // Accent dim variants (15% opacity)
  greenDim: 'rgba(34,197,94,0.15)',
  blueDim: 'rgba(59,130,246,0.15)',
  purpleDim: 'rgba(168,85,247,0.15)',
  amberDim: 'rgba(245,158,11,0.15)',
  redDim: 'rgba(239,68,68,0.15)',

  // Backgrounds
  bgPrimary: '#0A0E1A',
  bgSecondary: '#0F1629',
  bgTertiary: '#151C30',
  bgCard: 'rgba(255,255,255,0.04)',
  bgGlass: 'rgba(255,255,255,0.06)',
  bgTerminal: '#0D1117',

  // Text
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',

  // Borders
  borderGlass: 'rgba(255,255,255,0.08)',
  borderActive: 'rgba(255,255,255,0.15)',

  // macOS window dots
  dotRed: '#FF5F57',
  dotYellow: '#FEBC2E',
  dotGreen: '#28C840',
} as const;

export const GRADIENT = {
  brand: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.blue})`,
  brandHorizontal: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.blue})`,
  brandText: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.blue})`,
  userAvatar: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.blue})`,
  aiAvatar: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.blue})`,
  bgRadial: `radial-gradient(ellipse at center, ${COLORS.bgTertiary} 0%, ${COLORS.bgPrimary} 70%)`,
} as const;
