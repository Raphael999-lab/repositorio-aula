// Função para realizar as operações
function operacoesAritmeticas(num1, num2) {
    // 1. Soma dos dois números
    const soma = num1 + num2;
    console.log(`Soma de ${num1} + ${num2} = ${soma}`);
  
    // 2. Subtração do segundo número do primeiro
    const subtracao = num1 - num2;
    console.log(`Subtração de ${num1} - ${num2} = ${subtracao}`);
  
    // 3. Multiplicação dos dois números
    const multiplicacao = num1 * num2;
    console.log(`Multiplicação de ${num1} * ${num2} = ${multiplicacao}`);
  
    // 4. Divisão do primeiro número pelo segundo
    const divisao = num1 / num2;
    console.log(`Divisão de ${num1} / ${num2} = ${divisao}`);
  
    // 5. Verificação se o primeiro número é maior que o segundo
    const maior = num1 > num2;
    console.log(`${num1} é maior que ${num2}? ${maior}`);
  }
  
  // Teste com os números 15 e 5
  const numero1 = 15;
  const numero2 = 5;
  
  operacoesAritmeticas(numero1, numero2);