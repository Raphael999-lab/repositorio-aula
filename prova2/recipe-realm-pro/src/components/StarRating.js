import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StarRating = ({ rating, onRatingChange, size = 30 }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      {stars.map((star) => (
        <TouchableOpacity key={star} onPress={() => onRatingChange(star)}>
          <Icon
            name={star <= rating ? 'star' : 'star-outline'}
            size={size}
            color={star <= rating ? '#FFD700' : '#d3d3d3'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default StarRating;