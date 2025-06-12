// Utility functions for form validation

export const validationRules = {
  // Email validation
  email: {
    required: 'Email é obrigatório',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Email inválido',
    },
  },

  // Password validation
  password: {
    required: 'Senha é obrigatória',
    minLength: {
      value: 6,
      message: 'Senha deve ter pelo menos 6 caracteres',
    },
  },

  // Name validation
  name: {
    required: 'Nome é obrigatório',
    minLength: {
      value: 2,
      message: 'Nome deve ter pelo menos 2 caracteres',
    },
    maxLength: {
      value: 50,
      message: 'Nome deve ter no máximo 50 caracteres',
    },
  },

  // Game name validation
  gameName: {
    required: 'Nome do jogo é obrigatório',
    minLength: {
      value: 2,
      message: 'Nome deve ter pelo menos 2 caracteres',
    },
    maxLength: {
      value: 100,
      message: 'Nome deve ter no máximo 100 caracteres',
    },
  },

  // Rating validation
  rating: {
    required: 'Avaliação é obrigatória',
    pattern: {
      value: /^[0-5](\.[0-9])?$/,
      message: 'Avaliação deve ser entre 0.0 e 5.0',
    },
  },

  // Date validation (YYYY-MM-DD format)
  date: {
    required: 'Data é obrigatória',
    pattern: {
      value: /^\d{4}-\d{2}-\d{2}$/,
      message: 'Data deve estar no formato AAAA-MM-DD',
    },
    validate: (value) => {
      const date = new Date(value);
      const today = new Date();
      
      if (isNaN(date.getTime())) {
        return 'Data inválida';
      }
      
      if (date > today) {
        return 'Data não pode ser no futuro';
      }
      
      return true;
    },
  },

  // Future date validation
  futureDate: {
    required: 'Data é obrigatória',
    pattern: {
      value: /^\d{4}-\d{2}-\d{2}$/,
      message: 'Data deve estar no formato AAAA-MM-DD',
    },
    validate: (value) => {
      const date = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (isNaN(date.getTime())) {
        return 'Data inválida';
      }
      
      if (date < today) {
        return 'Data deve ser hoje ou no futuro';
      }
      
      return true;
    },
  },

  // Description validation
  description: {
    required: 'Descrição é obrigatória',
    minLength: {
      value: 10,
      message: 'Descrição deve ter pelo menos 10 caracteres',
    },
    maxLength: {
      value: 500,
      message: 'Descrição deve ter no máximo 500 caracteres',
    },
  },

  // Prize pool validation
  prizePool: {
    required: 'Premiação é obrigatória',
    min: {
      value: 0,
      message: 'Premiação deve ser um valor positivo',
    },
  },

  // Phone validation (Brazilian format)
  phone: {
    pattern: {
      value: /^\(\d{2}\) \d{4,5}-\d{4}$/,
      message: 'Telefone deve estar no formato (11) 99999-9999',
    },
  },

  // CPF validation (Brazilian format)
  cpf: {
    pattern: {
      value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      message: 'CPF deve estar no formato 000.000.000-00',
    },
    validate: (value) => {
      if (!value) return true; // Optional field
      return validateCPF(value) || 'CPF inválido';
    },
  },

  // URL validation
  url: {
    pattern: {
      value: /^https?:\/\/.+\..+/,
      message: 'URL inválida',
    },
  },

  // Required field
  required: (fieldName) => ({
    required: `${fieldName} é obrigatório`,
  }),

  // Select field validation
  select: (fieldName) => ({
    required: `${fieldName} é obrigatório`,
    validate: (value) => value !== '' || `${fieldName} deve ser selecionado`,
  }),
};

// Custom validation functions
export const validateCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]/g, '');
  
  if (cpf.length !== 11) return false;
  
  // Check for known invalid sequences
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  
  // Validate check digits
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf[i]) * (10 - i);
  }
  
  let checkDigit = 11 - (sum % 11);
  if (checkDigit === 10 || checkDigit === 11) checkDigit = 0;
  
  if (checkDigit !== parseInt(cpf[9])) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf[i]) * (11 - i);
  }
  
  checkDigit = 11 - (sum % 11);
  if (checkDigit === 10 || checkDigit === 11) checkDigit = 0;
  
  return checkDigit === parseInt(cpf[10]);
};

export const validateEmail = (email) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
};

export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateDate = (dateString) => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

export const validatePhoneNumber = (phone) => {
  const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  return regex.test(phone);
};

// Form validation helpers
export const getFieldError = (errors, fieldName) => {
  return errors[fieldName]?.message;
};

export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};

export const formatValidationErrors = (errors) => {
  return Object.values(errors)
    .map(error => error.message)
    .join('\n');
};

// Input formatters
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
};

// Validation schemas for common forms
export const schemas = {
  login: {
    email: validationRules.email,
    password: validationRules.password,
  },
  
  register: {
    name: validationRules.name,
    email: validationRules.email,
    password: validationRules.password,
  },
  
  game: {
    name: validationRules.gameName,
    category: validationRules.select('Categoria'),
    platform: validationRules.select('Plataforma'),
    rating: validationRules.rating,
    release_date: validationRules.date,
    developer: validationRules.name,
    description: validationRules.description,
  },
  
  tournament: {
    name: validationRules.name,
    game: validationRules.select('Jogo'),
    start_date: validationRules.futureDate,
    end_date: validationRules.futureDate,
    prize_pool: validationRules.prizePool,
    rules: validationRules.description,
    location: validationRules.name,
  },
  
  profile: {
    name: validationRules.name,
    email: validationRules.email,
    bio: {
      maxLength: {
        value: 200,
        message: 'Bio deve ter no máximo 200 caracteres',
      },
    },
    country: validationRules.select('País'),
    birth_date: validationRules.date,
  },
};