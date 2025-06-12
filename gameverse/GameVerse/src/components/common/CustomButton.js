import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator } from 'react-native-paper';
import { COLORS, SPACING, TYPOGRAPHY } from '../../utils/theme';

export default function CustomButton({
  children,
  onPress,
  gradient,
  loading,
  disabled,
  style,
  textStyle,
  ...props
}) {
  const buttonColors = gradient || COLORS.gradient.primary;
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[styles.container, style]}
      {...props}
    >
      <LinearGradient
        colors={buttonColors}
        style={[styles.gradient, isDisabled && styles.disabled]}
      >
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.text} />
        ) : (
          <Text style={[styles.text, textStyle]}>{children}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  gradient: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body,
    fontWeight: 'bold',
  },
});