import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import FavoriteButton from './FavoriteButton';
import Animated, { FadeIn } from 'react-native-reanimated';
import { theme } from '../styles/theme';

export default function MatchCard({ match }) {
  return (
    <Animated.View entering={FadeIn.duration(500)}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.title}>
            {match.team1} vs {match.team2}
          </Text>
          <Text style={styles.text}>Jogo: {match.game}</Text>
          <Text style={styles.text}>Data: {match.date}</Text>
          <Chip style={styles.chip} textStyle={{ color: theme.colors.text }}>
            {match.status}
          </Chip>
          <FavoriteButton matchId={match.id} />
        </Card.Content>
      </Card>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: theme.colors.card,
  },
  title: {
    color: theme.colors.primary,
  },
  text: {
    color: theme.colors.text,
  },
  chip: {
    marginTop: 10,
    backgroundColor: theme.colors.card,
  },
});