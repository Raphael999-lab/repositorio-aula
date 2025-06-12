import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../utils/theme';

export default function GradientBackground({ children, colors }) {
  return (
    <LinearGradient
      colors={colors || COLORS.gradient.background}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});