import axios from 'axios';

const API_BASE_URL = 'https://api.abiosgaming.com/v2';
const API_KEY = 'YOUR_API_KEY'; // Você precisará obter uma chave de API

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const tournamentAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/tournaments');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar torneios:', error);
      return [];
    }
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`/tournaments/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar torneio:', error);
      return null;
    }
  },
};

export const teamAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/teams');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar times:', error);
      return [];
    }
  },
};

export const matchAPI = {
  getUpcoming: async () => {
    try {
      const response = await api.get('/matches/upcoming');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar partidas:', error);
      return [];
    }
  },
};

// API Mock para desenvolvimento
export const mockAPI = {
  tournaments: [
    {
      id: 1,
      name: 'Galaxy Championship 2024',
      game: 'League of Legends',
      startDate: '2024-12-01',
      endDate: '2024-12-15',
      prizePool: '$1,000,000',
      status: 'upcoming',
      participants: 16,
    },
    {
      id: 2,
      name: 'Nebula Masters',
      game: 'Valorant',
      startDate: '2024-11-20',
      endDate: '2024-11-25',
      prizePool: '$500,000',
      status: 'ongoing',
      participants: 8,
    },
  ],
  
  teams: [
    {
      id: 1,
      name: 'Cosmic Legends',
      country: 'USA',
      founded: '2020',
      players: 5,
      games: ['League of Legends', 'Valorant'],
    },
    {
      id: 2,
      name: 'Star Raiders',
      country: 'Korea',
      founded: '2019',
      players: 7,
      games: ['League of Legends', 'Dota 2'],
    },
  ],
};