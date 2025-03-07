// Função para desestruturar e formatar informações do livro
function informacoesLivro(livro) {
    // 1. Desestruturação do título e autor
    const { titulo, autor } = livro;
  
    // 2. Retornar uma string com o título e o autor
    return `O livro "${titulo}" foi escrito por ${autor}.`;
  }
  
  // Objeto representando o livro
  const livro = {
    titulo: "O Senhor dos Anéis",
    autor: "J.R. Tolkien",
    ano: 1954,
  };
  
  // Teste da função
  const mensagem = informacoesLivro(livro);
  console.log(mensagem);