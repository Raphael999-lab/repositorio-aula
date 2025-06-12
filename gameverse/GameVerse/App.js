import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';
import { darkTheme } from './src/utils/theme';
import { notificationService } from './src/services/notifications';

// Configurar notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    // Inicializar serviços
    notificationService.initialize();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AuthProvider>
          <PaperProvider theme={darkTheme}>
            <NavigationContainer>
              <StatusBar style="light" backgroundColor="#0A0A0F" translucent />
              <AppNavigator />
            </NavigationContainer>
          </PaperProvider>
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}