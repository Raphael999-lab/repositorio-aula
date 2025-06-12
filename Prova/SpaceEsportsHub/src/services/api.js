import axios from 'axios';

const API_KEY = process.env.APIOS_API_KEY || 'your_abios_api_key_here';
const BASE_URL = 'https://api.abiosgaming.com/v2';

const mockMatches = [
  {
    id: 1,
    team1: 'Team Liquid',
    team2: 'Fnatic',
    game: 'CS:GO',
    date: '2025-06-15',
    status: 'Próxima',
  },
  {
    id: 2,
    team1: 'G2 Esports',
    team2: 'Natus Vincere',
    game: 'CS:GO',
    date: '2025-06-16',
    status: 'Ao Vivo',
  },
  {
    id: 3,
    team1: 'T1',
    team2: 'Gen.G',
    game: 'LoL',
    date: '2025-06-17',
    status: 'Próxima',
  },
  {
    id: 4,
    team1: 'Sentinels',
    team2: '100 Thieves',
    game: 'Valorant',
    date: '2025-06-18',
    status: 'Próxima',
  },
];

export const fetchMatches = async () => {
  try {
    /*
    const response = await axios.get(`${BASE_URL}/matches`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      params: {
        // Adicione parâmetros conforme documentação da Abios
      },
    });
    return response.data;
    */
    return mockMatches;
  } catch (error) {
    console.error('Erro na API:', error);
    throw error;
  }
};