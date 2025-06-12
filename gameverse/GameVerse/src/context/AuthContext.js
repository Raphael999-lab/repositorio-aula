import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageService } from '../services/storage';

const AuthContext = createContext();

const initialState = {
  isLoading: true,
  isSignedIn: false,
  user: null,
  token: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        isLoading: false,
        isSignedIn: action.token ? true : false,
        user: action.user,
        token: action.token,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isLoading: false,
        isSignedIn: true,
        user: action.user,
        token: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isLoading: false,
        isSignedIn: false,
        user: null,
        token: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.user },
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const user = await storageService.getUser();
        
        dispatch({ type: 'RESTORE_TOKEN', token, user });
      } catch (e) {
        dispatch({ type: 'RESTORE_TOKEN', token: null, user: null });
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = {
    signIn: async (email, password) => {
      try {
        // Simular autenticação (substitua por API real)
        const userData = {
          id: Date.now().toString(),
          name: 'Gaming Master',
          email: email,
          bio: 'Professional Gamer & Esports Enthusiast',
          avatar: null,
          country: 'Brazil',
          birthDate: '1995-01-01',
          createdAt: new Date().toISOString(),
        };
        
        const token = 'mock_token_' + Date.now();
        
        await AsyncStorage.setItem('userToken', token);
        await storageService.saveUser(userData);
        
        dispatch({ type: 'SIGN_IN', user: userData, token });
        
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    signUp: async (userData) => {
      try {
        const newUser = {
          id: Date.now().toString(),
          ...userData,
          createdAt: new Date().toISOString(),
        };
        
        const token = 'mock_token_' + Date.now();
        
        await AsyncStorage.setItem('userToken', token);
        await storageService.saveUser(newUser);
        
        dispatch({ type: 'SIGN_IN', user: newUser, token });
        
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
        dispatch({ type: 'SIGN_OUT' });
      } catch (error) {
        console.error('Error signing out:', error);
      }
    },

    updateUser: async (userData) => {
      try {
        const updatedUser = { ...state.user, ...userData };
        await storageService.saveUser(updatedUser);
        dispatch({ type: 'UPDATE_USER', user: userData });
        
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  };

  return (
    <AuthContext.Provider value={{ ...state, ...authContext }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}