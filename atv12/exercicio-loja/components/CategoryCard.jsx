import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';

const CategoryCard = ({ category, onPress }) => {
  const theme = useTheme();
  const formattedCategory = (category ?? '').toString().replace(/-/g, ' ');

  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content style={styles.content}>
          <Text style={styles.title}>{formattedCategory}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
