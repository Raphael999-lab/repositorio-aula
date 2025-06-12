import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Appbar, FAB, Text } from 'react-native-paper';
import TaskItem from '../components/TaskItem';
import { getTasks, deleteTask } from '../services/storage';
import { theme } from '../styles/theme';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function TaskScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await getTasks();
      setTasks(storedTasks);
    };
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <Animated.View entering={FadeIn.duration(500)} style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Tarefas" />
      </Appbar.Header>
      {tasks.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma tarefa. Adicione uma!</Text>
      ) : (
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <TaskItem task={item} onDelete={handleDelete} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddTask')}
        color={theme.colors.text}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  appbar: {
    backgroundColor: theme.colors.background,
  },
  emptyText: {
    color: theme.colors.text,
    textAlign: 'center',
    marginTop: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
});