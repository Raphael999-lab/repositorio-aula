import React, { useState, useEffect } from 'react';
import { IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../styles/theme';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function FavoriteButton({ matchId }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadFavorite = async () => {
      const favorites = await AsyncStorage.getItem('favorites');
      const favoriteList = favorites ? JSON.parse(favorites) : [];
      setIsFavorite(favoriteList.includes(matchId));
    };
    loadFavorite();
  }, [matchId]);

  const toggleFavorite = async () => {
    const favorites = await AsyncStorage.getItem('favorites');
    let favoriteList = favorites ? JSON.parse(favorites) : [];
    if (isFavorite) {
      favoriteList = favoriteList.filter((id) => id !== matchId);
    } else {
      favoriteList.push(matchId);
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(favoriteList));
    setIsFavorite(!isFavorite);
  };

  return (
    <Animated.View entering={FadeIn.duration(500)}>
      <IconButton
        icon={isFavorite ? 'heart' : 'heart-outline'}
        iconColor={isFavorite ? theme.colors.accent : theme.colors.text}
        onPress={toggleFavorite}
      />
    </Animated.View>
  );
}