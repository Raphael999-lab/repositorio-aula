import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';

const AnimalCard = ({ animal }) => {
  const { colors, spacing } = useTheme();

  return (
    <Card style={[styles.card, { backgroundColor: colors.surface }]}>
      <Card.Content style={styles.content}>
        <Image
          source={{ uri: animal.imagem }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Text style={[styles.number, { color: colors.primary }]}>
            {animal.numero}
          </Text>
          <Text
            style={[styles.name, { color: colors.onSurface }]}
            variant="titleLarge"
          >
            {animal.nome}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 280,
    elevation: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  content: {
    padding: 0,
  },
  image: {
    width: '100%',
    height: 180,
  },
  textContainer: {
    padding: 16,
    alignItems: 'center',
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});

export default AnimalCard;