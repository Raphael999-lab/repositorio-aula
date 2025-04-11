// screens/TitulosScreen.js
import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { titulos } from '../data/DadosDoTime';

export default function TitulosScreen() {
  return (
    <FlatList
      data={titulos}
      keyExtractor={(item) => item.nome}
      renderItem={({ item }) => (
        <Card style={styles.card} mode="elevated">
          <Card.Content>
            <Text variant="titleMedium" style={styles.nome}>{item.nome}</Text>
            <Text style={styles.anos}>{item.anos.join(', ')}</Text>
          </Card.Content>
        </Card>
      )}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  card: {
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: '#fff',
    elevation: 4,
  },
  nome: {
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 8,
  },
  anos: {
    color: '#424242',
  },
});
