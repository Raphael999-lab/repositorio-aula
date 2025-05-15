export const generateRandomNumbers = (min, max, count) => {
  const numeros = [];
  while (numeros.length < count) {
    const numero = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!numeros.includes(numero)) {
      numeros.push(numero);
    }
  }
  return numeros.sort((a, b) => a - b);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};