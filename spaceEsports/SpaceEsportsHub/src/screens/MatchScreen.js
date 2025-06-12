import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Appbar, Text, ProgressBar } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import MatchCard from '../components/MatchCard';
import { fetchMatches } from '../services/api';
import { theme } from '../styles/theme';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function MatchScreen() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const data = await fetchMatches();
        setMatches(data);
      } catch (error) {
        console.error('Erro ao carregar partidas:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMatches();

    // Simulação de atualizações em tempo real
    const interval = setInterval(() => {
      setMatches((prev) =>
        prev.map((match) => ({
          ...match,
          status: Math.random() > 0.7 ? 'Ao Vivo' : match.status,
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Animated.View entering={FadeIn.duration(500)} style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Partidas de Esports" />
      </Appbar.Header>
      <FastImage
        source={require('../../assets/images/espaço-welcome.json')}
        style={styles.gif}
        resizeMode={FastImage.resizeMode.contain}
      />
      {loading ? (
        <ProgressBar indeterminate color={theme.colors.primary} />
      ) : matches.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma partida disponível.</Text>
      ) : (
        <FlatList
          data={matches}
          renderItem={({ item }) => <MatchCard match={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
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
  gif: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  emptyText: {
    color: theme.colors.text,
    textAlign: 'center',
    marginTop: 20,
  },
});