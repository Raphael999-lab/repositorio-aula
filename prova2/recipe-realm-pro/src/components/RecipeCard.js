import React from 'react';
import { Card, Text, Avatar, Chip } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const RecipeCard = ({ recipe, category, onPress }) => {
  const LeftContent = props => <Avatar.Icon {...props} icon="silverware-fork-knife" />

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Title 
        title={recipe.name} 
        subtitle={`Preparo: ${recipe.prepTime || 'N/A'}`} 
        left={LeftContent} 
        titleNumberOfLines={1}
      />
      <Card.Cover source={{ uri: recipe.imageUri || 'https://picsum.photos/700' }} />
      <Card.Content>
        <Text variant="bodyMedium" style={styles.description} numberOfLines={2}>{recipe.description}</Text>
        {category && (
            <View style={styles.chipContainer}>
                <Chip icon={category.icon} style={{backgroundColor: category.color}} textStyle={{color: '#fff'}}>
                    {category.name}
                </Chip>
            </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  description: {
    paddingTop: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    marginTop: 10,
  }
});

export default RecipeCard;