export const validators = {
  required: (value) => {
    return value && value.trim() !== '' ? null : 'Campo obrigatório';
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Email inválido';
  },

  cpf: (value) => {
    const cpfClean = value.replace(/[^\d]/g, '');
    if (cpfClean.length !== 11) return 'CPF inválido';
    
    // Validação básica de CPF
    let sum = 0;
    let remainder;
    
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpfClean.substring(i - 1, i)) * (11 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpfClean.substring(9, 10))) return 'CPF inválido';
    
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpfClean.substring(i - 1, i)) * (12 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpfClean.substring(10, 11))) return 'CPF inválido';
    
    return null;
  },

  phone: (value) => {
    const phoneClean = value.replace(/[^\d]/g, '');
    return phoneClean.length >= 10 && phoneClean.length <= 11 ? null : 'Telefone inválido';
  },

  date: (value) => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(value)) return 'Data inválida (DD/MM/AAAA)';
    
    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    
    if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
      return 'Data inválida';
    }
    
    return null;
  },

  minLength: (min) => (value) => {
    return value && value.length >= min ? null : `Mínimo ${min} caracteres`;
  },

  maxLength: (max) => (value) => {
    return value && value.length <= max ? null : `Máximo ${max} caracteres`;
  },

  number: (value) => {
    return !isNaN(value) && !isNaN(parseFloat(value)) ? null : 'Deve ser um número';
  },

  positiveNumber: (value) => {
    const num = parseFloat(value);
    return !isNaN(num) && num > 0 ? null : 'Deve ser um número positivo';
  },
};