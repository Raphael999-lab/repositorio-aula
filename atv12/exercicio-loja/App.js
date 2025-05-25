import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './screens/HomeScreen';
import ListaProdutosScreen from './screens/ListaProdutosScreen';
import ProdutoScreen from './screens/ProdutoScreen';

const Stack = createStackNavigator();


const theme = {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: '#264653',
    accent: '#2A9D8F',  
    background: '#F4F1DE', 
    surface: '#FFFFFF', 
    text: '#333333', 
    placeholder: '#A9A9A9', 
    error: '#E76F51', 
    secondaryAccent: '#E9C46A', 
    priceColor: '#2A9D8F', 
    discountColor: '#E76F51', 
    textOnPrimary: '#FFFFFF', 
  },
};

function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style={theme.colors.primary === '#264653' ? "light" : "dark"} backgroundColor={theme.colors.primary} />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: theme.colors.textOnPrimary,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Categorias de Produtos' }} //
          />
          <Stack.Screen
            name="ListaProdutos"
            component={ListaProdutosScreen}
            options={({ route }) => ({
              title: `Produtos: ${route.params.categoryName.charAt(0).toUpperCase() + route.params.categoryName.slice(1).replace(/-/g, ' ')}`,
            })}
          />
          <Stack.Screen
            name="DetalhesProduto"
            component={ProdutoScreen}
            options={{ title: 'Detalhes do Produto' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;