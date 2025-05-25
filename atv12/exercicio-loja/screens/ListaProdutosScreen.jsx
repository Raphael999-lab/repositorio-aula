import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, ActivityIndicator, Title, Paragraph, Avatar, useTheme, Chip } from 'react-native-paper';
import axios from 'axios';

const ListaProdutosScreen = ({ route, navigation }) => {
  const { categoryName } = route.params; 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryName) return;
      try {
        setLoading(true);
        const response = await axios.get(`https://dummyjson.com/products/category/${categoryName}`); //
        setProducts(response.data.products);
        setError(null);
      } catch (e) {
        console.error("Erro ao buscar produtos:", e);
        setError(`Falha ao carregar produtos da categoria "${categoryName}". Verifique sua conexão.`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  const handleProductPress = (productId) => {
    navigation.navigate('DetalhesProduto', { productId: productId }); //
  };

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator animating={true} size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.text }]}>Carregando produtos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>
      </View>
    );
  }

  const renderProductItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductPress(item.id)}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.cardLayout}>
            <Avatar.Image 
                size={80} 
                source={{ uri: item.thumbnail }} 
                style={styles.avatar}
            />
            <View style={styles.cardTextContent}>
                <Title style={[styles.productTitle, { color: theme.colors.text }]} numberOfLines={2}>{item.title}</Title>
                <Paragraph style={[styles.productPrice, { color: theme.colors.priceColor }]}>
                    R$ {item.price.toFixed(2).replace('.',',')}
                </Paragraph>
                {item.discountPercentage > 0 && (
                    <Chip 
                        icon="tag-heart" 
                        style={[styles.discountChip, {backgroundColor: theme.colors.secondaryAccent}]}
                        textStyle={[styles.discountText, {color: theme.colors.primary}]} //
                    >
                        {item.discountPercentage.toFixed(0)}% OFF
                    </Chip>
                )}
            </View>
        </View>
        <Card.Content>
            <Paragraph numberOfLines={2} style={[styles.productDescription, { color: theme.colors.text, opacity: 0.7 }]}>{item.description}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={[styles.emptyText, { color: theme.colors.text }]}>Nenhum produto encontrado nesta categoria.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  card: {
    marginVertical: 8,
    elevation: 2,
    borderRadius: 8, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardLayout: {
    flexDirection: 'row',
    padding: 12,
  },
  avatar: {
    marginRight: 12,
    borderRadius: 8,
  },
  cardTextContent: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  discountChip: {
    marginTop: 6,
    alignSelf: 'flex-start', 
    height: 28,
    alignItems: 'center',
  },
  discountText: {
      fontSize: 12,
      fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 13,
    marginTop: 0, 
    lineHeight: 18,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default ListaProdutosScreen;