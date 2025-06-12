import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Searchbar, FAB, IconButton, Menu, Divider, Avatar } from 'react-native-paper';
import { Card, Title, Paragraph, Chip } from 'react-native-paper';
import GlowCard from '../components/GlowCard';
import LoadingSpinner from '../components/LoadingSpinner';
import StarBackground from '../components/StarBackground';
import { storage } from '../services/storage';

const PlayersScreen = ({ navigation }) => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuVisible, setMenuVisible] = useState({});

  useEffect(() => {
    loadPlayers();
  }, []);

  useEffect(() => {
    filterPlayers();
  }, [searchQuery, players]);

  const loadPlayers = async () => {
    setLoading(true);
    const storedPlayers = await storage.getPlayers();
    setPlayers(storedPlayers);
    setLoading(false);
  };

  const filterPlayers = () => {
    const filtered = players.filter(
      (player) =>
        player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.team.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPlayers(filtered);
  };

  const handleDelete = async (playerId) => {
    Alert.alert(
      'Excluir Jogador',
      'Tem certeza que deseja excluir este jogador?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await storage.deletePlayer(playerId);
            loadPlayers();
          },
        },
      ]
    );
  };

  const renderPlayer = ({ item }) => (
    <GlowCard glowColor="#ff00ff">
      <Card.Title
        title={item.nickname}
        subtitle={item.name}
        left={(props) => (
          <Avatar.Text
            {...props}
            label={item.nickname.substring(0, 2).toUpperCase()}
            style={[styles.avatar, { backgroundColor: getAvatarColor(item.nickname) }]}
          />
        )}
        right={(props) => (
          <Menu
            visible={menuVisible[item.id] || false}
            onDismiss={() => setMenuVisible({ ...menuVisible, [item.id]: false })}
            anchor={
              <IconButton
                {...props}
                icon="dots-vertical"
                onPress={() => setMenuVisible({ ...menuVisible, [item.id]: true })}
              />
            }
          >
            <Menu.Item
              onPress={() => {
                setMenuVisible({ ...menuVisible, [item.id]: false });
                navigation.navigate('PlayerForm', { player: item });
              }}
              title="Editar"
              leadingIcon="pencil"
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                setMenuVisible({ ...menuVisible, [item.id]: false });
                handleDelete(item.id);
              }}
              title="Excluir"
              leadingIcon="delete"
            />
          </Menu>
        )}
        titleStyle={styles.cardTitle}
        subtitleStyle={styles.cardSubtitle}
      />
      <Card.Content>
        <View style={styles.infoContainer}>
          <Chip icon="account-group" style={styles.chip}>
            {item.team}
          </Chip>
          <Chip icon="gamepad-variant" style={styles.chip}>
            {item.game}
          </Chip>
        </View>
        <View style={styles.detailsContainer}>
          <Paragraph style={styles.detailText}>📧 {item.email}</Paragraph>
          <Paragraph style={styles.detailText}>📱 {item.phone}</Paragraph>
          <Paragraph style={styles.detailText}>🎂 {item.birthDate}</Paragraph>
          <Paragraph style={styles.detailText}>🏆 Ranking: {item.ranking || 'N/A'}</Paragraph>
        </View>
      </Card.Content>
    </GlowCard>
  );

  const getAvatarColor = (name) => {
    const colors = ['#ff00ff', '#00ffff', '#00ff00', '#ffff00', '#ff0066'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <StarBackground />
        <LoadingSpinner />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StarBackground />
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Buscar jogadores..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          iconColor="#00ffff"
          theme={{ colors: { primary: '#00ffff' } }}
        />
      </View>

      <FlatList
        data={filteredPlayers}
        renderItem={renderPlayer}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Title style={styles.emptyText}>Nenhum jogador cadastrado</Title>
            <Paragraph style={styles.emptySubtext}>
              Toque no + para adicionar seu primeiro jogador
            </Paragraph>
          </View>
        }
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('PlayerForm', { player: null })}
        color="#000033"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000033',
  },
  searchContainer: {
    padding: 16,
  },
  searchbar: {
    backgroundColor: '#001a4d',
    borderWidth: 1,
    borderColor: '#0066ff',
  },
  listContainer: {
    paddingBottom: 80,
  },
  avatar: {
    backgroundColor: '#ff00ff',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#99ccff',
    fontSize: 14,
  },
  infoContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  chip: {
    marginRight: 8,
    backgroundColor: '#0066ff',
  },
  detailsContainer: {
    marginTop: 10,
  },
  detailText: {
    color: '#99ccff',
    marginBottom: 5,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: '#ffffff',
    fontSize: 20,
  },
  emptySubtext: {
    color: '#99ccff',
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#00ffff',
  },
});

export default PlayersScreen;