import AsyncStorage from '@react-native-async-storage/async-storage';

export const getTasks = async () => {
  try {
    const tasks = await AsyncStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error('Erro no armazenamento:', error);
    return [];
  }
};

export const saveTask = async (task) => {
  try {
    const tasks = await getTasks();
    const index = tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
    } else {
      tasks.push(task);
    }
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Erro no armazenamento:', error);
  }
};

export const deleteTask = async (id) => {
  try {
    const tasks = await getTasks();
    const updatedTasks = tasks.filter((task) => task.id !== id);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  } catch (error) {
    console.error('Erro no armazenamento:', error);
  }
};