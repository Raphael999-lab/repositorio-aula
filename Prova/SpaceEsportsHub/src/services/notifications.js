import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Falha ao obter token de notificação!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    console.log('Use um dispositivo físico para notificações push');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export async function scheduleNotificationAsync(notification) {
  await Notifications.scheduleNotificationAsync(notification);
}