// src/utils/formatters.js
export const formatters = {
  // Format phone number: (11) 99999-9999
  phone: (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  },

  // Format CPF: 000.000.000-00
  cpf: (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  },

  // Format date: YYYY-MM-DD
  date: (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 4) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
    return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(6, 8)}`;
  },

  // Format currency: R$ 0.000,00
  currency: (value) => {
    const numbers = value.replace(/\D/g, '');
    const amount = parseInt(numbers) / 100;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  },

  // Format rating: 0.0 - 5.0
  rating: (value) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    const parts = numericValue.split('.');
    
    if (parts.length > 2) {
      return parts[0] + '.' + parts[1];
    }
    
    if (parts[1] && parts[1].length > 1) {
      parts[1] = parts[1].substring(0, 1);
    }
    
    const result = parts.join('.');
    const num = parseFloat(result);
    
    if (num > 5) {
      return '5.0';
    }
    
    return result;
  },

  // Remove all non-numeric characters
  numbersOnly: (value) => {
    return value.replace(/\D/g, '');
  },

  // Capitalize first letter of each word
  titleCase: (value) => {
    return value.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  },

  // Format file size
  fileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Format number with thousands separator
  number: (value) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  },

  // Format percentage
  percentage: (value, decimals = 1) => {
    return `${(value * 100).toFixed(decimals)}%`;
  },

  // Format relative time (e.g., "2 horas atrás")
  relativeTime: (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} dia${days > 1 ? 's' : ''} atrás`;
    if (hours > 0) return `${hours} hora${hours > 1 ? 's' : ''} atrás`;
    if (minutes > 0) return `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`;
    return 'Agora mesmo';
  },

  // Format duration in minutes to hours:minutes
  duration: (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}min`;
    }
    return `${mins}min`;
  },
};

// src/utils/constants.js
export const COLORS = {
  primary: '#00D2FF',
  secondary: '#3A0CA3',
  accent: '#FF006E',
  background: '#0A0A0F',
  surface: '#1A1A2E',
  card: '#16213E',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  success: '#00FF88',
  warning: '#FFB800',
  error: '#FF5252',
  gradient: {
    primary: ['#00D2FF', '#3A0CA3'],
    secondary: ['#FF006E', '#8338EC'],
    background: ['#0A0A0F', '#1A1A2E', '#16213E'],
    neon: ['#00D2FF', '#FF006E', '#00FF88'],
  }
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const TYPOGRAPHY = {
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  body: 16,
  caption: 14,
  small: 12,
};

export const SHADOWS = {
  small: {
    shadowColor: '#00D2FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: '#FF006E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  large: {
    shadowColor: '#00FF88',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
};

export const GAME_CATEGORIES = [
  { key: 'MOBA', label: 'MOBA', icon: 'sword-cross' },
  { key: 'FPS', label: 'FPS', icon: 'target' },
  { key: 'RPG', label: 'RPG', icon: 'wizard-hat' },
  { key: 'Strategy', label: 'Strategy', icon: 'chess-king' },
  { key: 'Sports', label: 'Sports', icon: 'soccer' },
  { key: 'Racing', label: 'Racing', icon: 'car-sports' },
  { key: 'Fighting', label: 'Fighting', icon: 'boxing-glove' },
  { key: 'Puzzle', label: 'Puzzle', icon: 'puzzle' },
  { key: 'Adventure', label: 'Adventure', icon: 'compass' },
  { key: 'Simulation', label: 'Simulation', icon: 'cog' },
];

export const PLATFORMS = [
  { key: 'PC', label: 'PC', icon: 'monitor' },
  { key: 'PlayStation', label: 'PlayStation', icon: 'sony-playstation' },
  { key: 'Xbox', label: 'Xbox', icon: 'microsoft-xbox' },
  { key: 'Nintendo Switch', label: 'Nintendo Switch', icon: 'nintendo-switch' },
  { key: 'Mobile', label: 'Mobile', icon: 'cellphone' },
  { key: 'Multi', label: 'Multi-platform', icon: 'devices' },
  { key: 'VR', label: 'VR', icon: 'virtual-reality' },
  { key: 'Browser', label: 'Browser', icon: 'web' },
];

export const TOURNAMENT_STATUS = [
  { key: 'upcoming', label: 'Próximo', color: '#FFB800' },
  { key: 'live', label: 'Ao Vivo', color: '#FF006E' },
  { key: 'finished', label: 'Finalizado', color: '#00FF88' },
  { key: 'cancelled', label: 'Cancelado', color: '#FF5252' },
];

export const COUNTRIES = [
  'Brasil', 'Argentina', 'Chile', 'Colômbia', 'Peru', 'Uruguai',
  'Estados Unidos', 'Canadá', 'México',
  'Reino Unido', 'França', 'Alemanha', 'Espanha', 'Itália',
  'Japão', 'Coreia do Sul', 'China', 'Índia',
  'Austrália', 'Nova Zelândia',
];

export const API_ENDPOINTS = {
  ABIOS_BASE_URL: 'https://api.abiosgaming.com/v2',
  BACKUP_API_URL: 'https://jsonplaceholder.typicode.com',
};

export const STORAGE_KEYS = {
  USER: '@gameverse_user',
  FAVORITE_GAMES: '@gameverse_favorite_games',
  CUSTOM_TOURNAMENTS: '@gameverse_custom_tournaments',
  USER_PROFILE: '@gameverse_user_profile',
  SETTINGS: '@gameverse_settings',
  CACHED_DATA: '@gameverse_cached_data',
};

export const NOTIFICATION_TYPES = {
  MATCH_STARTING: 'match_starting',
  TOURNAMENT_STARTING: 'tournament_starting',
  GAME_UPDATE: 'game_update',
  NEW_TOURNAMENT: 'new_tournament',
  MATCH_RESULT: 'match_result',
  WEEKLY_STATS: 'weekly_stats',
};

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
};

export const CHART_COLORS = [
  '#00D2FF',
  '#FF006E',
  '#00FF88',
  '#FFB800',
  '#8338EC',
  '#FF5252',
];

export const DEFAULT_AVATAR = 'https://picsum.photos/200/200?random=default';

export const APP_VERSION = '1.0.0';
export const APP_NAME = 'GameVerse';
export const APP_DESCRIPTION = 'O melhor app para gamers e entusiastas de esports';