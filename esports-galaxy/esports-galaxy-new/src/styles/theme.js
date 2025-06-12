import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00ffff',
    accent: '#ff00ff',
    background: '#000033',
    surface: '#001a4d',
    text: '#ffffff',
    placeholder: '#99ccff',
    backdrop: '#000066',
    notification: '#00ff00',
    error: '#ff0066',
    card: '#001a66',
    border: '#0066ff',
  },
  fonts: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'System',
      fontWeight: '100',
    },
    
    bodyLarge: {
      fontFamily: 'System',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 24,
    },
    bodyMedium: {
      fontFamily: 'System',
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 20,
    },
    bodySmall: {
      fontFamily: 'System',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 16,
    },
    labelLarge: {
      fontFamily: 'System',
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 20,
    },
    labelMedium: {
      fontFamily: 'System',
      fontWeight: '500',
      fontSize: 12,
      lineHeight: 16,
    },
    labelSmall: {
      fontFamily: 'System',
      fontWeight: '500',
      fontSize: 11,
      lineHeight: 16,
    },
    titleLarge: {
      fontFamily: 'System',
      fontWeight: '400',
      fontSize: 22,
      lineHeight: 28,
    },
    titleMedium: {
      fontFamily: 'System',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 24,
    },
    titleSmall: {
      fontFamily: 'System',
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 20,
    },
    headlineLarge: {
      fontFamily: 'System',
      fontWeight: '400',
      fontSize: 32,
      lineHeight: 40,
    },
    headlineMedium: {
      fontFamily: 'System',
      fontWeight: '400',
      fontSize: 28,
      lineHeight: 36,
    },
    headlineSmall: {
      fontFamily: 'System',
      fontWeight: '400',
      fontSize: 24,
      lineHeight: 32,
    },
    displayLarge: {
      fontFamily: 'System',
      fontWeight: '400',
      fontSize: 57,
      lineHeight: 64,
    },
    displayMedium: {
      fontFamily: 'System',
      fontWeight: '400',
      fontSize: 45,
      lineHeight: 52,
    },
    displaySmall: {
      fontFamily: 'System',
      fontWeight: '400',
      fontSize: 36,
      lineHeight: 44,
    },
  },
  roundness: 15,
};