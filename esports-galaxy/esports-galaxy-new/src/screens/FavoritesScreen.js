import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Title, Paragraph, Card, Chip, Avatar, FAB } from 'react-native-paper';
import StarBackground from '../components/StarBackground';
import GlowCard from '../components/GlowCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { storage } from '../services/storage';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadFavorites();
    });
    return unsubscribe;
  }, [navigation]);

  const loadFavorites = async () => {
    setLoading(true);
    const favs = await storage.getFavorites();
    const favoritesList = Object.values(favs);
    setFavorites(favoritesList);
    setLoading(false);
  };

  const removeFavorite = async (item) => {
    await storage.toggleFavorite(item, item.type);
    loadFavorites();
  };

  const getIcon = (type) => {
    switch (type) {
      case 'tournament':
        return 'trophy';
      case 'team':
        return 'account-group';
      case 'player':
        return 'account-star';
      default:
        return 'star';
    }
  };

  const getGlowColor = (type) => {
    switch (type) {
      case 'tournament':
        return '#ff00ff';
      case 'team':
        return '#00ff00';
      case 'player':
        return '#00ffff';
      default:
        return '#ffff00';
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <StarBackground />
        <LoadingSpinner />
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <StarBackground />
        <View style={styles.emptyContainer}>
          <Title style={styles.emptyTitle}>⭐ Nenhum favorito ainda</Title>
          <Paragraph style={styles.emptyText}>
            Adicione torneios, times e jogadores aos seus favoritos para acessá-los rapidamente aqui!
          </Paragraph>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StarBackground />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title style={styles.title}>⭐ Meus Favoritos</Title>
        
        {favorites.map((item, index) => (
          <GlowCard key={index} glowColor={getGlowColor(item.type)}>
            <Card.Title
              title={item.name || item.nickname}
              subtitle={item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon={getIcon(item.type)}
                  style={[styles.avatar, { backgroundColor: getGlowColor(item.type) }]}
                />
              )}
              titleStyle={styles.cardTitle}
              subtitleStyle={styles.cardSubtitle}
            />
            <Card.Content>
              <View style={styles.chipContainer}>
                <Chip icon="calendar" style={styles.chip}>
                  Adicionado em {new Date(item.favoritedAt).toLocaleDateString('pt-BR')}
                </Chip>
              </View>
            </Card.Content>
            <Card.Actions>
              <FAB
                icon="delete"
                small
                style={styles.deleteFab}
                onPress={() => removeFavorite(item)}
              />
            </Card.Actions>
          </GlowCard>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000033',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    color: '#00ffff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#99ccff',
    textAlign: 'center',
  },
  avatar: {
    backgroundColor: '#00ffff',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 18,
  },
  cardSubtitle: {
    color: '#99ccff',
  },
  chipContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  chip: {
    backgroundColor: '#0066ff',
  },
  deleteFab: {
    backgroundColor: '#ff0066',
  },
});

export default FavoritesScreen;