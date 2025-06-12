import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Title, Paragraph, Card, Chip, List, Avatar, Divider } from 'react-native-paper';
import { VictoryPie, VictoryLabel } from 'victory-native';
import StarBackground from '../components/StarBackground';
import GlowCard from '../components/GlowCard';
import CustomButton from '../components/CustomButton';
import LoadingSpinner from '../components/LoadingSpinner';
import { storage } from '../services/storage';
import * as Location from 'expo-location';

const { width } = Dimensions.get('window');

const TournamentDetailScreen = ({ route, navigation }) => {
  const { tournament } = route.params;
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [location, setLocation] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    loadData();
    getLocation();
  }, []);

  const loadData = async () => {
    // Verificar se é favorito
    const favorites = await storage.getFavorites();
    setIsFavorite(!!favorites[`tournament_${tournament.id}`]);
    
    // Simular carregamento de partidas
    setMatches([
      {
        id: 1,
        team1: 'Cosmic Legends',
        team2: 'Star Raiders',
        date: '2024-12-05',
        time: '15:00',
        status: 'upcoming',
      },
      {
        id: 2,
        team1: 'Galaxy Warriors',
        team2: 'Nebula Knights',
        date: '2024-12-05',
        time: '18:00',
        status: 'upcoming',
      },
    ]);
    
    setLoading(false);
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const toggleFavorite = async () => {
    await storage.toggleFavorite(tournament, 'tournament');
    setIsFavorite(!isFavorite);
  };

  const pieData = [
    { x: 'Prêmio Principal', y: 50 },
    { x: '2º Lugar', y: 25 },
    { x: '3º Lugar', y: 15 },
    { x: 'Outros', y: 10 },
  ];

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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <GlowCard glowColor="#ff00ff">
          <Card.Cover
            source={{ uri: 'https://via.placeholder.com/400x200' }}
            style={styles.cover}
          />
          <Card.Content>
            <Title style={styles.title}>{tournament.name}</Title>
            <View style={styles.chipContainer}>
              <Chip icon="gamepad-variant" style={styles.chip}>
                {tournament.game}
              </Chip>
              <Chip icon="calendar" style={styles.chip}>
                {tournament.startDate}
              </Chip>
              <Chip
                icon={tournament.status === 'upcoming' ? 'clock' : 'play'}
                style={[styles.chip, styles.statusChip]}
              >
                {tournament.status === 'upcoming' ? 'Em breve' : 'Em andamento'}
              </Chip>
            </View>
          </Card.Content>
        </GlowCard>

        <GlowCard style={styles.infoCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>💰 Distribuição de Prêmios</Title>
            <Title style={styles.prizePool}>{tournament.prizePool}</Title>
            <View style={styles.chartContainer}>
              <VictoryPie
                data={pieData}
                width={width - 80}
                height={250}
                innerRadius={50}
                colorScale={['#00ffff', '#ff00ff', '#00ff00', '#ffff00']}
                labelComponent={
                  <VictoryLabel
                    style={{
                      fill: '#ffffff',
                      fontSize: 12,
                    }}
                  />
                }
              />
            </View>
          </Card.Content>
        </GlowCard>

        <Title style={styles.sectionTitle}>⚔️ Próximas Partidas</Title>
        {matches.map((match) => (
          <GlowCard key={match.id} glowColor="#00ff00">
            <List.Item
              title={`${match.team1} vs ${match.team2}`}
              description={`${match.date} às ${match.time}`}
              left={(props) => <Avatar.Icon {...props} icon="sword-cross" style={styles.matchIcon} />}
              titleStyle={styles.matchTitle}
              descriptionStyle={styles.matchDescription}
            />
          </GlowCard>
        ))}

        <View style={styles.infoSection}>
          <Title style={styles.sectionTitle}>📍 Informações do Torneio</Title>
          <GlowCard>
            <Card.Content>
              <Paragraph style={styles.infoText}>
                <Paragraph style={styles.infoLabel}>Participantes:</Paragraph> {tournament.participants} times
              </Paragraph>
              <Paragraph style={styles.infoText}>
                <Paragraph style={styles.infoLabel}>Formato:</Paragraph> Eliminação dupla
              </Paragraph>
              <Paragraph style={styles.infoText}>
                <Paragraph style={styles.infoLabel}>Plataforma:</Paragraph> PC
              </Paragraph>
              <Paragraph style={styles.infoText}>
                <Paragraph style={styles.infoLabel}>Região:</Paragraph> Global
              </Paragraph>
              {location && (
                <Paragraph style={styles.infoText}>
                  <Paragraph style={styles.infoLabel}>Sua localização:</Paragraph> Lat: {location.coords.latitude.toFixed(2)}, Lon: {location.coords.longitude.toFixed(2)}
                </Paragraph>
              )}
            </Card.Content>
          </GlowCard>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title={isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
            icon={isFavorite ? 'star' : 'star-outline'}
            onPress={toggleFavorite}
            style={styles.button}
          />
          <CustomButton
            title="Inscrever-se"
            icon="rocket"
            onPress={() => alert('Inscrição realizada!')}
            style={styles.button}
          />
        </View>
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
    paddingBottom: 20,
  },
  cover: {
    height: 200,
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    marginTop: 16,
    textAlign: 'center',
  },
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  chip: {
    margin: 4,
    backgroundColor: '#0066ff',
  },
  statusChip: {
    backgroundColor: '#00ff00',
  },
  infoCard: {
    marginTop: 20,
  },
  sectionTitle: {
    color: '#00ffff',
    fontSize: 20,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  prizePool: {
    color: '#00ff00',
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  chartContainer: {
    alignItems: 'center',
  },
  matchIcon: {
    backgroundColor: '#00ff00',
  },
  matchTitle: {
    color: '#ffffff',
    fontSize: 16,
  },
  matchDescription: {
    color: '#99ccff',
  },
  infoSection: {
    marginTop: 20,
  },
  infoText: {
    color: '#99ccff',
    marginBottom: 8,
    fontSize: 16,
  },
  infoLabel: {
    color: '#00ffff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 30,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default TournamentDetailScreen;