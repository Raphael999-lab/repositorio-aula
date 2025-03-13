// Função para somar dois números
export function soma(a, b) {
    return a + b;
}

// Função para subtrair dois números
export function subtracao(a, b) {
    return a - b;
}

// Função para multiplicar dois números
export function multiplicacao(a, b) {
    return a * b;
}

// Função para dividir dois números
export function divisao(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error("Ambos os parâmetros devem ser números.");
    }
    if (b === 0) {
        throw new Error("Divisão por zero não é permitida.");
    }
    return a / b;
}