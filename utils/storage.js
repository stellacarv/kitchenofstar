import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITE_RECIPES_KEY = '@KitchenOfStar:favoriteRecipes';

export const saveFavoriteRecipe = async (recipe) => {
  try {
    const existingFavorites = await getFavoriteRecipes();
    const isAlreadyFavorite = existingFavorites.some(fav => fav.idMeal === recipe.idMeal);

    if (!isAlreadyFavorite) {
      const updatedFavorites = [...existingFavorites, recipe];
      await AsyncStorage.setItem(FAVORITE_RECIPES_KEY, JSON.stringify(updatedFavorites));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro ao salvar receita favorita:', error);
    return false;
  }
};

export const getFavoriteRecipes = async () => {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITE_RECIPES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Erro ao obter receitas favoritas:', error);
    return [];
  }
};

export const removeFavoriteRecipe = async (recipeId) => {
  try {
    const existingFavorites = await getFavoriteRecipes();
    const updatedFavorites = existingFavorites.filter(fav => fav.idMeal !== recipeId);
    await AsyncStorage.setItem(FAVORITE_RECIPES_KEY, JSON.stringify(updatedFavorites));
    return true;
  } catch (error) {
    console.error('Erro ao remover receita favorita:', error);
    return false;
  }
};