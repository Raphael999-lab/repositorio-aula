import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import AppNavigator from './navigation/AppNavigator';
import { theme } from './styles/theme';
import { registerForPushNotificationsAsync } from './services/notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  React.useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
}