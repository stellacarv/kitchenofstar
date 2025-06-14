const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

export const searchRecipes = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}search.php?s=${query}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error('Erro ao buscar receitas na API:', error);
    throw error;
  }
};

export const getRecipeById = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}lookup.php?i=${id}`);
      const data = await response.json();
      return data.meals ? data.meals[0] : null; 
    } catch (error) {
      console.error('Erro ao buscar receita por ID na API:', error);
      throw error;
    }
  };