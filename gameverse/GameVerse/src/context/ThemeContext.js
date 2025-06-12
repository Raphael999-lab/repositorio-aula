import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { storageService } from '../services/storage';
import { COLORS, darkTheme } from '../utils/theme';

const ThemeContext = createContext();

const initialState = {
  isDarkMode: true,
  currentTheme: darkTheme,
  colors: COLORS,
  animations: true,
  hapticFeedback: true,
};

function themeReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
        currentTheme: !state.isDarkMode ? darkTheme : darkTheme, // Sempre dark para este app
      };
    case 'SET_ANIMATIONS':
      return {
        ...state,
        animations: action.enabled,
      };
    case 'SET_HAPTIC_FEEDBACK':
      return {
        ...state,
        hapticFeedback: action.enabled,
      };
    case 'LOAD_SETTINGS':
      return {
        ...state,
        ...action.settings,
      };
    default:
      return state;
  }
}

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  useEffect(() => {
    loadThemeSettings();
  }, []);

  const loadThemeSettings = async () => {
    try {
      const settings = await storageService.getSettings();
      dispatch({
        type: 'LOAD_SETTINGS',
        settings: {
          isDarkMode: settings.darkMode !== undefined ? settings.darkMode : true,
          animations: settings.animations !== undefined ? settings.animations : true,
          hapticFeedback: settings.hapticFeedback !== undefined ? settings.hapticFeedback : true,
        },
      });
    } catch (error) {
      console.error('Error loading theme settings:', error);
    }
  };

  const themeContext = {
    toggleDarkMode: async () => {
      dispatch({ type: 'TOGGLE_DARK_MODE' });
      await storageService.updateSettings({ darkMode: !state.isDarkMode });
    },

    setAnimations: async (enabled) => {
      dispatch({ type: 'SET_ANIMATIONS', enabled });
      await storageService.updateSettings({ animations: enabled });
    },

    setHapticFeedback: async (enabled) => {
      dispatch({ type: 'SET_HAPTIC_FEEDBACK', enabled });
      await storageService.updateSettings({ hapticFeedback: enabled });
    },

    getThemeColors: () => state.colors,
    
    isAnimationsEnabled: () => state.animations,
    
    isHapticEnabled: () => state.hapticFeedback,
  };

  return (
    <ThemeContext.Provider value={{ ...state, ...themeContext }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}