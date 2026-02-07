export const agentColors = {
  mindmap: {
    primary: '#F59E0B',   // Amber
    light: '#FDE68A',
    dark: '#B45309',
    bg: 'rgba(245, 158, 11, 0.08)',
    gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
  },
  flowchart: {
    primary: '#6366F1',   // Indigo
    light: '#A5B4FC',
    dark: '#4338CA',
    bg: 'rgba(99, 102, 241, 0.08)',
    gradient: 'linear-gradient(135deg, #6366F1, #4F46E5)',
  },
  charts: {
    primary: '#F43F5E',   // Rose
    light: '#FDA4AF',
    dark: '#BE123C',
    bg: 'rgba(244, 63, 94, 0.08)',
    gradient: 'linear-gradient(135deg, #F43F5E, #E11D48)',
  },
  drawio: {
    primary: '#3B82F6',   // Blue
    light: '#93C5FD',
    dark: '#1D4ED8',
    bg: 'rgba(59, 130, 246, 0.08)',
    gradient: 'linear-gradient(135deg, #3B82F6, #2563EB)',
  },
  mermaid: {
    primary: '#10B981',   // Emerald
    light: '#6EE7B7',
    dark: '#047857',
    bg: 'rgba(16, 185, 129, 0.08)',
    gradient: 'linear-gradient(135deg, #10B981, #059669)',
  },
  infographic: {
    primary: '#8B5CF6',   // Violet
    light: '#C4B5FD',
    dark: '#6D28D9',
    bg: 'rgba(139, 92, 246, 0.08)',
    gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
  },
} as const;

export const theme = {
  bg: '#0F1117',
  surface: '#1A1D27',
  surfaceLight: '#252836',
  border: '#2E3142',
  text: '#E8E9ED',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  userBubble: 'linear-gradient(135deg, #3B82F6, #2563EB)',
  assistantBubble: '#1E2130',
  accentBlue: '#3B82F6',
} as const;

export type AgentKey = keyof typeof agentColors;
