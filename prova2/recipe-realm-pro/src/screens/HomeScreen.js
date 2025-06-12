import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { FAB, Searchbar, Text, Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [allData, setAllData] = useState({ recipes: [], categories: [] });
  const [dailyTip, setDailyTip] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setError(null);
      const [storedRecipes, storedCategories, tip] = await Promise.all([
        getRecipes(),
        getCategories(),
        getDailyTip()
      ]);
      
      setAllData({ recipes: storedRecipes, categories: storedCategories });
      setDailyTip(tip);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Memoized filtered recipes
  const filteredRecipes = useMemo(() => {
    return allData.recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allData.recipes]);

  // Memoized category finder
  const findCategoryForRecipe = useCallback((recipe) => {
    return allData.categories.find(c => c.id === recipe.categoryId);
  }, [allData.categories]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadData();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
  }, []);

  const renderHeader = useMemo(() => (
    <>
      <Searchbar
        placeholder="Buscar Receitas"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      <Card style={styles.tipCard}>
        <Card.Content>
          <Title>💡 Dica Culinária do Dia</Title>
          <Paragraph>{dailyTip || 'Carregando dica...'}</Paragraph>
        </Card.Content>
      </Card>
      <Title style={styles.listHeader}>Todas as Receitas</Title>
    </>
  ), [searchQuery, dailyTip]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        {renderHeader}
        <Text style={styles.error}>Erro ao carregar receitas: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {filteredRecipes.length > 0 ? (
        <FlatList
          data={filteredRecipes}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              category={findCategoryForRecipe(item)}
              onPress={() => navigation.navigate('RecipeDetail', { 
                recipeId: item.id 
              })}
            />
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh} 
            />
          }
        />
      ) : (
        <View style={styles.centered}>
          {renderHeader}
          <Text style={styles.emptyText}>
            {searchQuery 
              ? 'Nenhuma receita encontrada para sua busca' 
              : 'Nenhuma receita cadastrada ainda'}
          </Text>
        </View>
      )}
      
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddEditRecipe')}
        accessibilityLabel="Adicionar nova receita"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20
  },
  searchbar: { marginHorizontal: 16, marginTop: 16 },
  tipCard: { margin: 16 },
  listHeader: { marginHorizontal: 16, marginTop: 8 },
  fab: { 
    position: 'absolute', 
    margin: 16, 
    right: 0, 
    bottom: 0 
  },
  emptyText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#666'
  },
  error: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center'
  }
});