// Importa as funções da calculadora
import { soma, subtracao, multiplicacao, divisao } from './calculadora.js';

// Importa a função calcularIdade
import { calcularIdade } from './calcularidade.js';

// Função principal para executar tudo
function main() {
    console.log("=== Calculadora ===");
    try {
        console.log("Soma: ", soma(10, 5));          // Soma: 15
        console.log("Subtração: ", subtracao(10, 5)); // Subtração: 5
        console.log("Multiplicação: ", multiplicacao(10, 5)); // Multiplicação: 50
        console.log("Divisão: ", divisao(10, 5));    // Divisão: 2
    } catch (error) {
        console.error("Erro ao realizar cálculos: ", error.message);
    }

    console.log("\n=== Cálculo de Idade ===");
    try {
        const anoNascimento = 2002;
        const idade = calcularIdade(anoNascimento);
        console.log(`Idade: ${idade} anos`);
    } catch (error) {
        console.error("Erro ao calcular idade: ", error.message);
    }
}

// Executa a função principal
main();