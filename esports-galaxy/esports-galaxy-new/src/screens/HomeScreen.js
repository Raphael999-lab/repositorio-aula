import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, RefreshControl } from 'react-native';
import { Title, Paragraph, Card, Avatar, Chip } from 'react-native-paper';
import { VictoryChart, VictoryBar, VictoryTheme, VictoryAxis } from 'victory-native';
import StarBackground from '../components/StarBackground';
import GlowCard from '../components/GlowCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { mockAPI } from '../services/api';
import * as Notifications from 'expo-notifications';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tournaments, setTournaments] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    loadData();
    scheduleNotification();
  }, []);

  const loadData = async () => {
    setLoading(true);
    // Simular carregamento de dados
    setTimeout(() => {
      setTournaments(mockAPI.tournaments);
      setChartData([
        { game: 'LoL', count: 12 },
        { game: 'Valorant', count: 8 },
        { game: 'CS:GO', count: 6 },
        { game: 'Dota 2', count: 4 },
      ]);
      setLoading(false);
      setRefreshing(false);
    }, 1500);
  };

  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🚀 Novo Torneio Disponível!",
        body: 'Confira os novos torneios espaciais na galáxia eSports!',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 10 },
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
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
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#00ffff']}
            tintColor="#00ffff"
          />
        }
      >
        <View style={styles.header}>
          <Title style={styles.title}>🚀 eSports Galaxy</Title>
          <Paragraph style={styles.subtitle}>
            Explore o universo dos torneios espaciais
          </Paragraph>
        </View>

        <GlowCard style={styles.statsCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>📊 Estatísticas Galácticas</Title>
            <View style={styles.chartContainer}>
              <VictoryChart
                theme={VictoryTheme.material}
                width={width - 60}
                height={200}
                domainPadding={20}
              >
                <VictoryAxis
                  style={{
                    axis: { stroke: '#00ffff' },
                    tickLabels: { fill: '#ffffff', fontSize: 12 },
                  }}
                />
                <VictoryAxis
                  dependentAxis
                  style={{
                    axis: { stroke: '#00ffff' },
                    tickLabels: { fill: '#ffffff', fontSize: 12 },
                    grid: { stroke: '#0066ff33' },
                  }}
                />
                <VictoryBar
                  data={chartData}
                  x="game"
                  y="count"
                  style={{
                    data: { fill: '#00ffff' },
                  }}
                />
              </VictoryChart>
            </View>
          </Card.Content>
        </GlowCard>

        <Title style={styles.sectionTitle}>🏆 Torneios em Destaque</Title>
        
        {tournaments.map((tournament) => (
          <GlowCard
            key={tournament.id}
            onPress={() => navigation.navigate('Tournaments', {
              screen: 'TournamentDetail',
              params: { tournament },
            })}
          >
            <Card.Title
              title={tournament.name}
              subtitle={tournament.game}
              left={(props) => <Avatar.Icon {...props} icon="trophy" />}
              titleStyle={styles.cardText}
              subtitleStyle={styles.cardSubtext}
            />
            <Card.Content>
              <View style={styles.chipContainer}>
                <Chip icon="calendar" style={styles.chip}>
                  {tournament.startDate}
                </Chip>
                <Chip icon="cash" style={styles.chip}>
                  {tournament.prizePool}
                </Chip>
              </View>
              <Paragraph style={styles.statusText}>
                Status: {tournament.status === 'upcoming' ? '🟡 Em breve' : '🟢 Em andamento'}
              </Paragraph>
            </Card.Content>
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
  header: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    color: '#00ffff',
    fontWeight: 'bold',
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    color: '#99ccff',
    fontSize: 16,
    marginTop: 5,
  },
  sectionTitle: {
    color: '#00ffff',
    fontSize: 24,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  statsCard: {
    margin: 20,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 20,
    marginBottom: 10,
  },
  chartContainer: {
    alignItems: 'center',
  },
  cardText: {
    color: '#ffffff',
  },
  cardSubtext: {
    color: '#99ccff',
  },
  chipContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  chip: {
    marginRight: 10,
    backgroundColor: '#0066ff',
  },
  statusText: {
    color: '#ffffff',
    marginTop: 5,
  },
});

export default HomeScreen;