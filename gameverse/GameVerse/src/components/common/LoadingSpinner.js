import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SPACING, TYPOGRAPHY } from '../../utils/theme';

export default function LoadingSpinner({ message = 'Carregando...' }) {
  return (
    <LinearGradient colors={COLORS.gradient.background} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <LinearGradient colors={COLORS.gradient.primary} style={styles.iconGradient}>
            <Icon name="gamepad-variant" size={48} color={COLORS.text} />
          </LinearGradient>
        </View>
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={styles.spinner}
        />
        <Text style={styles.message}>{message}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: SPACING.lg,
  },
  iconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  spinner: {
    marginBottom: SPACING.md,
  },
  message: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body,
    textAlign: 'center',
  },
});