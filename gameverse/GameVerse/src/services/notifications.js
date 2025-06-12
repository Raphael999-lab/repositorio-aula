import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

export const notificationService = {
  async initialize() {
    try {
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        
        if (finalStatus !== 'granted') {
          console.log('Failed to get push token for push notification!');
          return false;
        }
        
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('Push notification token:', token);
        
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#00D2FF',
          });
        }
        
        return true;
      } else {
        console.log('Must use physical device for Push Notifications');
        return false;
      }
    } catch (error) {
      console.error('Error initializing notifications:', error);
      return false;
    }
  },

  async scheduleMatchNotification(match, minutesBefore = 15) {
    try {
      const matchTime = new Date(match.start_time);
      const notificationTime = new Date(matchTime.getTime() - (minutesBefore * 60 * 1000));
      
      if (notificationTime <= new Date()) {
        console.log('Match time is in the past, not scheduling notification');
        return null;
      }

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: '🎮 Match Começando!',
          body: `${match.team1.name} vs ${match.team2.name} em ${minutesBefore} minutos`,
          data: { 
            type: 'match',
            matchId: match.id,
            teams: `${match.team1.name} vs ${match.team2.name}`,
          },
          sound: 'default',
        },
        trigger: {
          date: notificationTime,
        },
      });

      console.log('Match notification scheduled:', notificationId);
      return notificationId;
    } catch (error) {
      console.error('Error scheduling match notification:', error);
      return null;
    }
  },

  async scheduleTournamentNotification(tournament, hoursBefore = 2) {
    try {
      const tournamentTime = new Date(tournament.start_date);
      const notificationTime = new Date(tournamentTime.getTime() - (hoursBefore * 60 * 60 * 1000));
      
      if (notificationTime <= new Date()) {
        console.log('Tournament time is in the past, not scheduling notification');
        return null;
      }

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: '🏆 Torneio Começando!',
          body: `${tournament.name} começa em ${hoursBefore} horas`,
          data: { 
            type: 'tournament',
            tournamentId: tournament.id,
            name: tournament.name,
          },
          sound: 'default',
        },
        trigger: {
          date: notificationTime,
        },
      });

      console.log('Tournament notification scheduled:', notificationId);
      return notificationId;
    } catch (error) {
      console.error('Error scheduling tournament notification:', error);
      return null;
    }
  },

  async sendInstantNotification(title, body, data = {}) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          sound: 'default',
        },
        trigger: null, // Send immediately
      });
    } catch (error) {
      console.error('Error sending instant notification:', error);
    }
  },

  async cancelNotification(notificationId) {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      console.log('Notification cancelled:', notificationId);
    } catch (error) {
      console.error('Error cancelling notification:', error);
    }
  },

  async cancelAllNotifications() {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log('All notifications cancelled');
    } catch (error) {
      console.error('Error cancelling all notifications:', error);
    }
  },

  async getScheduledNotifications() {
    try {
      const notifications = await Notifications.getAllScheduledNotificationsAsync();
      return notifications;
    } catch (error) {
      console.error('Error getting scheduled notifications:', error);
      return [];
    }
  },

  // Gaming specific notifications
  async notifyGameUpdate(game) {
    await this.sendInstantNotification(
      '🎮 Jogo Atualizado!',
      `${game.name} recebeu uma nova atualização`,
      { type: 'game_update', gameId: game.id }
    );
  },

  async notifyNewTournament(tournament) {
    await this.sendInstantNotification(
      '🏆 Novo Torneio!',
      `${tournament.name} está aberto para inscrições`,
      { type: 'new_tournament', tournamentId: tournament.id }
    );
  },

  async notifyMatchResult(match, result) {
    const winner = result.winner === 'team1' ? match.team1.name : match.team2.name;
    await this.sendInstantNotification(
      '🎯 Resultado da Partida!',
      `${winner} venceu ${match.team1.name} vs ${match.team2.name}`,
      { type: 'match_result', matchId: match.id, result }
    );
  },

  async notifyFavoriteGameNews(game, news) {
    await this.sendInstantNotification(
      `📰 ${game.name} News`,
      news.title,
      { type: 'game_news', gameId: game.id, newsId: news.id }
    );
  },

  async notifyWeeklyStats(stats) {
    await this.sendInstantNotification(
      '📊 Relatório Semanal',
      `Você jogou ${stats.gamesPlayed} jogos esta semana!`,
      { type: 'weekly_stats', stats }
    );
  },

  // Notification handlers
  addNotificationReceivedListener(handler) {
    return Notifications.addNotificationReceivedListener(handler);
  },

  addNotificationResponseReceivedListener(handler) {
    return Notifications.addNotificationResponseReceivedListener(handler);
  },

  removeNotificationSubscription(subscription) {
    if (subscription) {
      Notifications.removeNotificationSubscription(subscription);
    }
  },
};