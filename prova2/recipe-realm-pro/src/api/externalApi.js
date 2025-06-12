import axios from 'axios';

// URLs das APIs
const MEAL_DB_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
const FACTS_API_URL = 'https://uselessfacts.jsph.pl/api/v2/facts/random?language=en';

// --- Funções da API TheMealDB ---
export const getRandomMeal = async () => {
  try {
    const response = await axios.get(`${MEAL_DB_BASE_URL}/random.php`);
    return response.data.meals ? response.data.meals[0] : null;
  } catch (error) {
    console.error("Erro ao buscar receita aleatória:", error);
    return null;
  }
};

export const searchMealsByName = async (name) => {
  try {
    if (!name || name.trim() === '') return [];
    const response = await axios.get(`${MEAL_DB_BASE_URL}/search.php?s=${encodeURIComponent(name)}`);
    return response.data.meals || [];
  } catch (error) {
    console.error("Erro ao buscar receitas por nome:", error);
    return [];
  }
};

export const getMealsByCategory = async (category) => {
  try {
    if (!category || category.trim() === '') return [];
    const response = await axios.get(`${MEAL_DB_BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
    return response.data.meals || [];
  } catch (error) {
    console.error("Erro ao buscar receitas por categoria:", error);
    return [];
  }
};

export const getMealsByArea = async (area) => {
  try {
    if (!area || area.trim() === '') return [];
    const response = await axios.get(`${MEAL_DB_BASE_URL}/filter.php?a=${encodeURIComponent(area)}`);
    return response.data.meals || [];
  } catch (error) {
    console.error("Erro ao buscar receitas por região:", error);
    return [];
  }
};

export const getMealById = async (id) => {
  try {
    if (!id) return null;
    const response = await axios.get(`${MEAL_DB_BASE_URL}/lookup.php?i=${id}`);
    return response.data.meals ? response.data.meals[0] : null;
  } catch (error) {
    console.error("Erro ao buscar receita por ID:", error);
    return null;
  }
};

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${MEAL_DB_BASE_URL}/categories.php`);
    return response.data.categories || [];
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return [];
  }
};

export const getAllAreas = async () => {
  try {
    const response = await axios.get(`${MEAL_DB_BASE_URL}/list.php?a=list`);
    return response.data.meals || [];
  } catch (error) {
    console.error("Erro ao buscar áreas:", error);
    return [];
  }
};

export const getAllIngredients = async () => {
  try {
    const response = await axios.get(`${MEAL_DB_BASE_URL}/list.php?i=list`);
    return response.data.meals || [];
  } catch (error) {
    console.error("Erro ao buscar ingredientes:", error);
    return [];
  }
};

// --- Função para dicas diárias (versão melhorada) ---
export const getDailyTip = async () => {
  try {
    // Primeiro tenta buscar uma receita aleatória
    const randomMeal = await getRandomMeal();
    if (randomMeal) {
      const mealName = randomMeal.strMeal;
      const mealArea = randomMeal.strArea;
      const mealCategory = randomMeal.strCategory;
      
      return `🍽️ Dica Culinária de Hoje: Que tal experimentar ${mealName}? É uma deliciosa especialidade ${mealArea} da categoria ${mealCategory}! Experimente algo novo hoje! 👨‍🍳`;
    }
    
    // Se não conseguir receita, usa fato aleatório
    const response = await axios.get(FACTS_API_URL);
    const fact = response.data.text;
    
    return `💡 Curiosidade do Dia: ${fact}`;
  } catch (error) {
    console.error("Erro ao buscar dica diária:", error);
    return getRandomCookingTip();
  }
};

// --- Função apenas para fatos aleatórios ---
export const getRandomFact = async () => {
  try {
    const response = await axios.get(FACTS_API_URL);
    return response.data.text;
  } catch (error) {
    console.error("Erro ao buscar fato aleatório:", error);
    return "Não foi possível carregar o fato de hoje. Tente novamente mais tarde.";
  }
};

// --- Função para dicas culinárias pré-definidas (fallback) ---
const getRandomCookingTip = () => {
  const cookingTips = [
    "🧂 Dica do Chef: Sempre tempere a água do macarrão com sal grosso - isso faz toda a diferença no sabor final!",
    "🥩 Segredo Culinário: Deixe a carne descansar em temperatura ambiente por 30 minutos antes de cozinhar para um resultado mais uniforme.",
    "🍅 Truque da Vovó: Adicione uma pitada de açúcar ao molho de tomate para equilibrar a acidez natural.",
    "🥚 Dica Profissional: Use uma colher de sopa de vinagre branco na água para fazer ovos pochê perfeitos.",
    "🍞 Segredo do Padeiro: Água morna (não quente!) é ideal para ativar o fermento sem matá-lo.",
    "🧄 Truque Culinário: Para tirar o cheiro de alho das mãos, esfregue-as em uma colher de aço inoxidável.",
    "🥘 Dica Master: Refogue sempre a cebola até ficar transparente antes de adicionar outros ingredientes.",
    "🧊 Segredo dos Chefs: Gelo na frigideira quente testa a temperatura ideal para carnes e peixes.",
    "🌿 Dica Verde: Ervas frescas devem ser adicionadas no final do cozimento para preservar o sabor.",
    "🔥 Truque do Fogo: Cozinhe sempre com a panela tampada para economizar energia e cozinhar mais rápido!"
  ];
  
  const randomIndex = Math.floor(Math.random() * cookingTips.length);
  return cookingTips[randomIndex];
};

// --- Função para buscar receitas por ingrediente ---
export const getMealsByIngredient = async (ingredient) => {
  try {
    if (!ingredient || ingredient.trim() === '') return [];
    const response = await axios.get(`${MEAL_DB_BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
    return response.data.meals || [];
  } catch (error) {
    console.error("Erro ao buscar receitas por ingrediente:", error);
    return [];
  }
};

// --- Função para buscar múltiplas receitas aleatórias ---
export const getMultipleRandomMeals = async (count = 3) => {
  try {
    const promises = [];
    for (let i = 0; i < count; i++) {
      promises.push(getRandomMeal());
    }
    
    const results = await Promise.all(promises);
    return results.filter(meal => meal !== null);
  } catch (error) {
    console.error("Erro ao buscar receitas aleatórias:", error);
    return [];
  }
};

// --- Função utilitária para extrair ingredientes formatados ---
export const formatMealIngredients = (meal) => {
  if (!meal) return [];
  
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim()) {
      const formattedIngredient = measure && measure.trim() 
        ? `${measure.trim()} ${ingredient.trim()}`
        : ingredient.trim();
      ingredients.push(formattedIngredient);
    }
  }
  
  return ingredients;
};

// --- Função para verificar se a API está funcionando ---
export const checkAPIHealth = async () => {
  try {
    const startTime = Date.now();
    
    // Testa TheMealDB
    const mealResponse = await axios.get(`${MEAL_DB_BASE_URL}/random.php`);
    const mealDB = mealResponse.status === 200;
    
    // Testa Facts API
    const factsResponse = await axios.get(FACTS_API_URL);
    const factsAPI = factsResponse.status === 200;
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    return {
      mealDB,
      factsAPI,
      responseTime: `${responseTime}ms`,
      status: mealDB && factsAPI ? 'healthy' : 'partial',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("Erro ao verificar status das APIs:", error);
    return {
      mealDB: false,
      factsAPI: false,
      responseTime: 'timeout',
      status: 'down',
      timestamp: new Date().toISOString(),
      error: error.message
    };
  }
};

// Exportação default com todas as funções
const ExternalAPIService = {
  // TheMealDB
  getRandomMeal,
  searchMealsByName,
  getMealsByCategory,
  getMealsByArea,
  getMealsByIngredient,
  getMealById,
  getAllCategories,
  getAllAreas,
  getAllIngredients,
  getMultipleRandomMeals,
  
  // Dicas e fatos
  getDailyTip,
  getRandomFact,
  
  // Utilitários
  formatMealIngredients,
  checkAPIHealth
};

export default ExternalAPIService;