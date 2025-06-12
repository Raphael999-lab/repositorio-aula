import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Appbar, Text, Card } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';
import LottieView from 'lottie-react-native';
import { fetchMatches } from '../services/api';
import { theme } from '../styles/theme';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function DashboardScreen() {
  const [matchCount, setMatchCount] = useState(0);
  const [gameStats, setGameStats] = useState([]);

  useEffect(() => {
    const loadStats = async () => {
      const matches = await fetchMatches();
      setMatchCount(matches.length);

      const stats = matches.reduce((acc, match) => {
        acc[match.game] = (acc[match.game] || 0) + 1;
        return acc;
      }, {});
      setGameStats(
        Object.entries(stats).map(([game, count], index) => ({
          name: game,
          count,
          color: ['#40c4ff', '#d81b60', '#7c4dff', '#ffd740'][index % 4],
          legendFontColor: theme.colors.text,
          legendFontSize: 15,
        }))
      );
    };
    loadStats();
  }, []);

  return (
    <Animated.View entering={FadeIn.duration(500)} style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Dashboard" />
      </Appbar.Header>
      <Card style={styles.card}>
        <Card.Title title="Estatísticas de Partidas" />
        <Card.Content>
          <Text style={styles.text}>Total de Partidas: {matchCount}</Text>
          <LottieView
            source={require('../../assets/images/nebula-loading (2).json')}
            autoPlay
            loop
            style={styles.lottie}
          />
          {gameStats.length > 0 && (
            <PieChart
              data={gameStats}
              width={Dimensions.get('window').width - 40}
              height={220}
              chartConfig={{
                color: () => theme.colors.primary,
                labelColor: () => theme.colors.text,
              }}
              accessor="count"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          )}
        </Card.Content>
      </Card>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  appbar: {
    backgroundColor: theme.colors.background,
  },
  card: {
    margin: 10,
    backgroundColor: theme.colors.card,
  },
  text: {
    color: theme.colors.text,
    marginBottom: 10,
  },
  lottie: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
});