import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { login } from '../services/auth';
import { theme } from '../styles/theme';
import Animated, { FadeInDown } from 'react-native-reanimated';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Usuário é obrigatório'),
  password: Yup.string().required('Senha é obrigatória'),
});

export default function LoginForm({ navigation }) {
  const handleSubmit = async (values) => {
    const success = await login(values.username, values.password);
    if (success) {
      navigation.navigate('Home');
    } else {
      alert('Usuário ou senha incorretos');
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          <Animated.View entering={FadeInDown.duration(500)}>
            <TextInput
              label="Usuário"
              value={values.username}
              onChangeText={handleChange('username')}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { text: theme.colors.text, primary: theme.colors.primary } }}
            />
            {errors.username && <Text style={styles.error}>{errors.username}</Text>}
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(500).delay(100)}>
            <TextInput
              label="Senha"
              value={values.password}
              onChangeText={handleChange('password')}
              mode="outlined"
              secureTextEntry
              style={styles.input}
              theme={{ colors: { text: theme.colors.text, primary: theme.colors.primary } }}
            />
            {errors.password && <Text style={styles.error}>{errors.password}</Text>}
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(500).delay(200)}>
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
              buttonColor={theme.colors.primary}
            >
              Entrar
            </Button>
          </Animated.View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    marginBottom: 10,
    backgroundColor: theme.colors.card,
  },
  error: {
    color: theme.colors.accent,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});