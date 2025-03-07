// Função para verificar a idade
function verificarIdade(idade) {
    if (idade < 18) {
      console.log("Menor de idade.");
    } else if (idade >= 18 && idade < 65) {
      console.log("Maior de idade.");
    } else {
      console.log("Idosa (idade >= 65).");
    }
  }
  
  // Teste com a idade 70
  const idade = 70;
  verificarIdade(idade);