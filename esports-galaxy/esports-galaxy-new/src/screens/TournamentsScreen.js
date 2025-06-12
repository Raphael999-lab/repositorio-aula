import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Searchbar, FAB, Chip, SegmentedButtons } from 'react-native-paper';
import GlowCard from '../components/GlowCard';
import LoadingSpinner from '../components/LoadingSpinner';
import StarBackground from '../components/StarBackground';
import { mockAPI } from '../services/api';
import { Card, Avatar, Title, Paragraph } from 'react-native-paper';

const TournamentsScreen = ({ navigation }) => {
  const [tournaments, setTournaments] = useState([]);
  const [filteredTournaments, setFilteredTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadTournaments();
  }, []);

  useEffect(() => {
    filterTournaments();
  }, [searchQuery, filterStatus, tournaments]);

  const loadTournaments = async () => {
    setLoading(true);
    setTimeout(() => {
      setTournaments(mockAPI.tournaments);
      setLoading(false);
    }, 1000);
  };

  const filterTournaments = () => {
    let filtered = tournaments;

    if (searchQuery) {
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.game.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter((t) => t.status === filterStatus);
    }

    setFilteredTournaments(filtered);
  };

  const renderTournament = ({ item }) => (
    <GlowCard
      onPress={() => navigation.navigate('TournamentDetail', { tournament: item })}
      glowColor="#ff00ff"
    >
      <Card.Title
        title={item.name}
        subtitle={item.game}
        left={(props) => <Avatar.Icon {...props} icon="trophy" style={styles.avatar} />}
        titleStyle={styles.cardTitle}
        subtitleStyle={styles.cardSubtitle}
      />
      <Card.Content>
        <View style={styles.infoRow}>
          <Chip icon="calendar" style={styles.chip}>
            {item.startDate}
          </Chip>
          <Chip icon="account-group" style={styles.chip}>
            {item.participants} times
          </Chip>
        </View>
        <View style={styles.prizeRow}>
          <Title style={styles.prizeText}>💰 {item.prizePool}</Title>
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
          placeholder="Buscar torneios..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          iconColor="#00ffff"
          theme={{ colors: { primary: '#00ffff' } }}
        />
      </View>

      <SegmentedButtons
        value={filterStatus}
        onValueChange={setFilterStatus}
        buttons={[
          { value: 'all', label: 'Todos' },
          { value: 'upcoming', label: 'Em breve' },
          { value: 'ongoing', label: 'Em andamento' },
        ]}
        style={styles.filterButtons}
        theme={{ colors: { primary: '#00ffff' } }}
      />

      <FlatList
        data={filteredTournaments}
        renderItem={renderTournament}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('TournamentDetail', { tournament: null })}
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
  filterButtons: {
    marginHorizontal: 16,
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 80,
  },
  avatar: {
    backgroundColor: '#ff00ff',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 18,
  },
  cardSubtitle: {
    color: '#99ccff',
  },
  infoRow: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  chip: {
    marginRight: 8,
    backgroundColor: '#0066ff',
  },
  prizeRow: {
    marginTop: 10,
    alignItems: 'center',
  },
  prizeText: {
    color: '#00ff00',
    fontSize: 20,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#00ffff',
  },
});

export default TournamentsScreen;