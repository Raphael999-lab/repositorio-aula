import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { COLORS, SPACING } from '../../utils/theme';

export default function CustomInput({ style, ...props }) {
  return (
    <TextInput
      mode="outlined"
      theme={{
        colors: {
          primary: COLORS.primary,
          accent: COLORS.accent,
          background: 'rgba(22, 33, 62, 0.5)',
          surface: COLORS.surface,
          text: COLORS.text,
          onSurface: COLORS.text,
          placeholder: COLORS.textSecondary,
          outline: COLORS.primary,
        },
      }}
      style={[styles.input, style]}
      textColor={COLORS.text}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: SPACING.md,
    backgroundColor: 'rgba(22, 33, 62, 0.5)',
  },
});