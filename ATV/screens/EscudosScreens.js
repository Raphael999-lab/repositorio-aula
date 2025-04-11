// screens/EscudoScreen.js
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { time } from '../data/DadosDoTime';

export default function EscudoScreen() {
  return (
    <View style={styles.container}>
      <Card style={styles.card} mode="elevated">
        <Card.Content style={styles.content}>
          <Text variant="headlineLarge" style={styles.title}>
            {time.nome}
          </Text>
          <Image source={{ uri: time.escudo }} style={styles.image} />
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9', padding: 16,
  },
  card: {
    borderRadius: 20,
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#fff',
    elevation: 6,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  title: {
    marginBottom: 24,
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  image: {
    width: 180, height: 180, borderRadius: 90, borderWidth: 2, borderColor: '#d32f2f',
  },
});
