import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import TournamentsScreen from '../screens/TournamentsScreen';
import TeamsScreen from '../screens/TeamsScreen';
import PlayersScreen from '../screens/PlayersScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TournamentDetailScreen from '../screens/TournamentDetailScreen';
import TeamFormScreen from '../screens/TeamFormScreen';
import PlayerFormScreen from '../screens/PlayerFormScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const TournamentStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#000033' },
      headerTintColor: '#00ffff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen name="TournamentsList" component={TournamentsScreen} options={{ title: 'Torneios' }} />
    <Stack.Screen name="TournamentDetail" component={TournamentDetailScreen} options={{ title: 'Detalhes' }} />
  </Stack.Navigator>
);

const TeamStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#000033' },
      headerTintColor: '#00ffff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen name="TeamsList" component={TeamsScreen} options={{ title: 'Times' }} />
    <Stack.Screen name="TeamForm" component={TeamFormScreen} options={{ title: 'Gerenciar Time' }} />
  </Stack.Navigator>
);

const PlayerStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#000033' },
      headerTintColor: '#00ffff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen name="PlayersList" component={PlayersScreen} options={{ title: 'Jogadores' }} />
    <Stack.Screen name="PlayerForm" component={PlayerFormScreen} options={{ title: 'Gerenciar Jogador' }} />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: { backgroundColor: '#000033', borderTopColor: '#0066ff' },
      tabBarActiveTintColor: '#00ffff',
      tabBarInactiveTintColor: '#99ccff',
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="rocket" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Tournaments"
      component={TournamentStack}
      options={{
        tabBarLabel: 'Torneios',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="trophy" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Teams"
      component={TeamStack}
      options={{
        tabBarLabel: 'Times',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account-group" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Players"
      component={PlayerStack}
      options={{
        tabBarLabel: 'Jogadores',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account-star" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      drawerStyle: { backgroundColor: '#000033' },
      drawerActiveTintColor: '#00ffff',
      drawerInactiveTintColor: '#99ccff',
      headerStyle: { backgroundColor: '#000033' },
      headerTintColor: '#00ffff',
    }}
  >
    <Drawer.Screen
      name="MainTabs"
      component={TabNavigator}
      options={{
        title: 'eSports Galaxy',
        drawerIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="rocket-launch" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="Favorites"
      component={FavoritesScreen}
      options={{
        title: 'Favoritos',
        drawerIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="star" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: 'Perfil',
        drawerIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account-circle" size={size} color={color} />
        ),
      }}
    />
  </Drawer.Navigator>
);

export default AppNavigator;