//Exercício 1: Manipulação de Strings 
// Função para manipular a string
function manipularString(texto, letraOriginal, letraSubstituta) {
    // 1. Converta a string para maiúsculas
    const maiusculas = texto.toUpperCase();
    console.log("String em maiúsculas:", maiusculas);
  
    // 2. Converta a string para minúsculas
    const minusculas = texto.toLowerCase();
    console.log("String em minúsculas:", minusculas);
  
    // 3. Inverta a string
    const invertida = texto.split('').reverse().join('');
    console.log("String invertida:", invertida);
  
    // 4. Substitua todas as ocorrências de uma letra específica por outra
    const substituida = texto.split(letraOriginal).join(letraSubstituta);
    console.log(`String com '${letraOriginal}' substituído por '${letraSubstituta}':`, substituida);
  }
  
  // Exemplo de uso
  const texto = "aaah, lulaaaa!";
  const letraOriginal = "l";
  const letraSubstituta = "x";
  
  manipularString(texto, letraOriginal, letraSubstituta);