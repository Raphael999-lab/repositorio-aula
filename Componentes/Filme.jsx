import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Filme = ({ nome, ano, diretor, tipo, capa }) => {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={styles.card}>
        <Image source={{ uri: capa }} style={styles.poster} />
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={1}>{nome}</Text>
          <Text style={styles.detail}>📅 {ano}</Text>
          <Text style={styles.detail}>🎬 {diretor}</Text>
          <Text style={styles.genre}>{tipo}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    backgroundColor: '#032541',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  poster: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  detail: {
    color: '#d2d2d2',
    fontSize: 12,
    marginBottom: 2,
  },
  genre: {
    color: '#01b4e4',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },
});

export default Filme;