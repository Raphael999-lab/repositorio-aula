import React from 'react';
import { View, StyleSheet } from 'react-native';
import TaskForm from '../components/TaskForm';
import { saveTask } from '../services/storage';
import { scheduleNotificationAsync } from '../services/notifications';
import { theme } from '../styles/theme';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function AddTaskScreen({ navigation, route }) {
  const task = route.params?.task || null;

  const initialValues = task || {
    id: Math.random().toString(),
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    game: '',
  };

  const handleSubmit = async (values) => {
    await saveTask(values);
    await scheduleNotificationAsync({
      content: {
        title: 'Tarefa Adicionada',
        body: `Tarefa "${values.title}" para ${values.game} foi adicionada!`,
      },
      trigger: { seconds: 5 },
    });
    navigation.goBack();
  };

  return (
    <Animated.View entering={FadeIn.duration(500)} style={styles.container}>
      <TaskForm initialValues={initialValues} onSubmit={handleSubmit} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});