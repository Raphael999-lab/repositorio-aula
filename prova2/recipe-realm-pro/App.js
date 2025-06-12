import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';

// Polyfill para o funcionamento do UUID no React Native
import 'react-native-get-random-values';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <PaperProvider>
          <StatusBar style="light" />
          <AppNavigator />
        </PaperProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
