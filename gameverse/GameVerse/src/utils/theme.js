import { MD3DarkTheme } from 'react-native-paper';

export const COLORS = {
  primary: '#00D2FF',
  secondary: '#3A0CA3',
  accent: '#FF006E',
  background: '#0A0A0F',
  surface: '#1A1A2E',
  card: '#16213E',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  success: '#00FF88',
  warning: '#FFB800',
  error: '#FF5252',
  gradient: {
    primary: ['#00D2FF', '#3A0CA3'],
    secondary: ['#FF006E', '#8338EC'],
    background: ['#0A0A0F', '#1A1A2E', '#16213E'],
    neon: ['#00D2FF', '#FF006E', '#00FF88'],
  }
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const TYPOGRAPHY = {
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  body: 16,
  caption: 14,
  small: 12,
};

export const SHADOWS = {
  small: {
    shadowColor: '#00D2FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: '#FF006E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  large: {
    shadowColor: '#00FF88',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    accent: COLORS.accent,
    background: COLORS.background,
    surface: COLORS.surface,
    text: COLORS.text,
    onSurface: COLORS.text,
    onBackground: COLORS.text,
    card: COLORS.card,
    border: COLORS.secondary,
    notification: COLORS.accent,
    error: COLORS.error,
    success: COLORS.success,
    warning: COLORS.warning,
  },
  roundness: 12,
  animation: {
    scale: 1.0,
  },
};