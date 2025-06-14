import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const RecipeCard = ({ recipe, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(recipe)} style={styles.card}>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{recipe.strMeal}</Text>
        <Text style={styles.category}>{recipe.strCategory}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 10,
    marginHorizontal: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  infoContainer: {
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    color: '#666',
  },
});

export default RecipeCard;