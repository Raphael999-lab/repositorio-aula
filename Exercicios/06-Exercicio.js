// Função para manipular o array
function manipularArray(array) {
    // 1. Adicionar um número ao final do array
    array.push(60);
    console.log("Array após adicionar 60:", array);
  
    // 2. Remover o primeiro número do array
    const primeiroNumero = array.shift();
    console.log("Primeiro número removido:", primeiroNumero);
    console.log("Array após remover o primeiro número:", array);
  
    // 3. Encontrar o maior número do array
    const maiorNumero = Math.max(...array);
    console.log("Maior número do array:", maiorNumero);
  
    // 4. Encontrar o menor número do array
    const menorNumero = Math.min(...array);
    console.log("Menor número do array:", menorNumero);
  }
  
  // Teste com o array [10, 20, 30, 40, 50]
  const numeros = [10, 20, 30, 40, 50];
  manipularArray(numeros);