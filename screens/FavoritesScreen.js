import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getFavoriteRecipes, removeFavoriteRecipe } from '../utils/storage';
import RecipeCard from '../components/RecipeCard';

const FavoritesScreen = ({ navigation }) => { // Ajustado o nome do componente
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const storedFavorites = await getFavoriteRecipes();
      setFavoriteRecipes(storedFavorites);
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao carregar suas receitas favoritas.');
    } finally {
      setLoading(false);
    }
  };

  const handleRecipePress = (recipe) => {
    navigation.navigate('RecipeDetail', { recipe });
  };

  const handleRemoveFavorite = async (recipeId) => {
    Alert.alert(
      "Remover Favorito",
      "Tem certeza que deseja remover esta receita dos seus favoritos?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Remover",
          onPress: async () => {
            const success = await removeFavoriteRecipe(recipeId);
            if (success) {
              Alert.alert('Sucesso', 'Receita removida dos favoritos.');
              loadFavorites(); // Recarrega a lista após a remoção
            } else {
              Alert.alert('Erro', 'Não foi possível remover a receita dos favoritos.');
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando favoritos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {favoriteRecipes.length === 0 ? (
        <Text style={styles.emptyMessage}>Você ainda não tem nenhuma receita favorita. Adicione algumas!</Text>
      ) : (
        <FlatList
          data={favoriteRecipes}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleRecipePress(item)}
              onLongPress={() => handleRemoveFavorite(item.idMeal)}
              style={styles.favoriteItemContainer}
            >
              <RecipeCard recipe={item} onPress={() => handleRecipePress(item)} />
              <Text style={styles.longPressHint}>Segure para remover</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
    color: '#888',
  },
  listContent: {
    paddingBottom: 20,
  },
  favoriteItemContainer: {
    marginBottom: 10,
  },
  longPressHint: {
    textAlign: 'right',
    fontSize: 12,
    color: '#666',
    marginTop: -8,
    marginRight: 16,
  }
});

export default FavoritesScreen;