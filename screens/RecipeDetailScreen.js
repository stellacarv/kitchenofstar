import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, Alert, Linking } from 'react-native';
import { saveFavoriteRecipe, getFavoriteRecipes, removeFavoriteRecipe } from '../utils/storage';

const RecipeDetailScreen = ({ route }) => {
  const { recipe } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkIfFavorite();
  }, []);

  const checkIfFavorite = async () => {
    const favorites = await getFavoriteRecipes();
    const found = favorites.some(fav => fav.idMeal === recipe.idMeal);
    setIsFavorite(found);
  };

  const handleToggleFavorite = async () => {
    if (isFavorite) {
      await removeFavoriteRecipe(recipe.idMeal);
      Alert.alert('Removido', `${recipe.strMeal} removido dos favoritos.`);
    } else {
      await saveFavoriteRecipe(recipe);
      Alert.alert('Adicionado', `${recipe.strMeal} adicionado aos favoritos!`);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.strMeal}</Text>
        <Text style={styles.category}>Categoria: {recipe.strCategory}</Text>
        <Text style={styles.area}>Origem: {recipe.strArea}</Text>

        <View style={styles.buttonContainer}>
            <Button
                title={isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
                onPress={handleToggleFavorite}
                color={isFavorite ? "#dc3545" : "#28a745"}
            />
        </View>


        <Text style={styles.heading}>Instruções:</Text>
        <Text style={styles.instructions}>{recipe.strInstructions}</Text>

        {recipe.strYoutube && (
          <View style={styles.videoContainer}>
            <Text style={styles.heading}>Link do YouTube:</Text>
            <Text style={styles.youtubeLink} onPress={() => Linking.openURL(recipe.strYoutube)}>
              {recipe.strYoutube}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  area: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  buttonContainer: {
    marginVertical: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  videoContainer: {
    marginTop: 20,
  },
  youtubeLink: {
    color: '#007bff',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});

export default RecipeDetailScreen;