import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (username, password) => {
  try {
    // Simulação de autenticação (substitua por lógica real se necessário)
    const storedUser = await AsyncStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : { username: 'admin', password: '123456' };
    if (!storedUser) {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    }
    return username === user.username && password === user.password;
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return false;
  }
};