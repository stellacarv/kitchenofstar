import React, { useState } from 'react'; 
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import { searchRecipes } from '../services/api'; 

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchText.trim()) {
      Alert.alert('Atenção', 'Por favor, digite o nome de uma receita para buscar.');
      return;
    }
    setLoading(true);
    try {
      const data = await searchRecipes(searchText);
      setRecipes(data || []);
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar as receitas. Tente novamente mais tarde.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipePress = (recipe) => {
    navigation.navigate('RecipeDetail', { recipe });
  };

  const renderItem = ({ item }) => (
    <RecipeCard recipe={item} onPress={handleRecipePress} />
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar receita (e.g., Arrabiata)"
        value={searchText}
        onChangeText={setSearchText}
      />
      <Button title="Buscar" onPress={handleSearch} />

      <TouchableOpacity
        style={styles.favoritesButton}
        onPress={() => navigation.navigate('Favorites')}
      >
        <Text style={styles.favoritesButtonText}>Ver Minhas Receitas Favoritas</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
      ) : recipes.length > 0 ? (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.idMeal}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noResults}>Nenhuma receita encontrada. Tente uma busca diferente.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  favoritesButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  favoritesButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loading: {
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default HomeScreen;