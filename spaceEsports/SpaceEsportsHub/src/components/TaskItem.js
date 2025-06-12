import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Button, IconButton } from 'react-native-paper';
import Animated, { FadeIn } from 'react-native-reanimated';
import { theme } from '../styles/theme';

export default function TaskItem({ task, onDelete, navigation }) {
  return (
    <Animated.View entering={FadeIn.duration(500)}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.title}>{task.title}</Text>
          <Text style={styles.text}>{task.description}</Text>
          <Text style={styles.text}>Data: {task.dueDate}</Text>
          <Text style={styles.text}>Prioridade: {task.priority}</Text>
          <Text style={styles.text}>Jogo: {task.game}</Text>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('AddTask', { task })}
            textColor={theme.colors.primary}
          >
            Editar
          </Button>
          <IconButton
            icon="delete"
            iconColor={theme.colors.accent}
            onPress={() => onDelete(task.id)}
          />
        </Card.Actions>
      </Card>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
  title: {
    color: theme.colors.primary,
  },
  text: {
    color: theme.colors.text,
  },
});