import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Card } from 'react-native-paper';

const GlowCard = ({ children, style, onPress, glowColor = '#00ffff' }) => {
  const glowAnim = new Animated.Value(0.5);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.5,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={[styles.container, style]}>
      <Animated.View 
        style={[
          styles.glow, 
          { 
            opacity: glowAnim,
            shadowColor: glowColor,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 20,
            elevation: 10,
          }
        ]} 
      />
      <Card style={styles.card} onPress={onPress}>
        {children}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  glow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 15,
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: 'rgba(0, 26, 77, 0.9)',
    borderRadius: 15,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#0066ff',
  },
});

export default GlowCard;