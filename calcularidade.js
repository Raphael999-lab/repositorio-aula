import moment from 'moment';

// Exporta a função calcularIdade
export function calcularIdade(anoNascimento) {
    // Verifica se o ano de nascimento é um número válido
    if (typeof anoNascimento !== 'number' || anoNascimento <= 0) {
        throw new Error("Ano de nascimento deve ser um número válido.");
    }

    // Obtém o ano atual usando Moment.js
    const anoAtual = moment().year();

    // Calcula a idade subtraindo o ano de nascimento do ano atual
    const idade = anoAtual - anoNascimento;

    return idade;
}