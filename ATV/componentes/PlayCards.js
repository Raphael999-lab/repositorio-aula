// components/PlayerCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card, useTheme } from 'react-native-paper';

const PlayerCard = ({ nome, numero, imagem, posicao }) => {
  const { colors } = useTheme();

  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <Image
          source={{ uri: imagem }}
          style={styles.image}
  
        />
        <View style={styles.infoContainer}>
          <Text style={[styles.name, { color: colors.primary }]}>{nome}</Text>
          <Text style={styles.detail}>Número: {numero}</Text>
          <Text style={styles.detail}>Posição: {posicao}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
    elevation: 4,
  },
  container: {
    flexDirection: 'row',
    padding: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detail: {
    fontSize: 14,
    color: '#666',
  },
});

export default PlayerCard;