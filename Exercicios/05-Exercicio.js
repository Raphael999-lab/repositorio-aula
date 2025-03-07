// Função para calcular o dobro, triplo e quadrado de um número
function calcularOperacoes(numero) {
    const dobro = numero * 2;
    const triplo = numero * 3;
    const quadrado = numero * numero;
  
    return {
      dobro: dobro,
      triplo: triplo,
      quadrado: quadrado,
    };
  }
  
  // Teste com o número 5
  const numero = 5;
  const resultados = calcularOperacoes(numero);
  
  console.log(`Número: ${numero}`);
  console.log(`Dobro: ${resultados.dobro}`);
  console.log(`Triplo: ${resultados.triplo}`);
  console.log(`Quadrado: ${resultados.quadrado}`);