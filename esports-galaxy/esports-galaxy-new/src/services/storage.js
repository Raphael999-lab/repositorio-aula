import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  TEAMS: '@esports_teams',
  PLAYERS: '@esports_players',
  FAVORITES: '@esports_favorites',
  USER_PROFILE: '@user_profile',
};

export const storage = {
  // Teams CRUD
  async saveTeam(team) {
    try {
      const teams = await this.getTeams();
      const newTeam = { ...team, id: Date.now().toString() };
      teams.push(newTeam);
      await AsyncStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(teams));
      return newTeam;
    } catch (error) {
      console.error('Erro ao salvar time:', error);
    }
  },

  async getTeams() {
    try {
      const teams = await AsyncStorage.getItem(STORAGE_KEYS.TEAMS);
      return teams ? JSON.parse(teams) : [];
    } catch (error) {
      console.error('Erro ao buscar times:', error);
      return [];
    }
  },

  async updateTeam(id, updatedTeam) {
    try {
      const teams = await this.getTeams();
      const index = teams.findIndex(team => team.id === id);
      if (index !== -1) {
        teams[index] = { ...teams[index], ...updatedTeam };
        await AsyncStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(teams));
        return teams[index];
      }
    } catch (error) {
      console.error('Erro ao atualizar time:', error);
    }
  },

  async deleteTeam(id) {
    try {
      const teams = await this.getTeams();
      const filteredTeams = teams.filter(team => team.id !== id);
      await AsyncStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(filteredTeams));
      return true;
    } catch (error) {
      console.error('Erro ao deletar time:', error);
      return false;
    }
  },

  // Players CRUD
  async savePlayer(player) {
    try {
      const players = await this.getPlayers();
      const newPlayer = { ...player, id: Date.now().toString() };
      players.push(newPlayer);
      await AsyncStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(players));
      return newPlayer;
    } catch (error) {
      console.error('Erro ao salvar jogador:', error);
    }
  },

  async getPlayers() {
    try {
      const players = await AsyncStorage.getItem(STORAGE_KEYS.PLAYERS);
      return players ? JSON.parse(players) : [];
    } catch (error) {
      console.error('Erro ao buscar jogadores:', error);
      return [];
    }
  },

  async updatePlayer(id, updatedPlayer) {
    try {
      const players = await this.getPlayers();
      const index = players.findIndex(player => player.id === id);
      if (index !== -1) {
        players[index] = { ...players[index], ...updatedPlayer };
        await AsyncStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(players));
        return players[index];
      }
    } catch (error) {
      console.error('Erro ao atualizar jogador:', error);
    }
  },

  async deletePlayer(id) {
    try {
      const players = await this.getPlayers();
      const filteredPlayers = players.filter(player => player.id !== id);
      await AsyncStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(filteredPlayers));
      return true;
    } catch (error) {
      console.error('Erro ao deletar jogador:', error);
      return false;
    }
  },

  // Favorites
  async toggleFavorite(item, type) {
    try {
      const favorites = await this.getFavorites();
      const key = `${type}_${item.id}`;
      
      if (favorites[key]) {
        delete favorites[key];
      } else {
        favorites[key] = { ...item, type, favoritedAt: new Date().toISOString() };
      }
      
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
      return !favorites[key];
    } catch (error) {
      console.error('Erro ao alternar favorito:', error);
    }
  },

  async getFavorites() {
    try {
      const favorites = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
      return favorites ? JSON.parse(favorites) : {};
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error);
      return {};
    }
  },

  // User Profile
  async saveProfile(profile) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
      return profile;
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
    }
  },

  async getProfile() {
    try {
      const profile = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return profile ? JSON.parse(profile) : null;
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      return null;
    }
  },
};