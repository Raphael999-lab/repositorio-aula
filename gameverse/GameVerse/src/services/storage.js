import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER: '@gameverse_user',
  FAVORITE_GAMES: '@gameverse_favorite_games',
  CUSTOM_TOURNAMENTS: '@gameverse_custom_tournaments',
  USER_PROFILE: '@gameverse_user_profile',
  SETTINGS: '@gameverse_settings',
  CACHED_DATA: '@gameverse_cached_data',
};

export const storageService = {
  // User Management
  async saveUser(userData) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      console.error('Error saving user:', error);
      return { success: false, error: error.message };
    }
  },

  async getUser() {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  // Favorite Games CRUD
  async getFavoriteGames() {
    try {
      const games = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITE_GAMES);
      return games ? JSON.parse(games) : [];
    } catch (error) {
      console.error('Error getting favorite games:', error);
      return [];
    }
  },

  async addFavoriteGame(gameData) {
    try {
      const existingGames = await this.getFavoriteGames();
      const newGame = {
        id: Date.now().toString(),
        name: gameData.name,
        category: gameData.category,
        platform: gameData.platform,
        rating: gameData.rating,
        release_date: gameData.release_date,
        developer: gameData.developer,
        description: gameData.description,
        image: gameData.image,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      const updatedGames = [...existingGames, newGame];
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITE_GAMES, JSON.stringify(updatedGames));
      
      return { success: true, data: newGame };
    } catch (error) {
      console.error('Error adding favorite game:', error);
      return { success: false, error: error.message };
    }
  },

  async updateFavoriteGame(gameId, gameData) {
    try {
      const existingGames = await this.getFavoriteGames();
      const gameIndex = existingGames.findIndex(game => game.id === gameId);
      
      if (gameIndex === -1) {
        return { success: false, error: 'Game not found' };
      }
      
      existingGames[gameIndex] = {
        ...existingGames[gameIndex],
        ...gameData,
        updated_at: new Date().toISOString(),
      };
      
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITE_GAMES, JSON.stringify(existingGames));
      
      return { success: true, data: existingGames[gameIndex] };
    } catch (error) {
      console.error('Error updating favorite game:', error);
      return { success: false, error: error.message };
    }
  },

  async deleteFavoriteGame(gameId) {
    try {
      const existingGames = await this.getFavoriteGames();
      const filteredGames = existingGames.filter(game => game.id !== gameId);
      
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITE_GAMES, JSON.stringify(filteredGames));
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting favorite game:', error);
      return { success: false, error: error.message };
    }
  },

  // Custom Tournaments CRUD
  async getCustomTournaments() {
    try {
      const tournaments = await AsyncStorage.getItem(STORAGE_KEYS.CUSTOM_TOURNAMENTS);
      return tournaments ? JSON.parse(tournaments) : [];
    } catch (error) {
      console.error('Error getting custom tournaments:', error);
      return [];
    }
  },

  async addCustomTournament(tournamentData) {
    try {
      const existingTournaments = await this.getCustomTournaments();
      const newTournament = {
        id: Date.now().toString(),
        name: tournamentData.name,
        game: tournamentData.game,
        start_date: tournamentData.start_date,
        end_date: tournamentData.end_date,
        prize_pool: tournamentData.prize_pool,
        rules: tournamentData.rules,
        status: tournamentData.status || 'upcoming',
        participants: tournamentData.participants || 0,
        location: tournamentData.location,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      const updatedTournaments = [...existingTournaments, newTournament];
      await AsyncStorage.setItem(STORAGE_KEYS.CUSTOM_TOURNAMENTS, JSON.stringify(updatedTournaments));
      
      return { success: true, data: newTournament };
    } catch (error) {
      console.error('Error adding custom tournament:', error);
      return { success: false, error: error.message };
    }
  },

  async updateCustomTournament(tournamentId, tournamentData) {
    try {
      const existingTournaments = await this.getCustomTournaments();
      const tournamentIndex = existingTournaments.findIndex(t => t.id === tournamentId);
      
      if (tournamentIndex === -1) {
        return { success: false, error: 'Tournament not found' };
      }
      
      existingTournaments[tournamentIndex] = {
        ...existingTournaments[tournamentIndex],
        ...tournamentData,
        updated_at: new Date().toISOString(),
      };
      
      await AsyncStorage.setItem(STORAGE_KEYS.CUSTOM_TOURNAMENTS, JSON.stringify(existingTournaments));
      
      return { success: true, data: existingTournaments[tournamentIndex] };
    } catch (error) {
      console.error('Error updating custom tournament:', error);
      return { success: false, error: error.message };
    }
  },

  async deleteCustomTournament(tournamentId) {
    try {
      const existingTournaments = await this.getCustomTournaments();
      const filteredTournaments = existingTournaments.filter(t => t.id !== tournamentId);
      
      await AsyncStorage.setItem(STORAGE_KEYS.CUSTOM_TOURNAMENTS, JSON.stringify(filteredTournaments));
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting custom tournament:', error);
      return { success: false, error: error.message };
    }
  },

  // User Profile CRUD
  async getUserProfile() {
    try {
      const profile = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return profile ? JSON.parse(profile) : null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  },

  async updateUserProfile(profileData) {
    try {
      const existingProfile = await this.getUserProfile();
      const updatedProfile = {
        ...existingProfile,
        ...profileData,
        updated_at: new Date().toISOString(),
      };
      
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updatedProfile));
      
      return { success: true, data: updatedProfile };
    } catch (error) {
      console.error('Error updating user profile:', error);
      return { success: false, error: error.message };
    }
  },

  // Settings Management
  async getSettings() {
    try {
      const settings = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      return settings ? JSON.parse(settings) : {
        notifications: true,
        darkMode: true,
        language: 'pt-BR',
        autoSync: true,
        qualityMode: 'high',
      };
    } catch (error) {
      console.error('Error getting settings:', error);
      return {};
    }
  },

  async updateSettings(newSettings) {
    try {
      const currentSettings = await this.getSettings();
      const updatedSettings = { ...currentSettings, ...newSettings };
      
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updatedSettings));
      
      return { success: true, data: updatedSettings };
    } catch (error) {
      console.error('Error updating settings:', error);
      return { success: false, error: error.message };
    }
  },

  // Cache Management
  async setCachedData(key, data, expirationMinutes = 30) {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
        expiration: Date.now() + (expirationMinutes * 60 * 1000),
      };
      
      await AsyncStorage.setItem(`${STORAGE_KEYS.CACHED_DATA}_${key}`, JSON.stringify(cacheData));
      
      return { success: true };
    } catch (error) {
      console.error('Error setting cached data:', error);
      return { success: false, error: error.message };
    }
  },

  async getCachedData(key) {
    try {
      const cachedData = await AsyncStorage.getItem(`${STORAGE_KEYS.CACHED_DATA}_${key}`);
      
      if (!cachedData) {
        return null;
      }
      
      const parsedData = JSON.parse(cachedData);
      
      // Check if cache is expired
      if (Date.now() > parsedData.expiration) {
        await AsyncStorage.removeItem(`${STORAGE_KEYS.CACHED_DATA}_${key}`);
        return null;
      }
      
      return parsedData.data;
    } catch (error) {
      console.error('Error getting cached data:', error);
      return null;
    }
  },

  // Clear all data
  async clearAllData() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const gameVerseKeys = keys.filter(key => key.startsWith('@gameverse_'));
      
      await AsyncStorage.multiRemove(gameVerseKeys);
      
      return { success: true };
    } catch (error) {
      console.error('Error clearing all data:', error);
      return { success: false, error: error.message };
    }
  },

  // Export/Import data
  async exportData() {
    try {
      const favoriteGames = await this.getFavoriteGames();
      const customTournaments = await this.getCustomTournaments();
      const userProfile = await this.getUserProfile();
      const settings = await this.getSettings();
      
      const exportData = {
        favoriteGames,
        customTournaments,
        userProfile,
        settings,
        exportDate: new Date().toISOString(),
        version: '1.0.0',
      };
      
      return { success: true, data: exportData };
    } catch (error) {
      console.error('Error exporting data:', error);
      return { success: false, error: error.message };
    }
  },

  async importData(importData) {
    try {
      if (importData.favoriteGames) {
        await AsyncStorage.setItem(STORAGE_KEYS.FAVORITE_GAMES, JSON.stringify(importData.favoriteGames));
      }
      
      if (importData.customTournaments) {
        await AsyncStorage.setItem(STORAGE_KEYS.CUSTOM_TOURNAMENTS, JSON.stringify(importData.customTournaments));
      }
      
      if (importData.userProfile) {
        await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(importData.userProfile));
      }
      
      if (importData.settings) {
        await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(importData.settings));
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error importing data:', error);
      return { success: false, error: error.message };
    }
  },
};