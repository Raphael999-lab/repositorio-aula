import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Telas
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/TeladeCategorias';
import RecipeDetailScreen from '../screens/TelaDetalhesReceita';
import AddEditRecipeScreen from '../screens/TelaEditarReceita';
import AddEditCategoryScreen from '../screens/TelaEditarCategoria';
import AddReviewScreen from '../screens/TeladeRevisao';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const temaNavegacao = {
  headerStyle: { backgroundColor: '#6200ee' },
  headerTintColor: '#fff',
};

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      inactiveColor="#c7c7c7"
      barStyle={{ backgroundColor: '#6200ee' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Receitas',
          tabBarIcon: ({ color }) => (
            <Icon name="home-variant" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarLabel: 'Categorias',
          tabBarIcon: ({ color }) => (
            <Icon name="shape" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={temaNavegacao}>
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{ title: 'Detalhes da Receita' }}
      />
      <Stack.Screen
        name="AddEditRecipe"
        component={AddEditRecipeScreen}
        options={({ route }) => ({
          title: route.params?.recipeId ? 'Editar Receita' : 'Nova Receita',
        })}
      />
      <Stack.Screen
        name="AddEditCategory"
        component={AddEditCategoryScreen}
        options={({ route }) => ({
          title: route.params?.categoryId ? 'Editar Categoria' : 'Nova Categoria',
        })}
      />
      <Stack.Screen
        name="AddReview"
        component={AddReviewScreen}
        options={{ title: 'Nova Avaliação' }}
      />
    </Stack.Navigator>
  );
}
