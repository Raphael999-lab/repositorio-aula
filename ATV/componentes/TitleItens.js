import React from 'react';
import { View , Text, StyleSheet } from 'react-native';
import { Card, useTheme } from 'react-native-paper';

/**
 * Componente para exibir item de título conquistado
 * @param {Object} props - Propriedades do componente
 * @param {string} props.nome - Nome do título
 * @param {number[]} props.anos - Anos de conquista
 */
const TitleItem = ({ nome, anos }) => {
  const { colors } = useTheme();

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={[styles.title, { color: colors.primary }]}>{nome}</Text>
        <Text style={styles.years}>
          Conquistado em: {anos.join(', ')}
        </Text>
        <Text style={styles.count}>
          Total: {anos.length} {anos.length > 1 ? 'vezes' : 'vez'}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  years: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  count: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
});

export default TitleItem;