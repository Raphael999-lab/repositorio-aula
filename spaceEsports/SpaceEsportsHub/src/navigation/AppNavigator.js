import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import TaskScreen from '../screens/TaskScreen';
import MatchScreen from '../screens/MatchScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import { theme } from '../styles/theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.text,
        tabBarStyle: { backgroundColor: theme.colors.background },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.placeholder,
      }}
    >
      <Tab.Screen
        name="Tasks"
        component={TaskScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="task" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Matches"
        component={MatchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="sports-esports" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="dashboard" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          cardStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Adicionar Tarefa' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}