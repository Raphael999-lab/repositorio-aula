import axios from 'axios';

// Configuração base da API Abios Gaming
const ABIOS_BASE_URL = 'https://api.abiosgaming.com/v2';
const ABIOS_API_KEY = 'your_api_key_here'; // Substitua pela sua chave

// Instância do Axios para Abios Gaming
const abiosApi = axios.create({
  baseURL: ABIOS_BASE_URL,
  headers: {
    'Abios-Secret': ABIOS_API_KEY,
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Instância para APIs auxiliares (dados mock para demonstração)
const mockApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
});

// Interceptador para tratamento de erros
abiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Serviços da API Abios Gaming
export const abiosService = {
  // Obter lista de jogos
  async getGames(params = {}) {
    try {
      const response = await abiosApi.get('/games', { params });
      return {
        success: true,
        data: response.data.data || [],
        pagination: response.data.pagination,
      };
    } catch (error) {
      // Fallback com dados mock para demonstração
      return {
        success: true,
        data: getMockGames(),
        pagination: { total: 10, page: 1, per_page: 10 },
      };
    }
  },

  // Obter detalhes de um jogo
  async getGameById(gameId) {
    try {
      const response = await abiosApi.get(`/games/${gameId}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      // Fallback com dados mock
      return {
        success: true,
        data: getMockGameDetail(gameId),
      };
    }
  },

  // Obter torneios
  async getTournaments(params = {}) {
    try {
      const response = await abiosApi.get('/tournaments', { params });
      return {
        success: true,
        data: response.data.data || [],
        pagination: response.data.pagination,
      };
    } catch (error) {
      return {
        success: true,
        data: getMockTournaments(),
        pagination: { total: 8, page: 1, per_page: 10 },
      };
    }
  },

  // Obter matches/partidas
  async getMatches(params = {}) {
    try {
      const response = await abiosApi.get('/matches', { params });
      return {
        success: true,
        data: response.data.data || [],
        pagination: response.data.pagination,
      };
    } catch (error) {
      return {
        success: true,
        data: getMockMatches(),
        pagination: { total: 15, page: 1, per_page: 10 },
      };
    }
  },

  // Obter estatísticas
  async getStats(gameId) {
    try {
      const response = await abiosApi.get(`/games/${gameId}/stats`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: true,
        data: getMockStats(gameId),
      };
    }
  },

  // Obter notícias
  async getNews(params = {}) {
    try {
      const response = await mockApi.get('/posts', { params });
      return {
        success: true,
        data: response.data.map(post => ({
          id: post.id,
          title: post.title,
          body: post.body,
          image: `https://picsum.photos/400/300?random=${post.id}`,
          date: new Date().toISOString(),
          category: 'Esports',
        })),
      };
    } catch (error) {
      return {
        success: true,
        data: getMockNews(),
      };
    }
  },
};

// Dados Mock para demonstração
function getMockGames() {
  return [
    {
      id: 1,
      title: 'League of Legends',
      short_name: 'LoL',
      category: 'MOBA',
      platform: 'PC',
      rating: 4.8,
      release_date: '2009-10-27',
      developer: 'Riot Games',
      description: 'O MOBA mais popular do mundo com milhões de jogadores.',
      image: 'https://picsum.photos/400/300?random=1',
      color: '#C8AA6E',
      players_online: 150000000,
    },
    {
      id: 2,
      title: 'Counter-Strike 2',
      short_name: 'CS2',
      category: 'FPS',
      platform: 'PC',
      rating: 4.7,
      release_date: '2023-09-27',
      developer: 'Valve Corporation',
      description: 'A evolução do clássico FPS tático.',
      image: 'https://picsum.photos/400/300?random=2',
      color: '#FF6B35',
      players_online: 50000000,
    },
    {
      id: 3,
      title: 'Valorant',
      short_name: 'VAL',
      category: 'FPS',
      platform: 'PC',
      rating: 4.6,
      release_date: '2020-06-02',
      developer: 'Riot Games',
      description: 'FPS tático com habilidades únicas.',
      image: 'https://picsum.photos/400/300?random=3',
      color: '#FF4655',
      players_online: 25000000,
    },
    {
      id: 4,
      title: 'Dota 2',
      short_name: 'Dota2',
      category: 'MOBA',
      platform: 'PC',
      rating: 4.5,
      release_date: '2013-07-09',
      developer: 'Valve Corporation',
      description: 'MOBA complexo com mecânicas profundas.',
      image: 'https://picsum.photos/400/300?random=4',
      color: '#A12830',
      players_online: 12000000,
    },
    {
      id: 5,
      title: 'Rocket League',
      short_name: 'RL',
      category: 'Sports',
      platform: 'Multi',
      rating: 4.4,
      release_date: '2015-07-07',
      developer: 'Psyonix',
      description: 'Futebol com carros em alta velocidade.',
      image: 'https://picsum.photos/400/300?random=5',
      color: '#0066CC',
      players_online: 8000000,
    }
  ];
}

function getMockGameDetail(gameId) {
  const games = getMockGames();
  const game = games.find(g => g.id == gameId) || games[0];
  
  return {
    ...game,
    detailed_description: `${game.description} Este é um dos jogos mais competitivos da atualidade, com torneios mundiais e premiações milionárias. A comunidade é ativa e apaixonada, criando uma experiência única para jogadores casuais e profissionais.`,
    system_requirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        processor: 'Intel i3-4150 / AMD FX-6300',
        memory: '8 GB RAM',
        graphics: 'GTX 960 / RX 460',
        storage: '50 GB',
      },
      recommended: {
        os: 'Windows 11 64-bit',
        processor: 'Intel i5-8400 / AMD Ryzen 5 2600',
        memory: '16 GB RAM',
        graphics: 'RTX 3060 / RX 6600',
        storage: '100 GB SSD',
      }
    },
    tournaments_count: Math.floor(Math.random() * 50) + 10,
    prize_pool_total: Math.floor(Math.random() * 10000000) + 1000000,
  };
}

function getMockTournaments() {
  return [
    {
      id: 1,
      name: 'World Championship 2024',
      game: 'League of Legends',
      start_date: '2024-12-01',
      end_date: '2024-12-15',
      prize_pool: 5000000,
      rules: 'Torneio internacional com as melhores equipes do mundo.',
      status: 'upcoming',
      participants: 24,
      location: 'Seoul, South Korea',
      image: 'https://picsum.photos/400/300?random=11',
    },
    {
      id: 2,
      name: 'Major Championship',
      game: 'Counter-Strike 2',
      start_date: '2024-11-20',
      end_date: '2024-11-24',
      prize_pool: 2000000,
      rules: 'Major CS2 com as equipes ranqueadas.',
      status: 'live',
      participants: 16,
      location: 'Stockholm, Sweden',
      image: 'https://picsum.photos/400/300?random=12',
    },
    {
      id: 3,
      name: 'Champions Tour',
      game: 'Valorant',
      start_date: '2024-10-15',
      end_date: '2024-10-22',
      prize_pool: 1500000,
      rules: 'Circuito mundial de Valorant.',
      status: 'finished',
      participants: 12,
      location: 'Los Angeles, USA',
      image: 'https://picsum.photos/400/300?random=13',
    }
  ];
}

function getMockMatches() {
  return [
    {
      id: 1,
      team1: { name: 'Team Alpha', logo: 'https://picsum.photos/100/100?random=21' },
      team2: { name: 'Team Beta', logo: 'https://picsum.photos/100/100?random=22' },
      game: 'League of Legends',
      tournament: 'World Championship 2024',
      start_time: new Date(Date.now() + 86400000).toISOString(),
      status: 'upcoming',
      best_of: 3,
    },
    {
      id: 2,
      team1: { name: 'Natus Vincere', logo: 'https://picsum.photos/100/100?random=23' },
      team2: { name: 'Astralis', logo: 'https://picsum.photos/100/100?random=24' },
      game: 'Counter-Strike 2',
      tournament: 'Major Championship',
      start_time: new Date(Date.now() + 43200000).toISOString(),
      status: 'live',
      best_of: 3,
      score: { team1: 1, team2: 0 },
    }
  ];
}

function getMockStats(gameId) {
  return {
    total_players: Math.floor(Math.random() * 100000000) + 10000000,
    daily_active: Math.floor(Math.random() * 10000000) + 1000000,
    tournaments_this_month: Math.floor(Math.random() * 20) + 5,
    total_prize_money: Math.floor(Math.random() * 50000000) + 10000000,
    top_regions: [
      { name: 'North America', percentage: 35 },
      { name: 'Europe', percentage: 30 },
      { name: 'Asia', percentage: 25 },
      { name: 'South America', percentage: 10 },
    ],
    player_growth: [
      { month: 'Jan', players: 45000000 },
      { month: 'Feb', players: 47000000 },
      { month: 'Mar', players: 49000000 },
      { month: 'Apr', players: 52000000 },
      { month: 'May', players: 55000000 },
      { month: 'Jun', players: 58000000 },
    ],
  };
}

function getMockNews() {
  return [
    {
      id: 1,
      title: 'Nova Atualização do League of Legends Traz Mudanças Significativas',
      body: 'A Riot Games anunciou grandes mudanças no meta do jogo com a nova atualização.',
      image: 'https://picsum.photos/400/300?random=31',
      date: new Date().toISOString(),
      category: 'Updates',
    },
    {
      id: 2,
      title: 'Counter-Strike 2: Novo Mapa Revelado para o Próximo Major',
      body: 'Valve Corporation revela detalhes sobre o novo mapa competitivo.',
      image: 'https://picsum.photos/400/300?random=32',
      date: new Date(Date.now() - 86400000).toISOString(),
      category: 'Tournaments',
    }
  ];
}