import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Surface } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';
import LoginForm from '../components/LoginForm';
import { theme } from '../styles/theme';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <FastImage
          source={require('../../assets/images/espaço-welcome.json')}
          style={styles.gif}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text variant="headlineLarge" style={styles.title}>SpaceEsportsHub</Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Entre na órbita dos esports!
        </Text>
        <LottieView
          source={require('../../assets/images/nebula-loading (2).json')}
          autoPlay
          loop
          style={styles.lottie}
        />
        <LoginForm navigation={navigation} />
        <Button
          mode="text"
          onPress={() => navigation.navigate('Home')}
          style={styles.skipButton}
          textColor={theme.colors.primary}
        >
          Pular Login
        </Button>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  surface: {
    padding: 20,
    borderRadius: 15,
    elevation: 8,
    alignItems: 'center',
    backgroundColor: theme.colors.card,
  },
  gif: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    color: theme.colors.primary,
    marginBottom: 10,
  },
  subtitle: {
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  lottie: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  skipButton: {
    marginTop: 10,
  },
});