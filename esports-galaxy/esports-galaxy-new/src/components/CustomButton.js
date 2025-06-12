import React from 'react';
import { StyleSheet, Animated, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';

const CustomButton = ({ title, onPress, icon, mode = 'contained', style, disabled, loading }) => {
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={disabled || loading}
      >
        <View style={[
          styles.buttonContainer,
          { backgroundColor: disabled ? '#444444' : '#0099ff' }
        ]}>
          <Button
            mode={mode}
            onPress={onPress}
            icon={icon}
            labelStyle={styles.label}
            style={styles.button}
            disabled={disabled}
            loading={loading}
          >
            {title}
          </Button>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: 'transparent',
  },
  label: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CustomButton;