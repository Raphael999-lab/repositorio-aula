import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Chip, Text } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInputMask } from 'react-native-masked-text';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { theme } from '../styles/theme';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Título é obrigatório'),
  description: Yup.string().required('Descrição é obrigatória'),
  dueDate: Yup.string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Formato de data inválido (DD/MM/AAAA)')
    .required('Data de vencimento é obrigatória'),
  priority: Yup.string().required('Prioridade é obrigatória'),
  game: Yup.string().required('Jogo é obrigatório'),
});

export default function TaskForm({ initialValues, onSubmit }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
        <View style={styles.container}>
          <Animated.View entering={FadeInDown.duration(500)}>
            <TextInput
              label="Título"
              value={values.title}
              onChangeText={handleChange('title')}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { text: theme.colors.text, primary: theme.colors.primary } }}
            />
            {errors.title && <Text style={styles.error}>{errors.title}</Text>}
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(500).delay(100)}>
            <TextInput
              label="Descrição"
              value={values.description}
              onChangeText={handleChange('description')}
              mode="outlined"
              multiline
              style={styles.input}
              theme={{ colors: { text: theme.colors.text, primary: theme.colors.primary } }}
            />
            {errors.description && <Text style={styles.error}>{errors.description}</Text>}
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(500).delay(200)}>
            <TextInput
              label="Data de Vencimento (DD/MM/AAAA)"
              value={values.dueDate}
              render={(props) => (
                <TextInputMask
                  {...props}
                  type={'datetime'}
                  options={{ format: 'DD/MM/YYYY' }}
                  onChangeText={(text) => setFieldValue('dueDate', text)}
                />
              )}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { text: theme.colors.text, primary: theme.colors.primary } }}
            />
            {errors.dueDate && <Text style={styles.error}>{errors.dueDate}</Text>}
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(500).delay(300)}>
            <Text style={styles.label}>Prioridade</Text>
            <View style={styles.chipContainer}>
              {['Baixa', 'Média', 'Alta'].map((p) => (
                <Chip
                  key={p}
                  selected={values.priority === p}
                  onPress={() => setFieldValue('priority', p)}
                  style={[styles.chip, values.priority === p && styles.selectedChip]}
                  textStyle={{ color: theme.colors.text }}
                >
                  {p}
                </Chip>
              ))}
            </View>
            {errors.priority && <Text style={styles.error}>{errors.priority}</Text>}
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(500).delay(400)}>
            <Text style={styles.label}>Jogo</Text>
            <View style={styles.chipContainer}>
              {['CS:GO', 'LoL', 'Valorant', 'Dota 2'].map((g) => (
                <Chip
                  key={g}
                  selected={values.game === g}
                  onPress={() => setFieldValue('game', g)}
                  style={[styles.chip, values.game === g && styles.selectedChip]}
                  textStyle={{ color: theme.colors.text }}
                >
                  {g}
                </Chip>
              ))}
            </View>
            {errors.game && <Text style={styles.error}>{errors.game}</Text>}
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(500).delay(500)}>
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
              buttonColor={theme.colors.primary}
            >
              Salvar Tarefa
            </Button>
          </Animated.View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  input: {
    marginBottom: 10,
    backgroundColor: theme.colors.card,
  },
  error: {
    color: theme.colors.accent,
    marginBottom: 10,
  },
  label: {
    color: theme.colors.text,
    marginVertical: 10,
    fontSize: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  chip: {
    margin: 4,
    backgroundColor: theme.colors.card,
  },
  selectedChip: {
    backgroundColor: theme.colors.highlight,
  },
  button: {
    marginTop: 20,
  },
});