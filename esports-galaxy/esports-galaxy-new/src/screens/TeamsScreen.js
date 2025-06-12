import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Searchbar, FAB, IconButton, Menu, Divider } from 'react-native-paper';
import { Card, Avatar, Title, Paragraph, Chip } from 'react-native-paper';
import GlowCard from '../components/GlowCard';
import LoadingSpinner from '../components/LoadingSpinner';
import StarBackground from '../components/StarBackground';
import { storage } from '../services/storage';
import { mockAPI } from '../services/api';

const TeamsScreen = ({ navigation }) => {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuVisible, setMenuVisible] = useState({});

  useEffect(() => {
    loadTeams();
  }, []);

  useEffect(() => {
    filterTeams();
  }, [searchQuery, teams]);

  const loadTeams = async () => {
    setLoading(true);
    const storedTeams = await storage.getTeams();
    const allTeams = [...mockAPI.teams, ...storedTeams];
    setTeams(allTeams);
    setLoading(false);
  };

  const filterTeams = () => {
    const filtered = teams.filter(
      (team) =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.country.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTeams(filtered);
  };

  const handleDelete = async (teamId) => {
    Alert.alert(
      'Excluir Time',
      'Tem certeza que deseja excluir este time?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await storage.deleteTeam(teamId);
            loadTeams();
          },
        },
      ]
    );
  };

  const renderTeam = ({ item }) => (
    <GlowCard glowColor="#00ff00">
      <Card.Title
        title={item.name}
        subtitle={`${item.country} • ${item.players} jogadores`}
        left={(props) => <Avatar.Icon {...props} icon="account-group" style={styles.avatar} />}
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
                navigation.navigate('TeamForm', { team: item });
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
        <Paragraph style={styles.foundedText}>Fundado em: {item.founded}</Paragraph>
        <View style={styles.gamesContainer}>
          {item.games.map((game, index) => (
            <Chip key={index} style={styles.gameChip} textStyle={styles.chipText}>
              {game}
            </Chip>
          ))}
        </View>
      </Card.Content>
    </GlowCard>
  );

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
          placeholder="Buscar times..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          iconColor="#00ffff"
          theme={{ colors: { primary: '#00ffff' } }}
        />
      </View>

      <FlatList
        data={filteredTeams}
        renderItem={renderTeam}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('TeamForm', { team: null })}
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
    backgroundColor: '#00ff00',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 18,
  },
  cardSubtitle: {
    color: '#99ccff',
  },
  foundedText: {
    color: '#99ccff',
    marginBottom: 10,
  },
  gamesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gameChip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#ff00ff',
  },
  chipText: {
    color: '#ffffff',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#00ffff',
  },
});

export default TeamsScreen;