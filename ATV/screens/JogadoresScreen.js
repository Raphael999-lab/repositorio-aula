// screens/JogadoresScreen.js
import React from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { jogadores } from '../data/DadosDoTime';

export default function JogadoresScreen() {
  return (
    <FlatList
      data={jogadores}
      keyExtractor={(item) => item.numero.toString()}
      renderItem={({ item }) => (
        <Card style={styles.card} mode="elevated">
          <View style={styles.row}>
            <Image source={{ uri: item.imagem }} style={styles.image} />
            <View style={styles.info}>
              <Text variant="titleMedium" style={styles.nome}>{item.nome}</Text>
              <Text style={styles.numero}>Camisa {item.numero}</Text>
            </View>
          </View>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#d32f2f',
  },
  info: {
    flex: 1,
  },
  nome: {
    fontWeight: 'bold',
    color: '#212121',
  },
  numero: {
    color: '#757575',
  },
});
