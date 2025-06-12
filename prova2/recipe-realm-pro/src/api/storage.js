import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

// Chaves para armazenamento local
const RECIPES_KEY = '@RecipeRealm:recipes';
const CATEGORIES_KEY = '@RecipeRealm:categories';
const REVIEWS_KEY = '@RecipeRealm:reviews';
const FAVORITES_KEY = '@RecipeRealm:favorites';

// API URLs
const MEAL_DB_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// --- Funções da API TheMealDB ---
export const getMealDBCategories = async () => {
  try {
    const response = await axios.get(`${MEAL_DB_BASE_URL}/categories.php`);
    return response.data.categories || [];
  } catch (error) {
    console.error('Erro ao buscar categorias da API:', error);
    return [];
  }
};

export const getMealsByCategory = async (category) => {
  try {
    const response = await axios.get(`${MEAL_DB_BASE_URL}/filter.php?c=${category}`);
    return response.data.meals || [];
  } catch (error) {
    console.error('Erro ao buscar receitas por categoria:', error);
    return [];
  }
};

export const getMealById = async (id) => {
  try {
    const response = await axios.get(`${MEAL_DB_BASE_URL}/lookup.php?i=${id}`);
    return response.data.meals ? response.data.meals[0] : null;
  } catch (error) {
    console.error('Erro ao buscar receita por ID:', error);
    return null;
  }
};

export const searchMeals = async (query) => {
  try {
    const response = await axios.get(`${MEAL_DB_BASE_URL}/search.php?s=${query}`);
    return response.data.meals || [];
  } catch (error) {
    console.error('Erro ao pesquisar receitas:', error);
    return [];
  }
};

export const getRandomMeal = async () => {
  try {
    const response = await axios.get(`${MEAL_DB_BASE_URL}/random.php`);
    return response.data.meals ? response.data.meals[0] : null;
  } catch (error) {
    console.error('Erro ao buscar receita aleatória:', error);
    return null;
  }
};

// Função para converter receita da API para formato local
const convertMealToLocalFormat = (meal) => {
  if (!meal) return null;
  
  // Extrai ingredientes e medidas
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure ? measure.trim() + ' ' : ''}${ingredient.trim()}`);
    }
  }

  return {
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    ingredients: ingredients.join(', '),
    image: meal.strMealThumb,
    video: meal.strYoutube,
    source: meal.strSource,
    tags: meal.strTags ? meal.strTags.split(',') : [],
    dateModified: meal.dateModified,
    isFromAPI: true
  };
};

// --- Funções Genéricas CRUD para Storage Local ---
const getItems = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error(`Falha ao buscar itens para a chave ${key}:`, e);
    return [];
  }
};

const saveItem = async (key, item) => {
  try {
    const items = await getItems(key);
    const now = new Date().toISOString();
    
    if (item.id) {
      // Atualiza item existente
      const index = items.findIndex(i => i.id === item.id);
      if (index !== -1) {
        items[index] = { ...item, updatedAt: now };
      } else {
        items.push({ ...item, createdAt: now, updatedAt: now });
      }
    } else {
      // Cria novo item com ID
      const newItem = {
        ...item,
        id: uuidv4(),
        createdAt: now,
        updatedAt: now
      };
      items.push(newItem);
      item = newItem;
    }
    
    await AsyncStorage.setItem(key, JSON.stringify(items));
    return item;
  } catch (e) {
    console.error(`Falha ao salvar item para a chave ${key}:`, e);
    throw e;
  }
};

const deleteItem = async (key, id) => {
  try {
    let items = await getItems(key);
    const initialLength = items.length;
    items = items.filter(item => item.id !== id);
    
    if (items.length === initialLength) {
      console.warn(`Item com ID ${id} não encontrado para exclusão.`);
      return false;
    }
    
    await AsyncStorage.setItem(key, JSON.stringify(items));
    return true;
  } catch (e) {
    console.error(`Falha ao deletar item para a chave ${key}:`, e);
    throw e;
  }
};

// --- Operações para Receitas (Local + API) ---
export const getRecipes = async () => {
  try {
    // Pega receitas locais
    const localRecipes = await getItems(RECIPES_KEY);
    
    // Opcionalmente, pode mesclar com algumas receitas da API
    // Para performance, vamos retornar apenas as locais por padrão
    return localRecipes.sort((a, b) => a.name.localeCompare(b.name));
  } catch (e) {
    console.error('Erro ao buscar receitas:', e);
    return [];
  }
};

export const getAllRecipes = async (includeAPI = false) => {
  try {
    const localRecipes = await getItems(RECIPES_KEY);
    
    if (!includeAPI) {
      return localRecipes.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    // Se incluir API, busca algumas receitas populares
    const apiRecipes = [];
    const categories = await getMealDBCategories();
    
    // Pega algumas receitas de cada categoria (limitado para performance)
    for (let i = 0; i < Math.min(3, categories.length); i++) {
      const meals = await getMealsByCategory(categories[i].strCategory);
      const convertedMeals = meals.slice(0, 2).map(convertMealToLocalFormat);
      apiRecipes.push(...convertedMeals);
    }
    
    const allRecipes = [...localRecipes, ...apiRecipes];
    return allRecipes.sort((a, b) => a.name.localeCompare(b.name));
  } catch (e) {
    console.error('Erro ao buscar todas as receitas:', e);
    return [];
  }
};

export const saveRecipe = async (recipe) => {
  try {
    if (!recipe.name) {
      throw new Error('Nome é obrigatório para a receita.');
    }
    
    // Adiciona campos padrão se não existirem
    const recipeToSave = {
      ...recipe,
      category: recipe.category || recipe.categoryId || 'Outros',
      difficulty: recipe.difficulty || 'Médio',
      prepTime: recipe.prepTime || 30,
      isFromAPI: false
    };
    
    return await saveItem(RECIPES_KEY, recipeToSave);
  } catch (e) {
    console.error('Erro ao salvar receita:', e);
    throw e;
  }
};

export const deleteRecipe = async (id) => {
  try {
    if (!id) {
      throw new Error('ID é obrigatório para deletar receita.');
    }
    return await deleteItem(RECIPES_KEY, id);
  } catch (e) {
    console.error('Erro ao deletar receita:', e);
    throw e;
  }
};

export const getRecipeById = async (id) => {
  try {
    if (!id) return null;
    
    // Primeiro tenta buscar localmente
    const localRecipes = await getItems(RECIPES_KEY);
    const localRecipe = localRecipes.find(r => r.id === id);
    
    if (localRecipe) {
      return localRecipe;
    }
    
    // Se não encontrar localmente, tenta na API
    const apiMeal = await getMealById(id);
    return convertMealToLocalFormat(apiMeal);
  } catch (e) {
    console.error('Erro ao buscar receita por ID:', e);
    return null;
  }
};

export const getRecipesByCategory = async (category) => {
  try {
    if (!category) return [];
    
    const localRecipes = await getItems(RECIPES_KEY);
    const filteredLocal = localRecipes.filter(r => 
      r.category === category || r.categoryId === category
    );
    
    return filteredLocal;
  } catch (e) {
    console.error('Erro ao buscar receitas por categoria:', e);
    return [];
  }
};

// --- Operações para Categorias ---
export const getCategories = async () => {
  try {
    const localCategories = await getItems(CATEGORIES_KEY);
    
    // Se não há categorias locais, inicializa com as da API
    if (localCategories.length === 0) {
      const apiCategories = await getMealDBCategories();
      
      const convertedCategories = apiCategories.slice(0, 10).map(cat => ({
        id: cat.idCategory,
        name: cat.strCategory,
        description: cat.strCategoryDescription,
        image: cat.strCategoryThumb,
        color: getRandomColor(),
        icon: getCategoryIcon(cat.strCategory),
        isFromAPI: true
      }));
      
      // Salva as categorias da API localmente
      for (const category of convertedCategories) {
        await saveItem(CATEGORIES_KEY, category);
      }
      
      return convertedCategories;
    }
    
    return localCategories.sort((a, b) => a.name.localeCompare(b.name));
  } catch (e) {
    console.error('Erro ao buscar categorias:', e);
    return [];
  }
};

export const saveCategory = async (category) => {
  try {
    if (!category.name) {
      throw new Error('Nome é obrigatório para a categoria.');
    }
    
    const categoryToSave = {
      ...category,
      color: category.color || getRandomColor(),
      icon: category.icon || 'food-fork-drink',
      isFromAPI: false
    };
    
    return await saveItem(CATEGORIES_KEY, categoryToSave);
  } catch (e) {
    console.error('Erro ao salvar categoria:', e);
    throw e;
  }
};

export const deleteCategory = async (id) => {
  try {
    if (!id) {
      throw new Error('ID é obrigatório para deletar categoria.');
    }
    
    // Verifica se existem receitas usando esta categoria
    const recipesInCategory = await getRecipesByCategory(id);
    if (recipesInCategory.length > 0) {
      throw new Error('Não é possível deletar categoria que possui receitas vinculadas.');
    }
    
    return await deleteItem(CATEGORIES_KEY, id);
  } catch (e) {
    console.error('Erro ao deletar categoria:', e);
    throw e;
  }
};

export const getCategoryById = async (id) => {
  try {
    if (!id) return null;
    const categories = await getCategories();
    return categories.find(c => c.id === id) || null;
  } catch (e) {
    console.error('Erro ao buscar categoria por ID:', e);
    return null;
  }
};

// --- Operações para Favoritos ---
export const getFavorites = async () => {
  try {
    return await getItems(FAVORITES_KEY);
  } catch (e) {
    console.error('Erro ao buscar favoritos:', e);
    return [];
  }
};

export const addToFavorites = async (recipeId) => {
  try {
    const favorites = await getFavorites();
    if (!favorites.find(f => f.recipeId === recipeId)) {
      const favorite = {
        recipeId,
        addedAt: new Date().toISOString()
      };
      return await saveItem(FAVORITES_KEY, favorite);
    }
    return false;
  } catch (e) {
    console.error('Erro ao adicionar aos favoritos:', e);
    throw e;
  }
};

export const removeFromFavorites = async (recipeId) => {
  try {
    const favorites = await getFavorites();
    const favorite = favorites.find(f => f.recipeId === recipeId);
    if (favorite) {
      return await deleteItem(FAVORITES_KEY, favorite.id);
    }
    return false;
  } catch (e) {
    console.error('Erro ao remover dos favoritos:', e);
    throw e;
  }
};

export const isFavorite = async (recipeId) => {
  try {
    const favorites = await getFavorites();
    return favorites.some(f => f.recipeId === recipeId);
  } catch (e) {
    console.error('Erro ao verificar favorito:', e);
    return false;
  }
};

// --- Operações para Avaliações ---
export const getReviews = async () => {
  try {
    return await getItems(REVIEWS_KEY);
  } catch (e) {
    console.error('Erro ao buscar avaliações:', e);
    return [];
  }
};

export const saveReview = async (review) => {
  try {
    if (!review.recipeId || !review.rating) {
      throw new Error('ID da receita e avaliação são obrigatórios.');
    }
    if (review.rating < 1 || review.rating > 5) {
      throw new Error('Avaliação deve estar entre 1 e 5.');
    }
    return await saveItem(REVIEWS_KEY, review);
  } catch (e) {
    console.error('Erro ao salvar avaliação:', e);
    throw e;
  }
};

export const deleteReview = async (id) => {
  try {
    if (!id) {
      throw new Error('ID é obrigatório para deletar avaliação.');
    }
    return await deleteItem(REVIEWS_KEY, id);
  } catch (e) {
    console.error('Erro ao deletar avaliação:', e);
    throw e;
  }
};

export const getReviewsForRecipe = async (recipeId) => {
  try {
    if (!recipeId) return [];
    const reviews = await getReviews();
    return reviews.filter(r => r.recipeId === recipeId);
  } catch (e) {
    console.error('Erro ao buscar avaliações da receita:', e);
    return [];
  }
};

export const getAverageRatingForRecipe = async (recipeId) => {
  try {
    const reviews = await getReviewsForRecipe(recipeId);
    if (reviews.length === 0) return 0;
    
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  } catch (e) {
    console.error('Erro ao calcular média de avaliações:', e);
    return 0;
  }
};

// --- Funções Utilitárias ---
const getRandomColor = () => {
  const colors = [
    '#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7',
    '#C7CEDB', '#DDA0DD', '#98FB98', '#F0E68C', '#DEB887'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getCategoryIcon = (categoryName) => {
  const iconMap = {
    'Beef': 'cow',
    'Chicken': 'food-drumstick',
    'Desert': 'cake-variant',
    'Lamb': 'sheep',
    'Miscellaneous': 'food-fork-drink',
    'Pasta': 'pasta',
    'Pork': 'pig',
    'Seafood': 'fish',
    'Side': 'food-apple',
    'Starter': 'food-variant',
    'Vegan': 'leaf',
    'Vegetarian': 'carrot',
    'Breakfast': 'coffee'
  };
  return iconMap[categoryName] || 'food-fork-drink';
};

// --- Função para limpar todos os dados ---
export const clearAllData = async () => {
  try {
    await AsyncStorage.multiRemove([RECIPES_KEY, CATEGORIES_KEY, REVIEWS_KEY, FAVORITES_KEY]);
    console.log('Todos os dados foram limpos com sucesso!');
    return true;
  } catch (e) {
    console.error('Erro ao limpar dados:', e);
    throw e;
  }
};

// --- Inicialização de dados ---
export const initializeSampleData = async () => {
  try {
    const existingRecipes = await getItems(RECIPES_KEY);
    const existingCategories = await getItems(CATEGORIES_KEY);
    
    if (existingRecipes.length > 0 || existingCategories.length > 0) {
      console.log('Dados já existem, pulando inicialização.');
      return;
    }

    console.log('Inicializando dados de exemplo...');
    
    // Inicializa categorias (que vai buscar da API)
    await getCategories();
    
    console.log('Dados iniciais criados com sucesso!');
    return true;
  } catch (e) {
    console.error('Falha ao criar dados iniciais:', e);
    throw e;
  }
};

// --- Função para dica diária usando receita aleatória ---
export const getDailyTip = async () => {
  try {
    const randomMeal = await getRandomMeal();
    if (randomMeal) {
      const convertedMeal = convertMealToLocalFormat(randomMeal);
      return `Dica de hoje: Que tal experimentar ${convertedMeal.name}? É uma deliciosa receita ${convertedMeal.area} da categoria ${convertedMeal.category}!`;
    }
    return "Experimente criar uma receita nova hoje! A culinária é uma arte que nos conecta com diferentes culturas.";
  } catch (error) {
    console.error("Erro ao buscar dica diária:", error);
    return "Não foi possível carregar a dica de hoje. Que tal explorar uma receita que você nunca tentou antes?";
  }
};

// Exportação default
const StorageService = {
  // Receitas
  getRecipes,
  getAllRecipes,
  saveRecipe,
  deleteRecipe,
  getRecipeById,
  getRecipesByCategory,
  
  // Categorias
  getCategories,
  saveCategory,
  deleteCategory,
  getCategoryById,
  
  // API TheMealDB
  getMealDBCategories,
  getMealsByCategory,
  getMealById,
  searchMeals,
  getRandomMeal,
  
  // Favoritos
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  
  // Avaliações
  getReviews,
  saveReview,
  deleteReview,
  getReviewsForRecipe,
  getAverageRatingForRecipe,
  
  // Utilitários
  getDailyTip,
  initializeSampleData,
  clearAllData
};

export default StorageService;