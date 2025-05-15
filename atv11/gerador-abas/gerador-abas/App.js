import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MegaSenaScreen from './screens/MegaSenaScreen';
import JogoDoBichoScreen from './screens/JogoDoBichoScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#6200ee',
          tabBarInactiveTintColor: '#757575',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            paddingBottom: 5,
            height: 60,
          },
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Tab.Screen
          name="MegaSena"
          component={MegaSenaScreen}
          options={{
            tabBarLabel: 'Mega Sena',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="numeric" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="JogoDoBicho"
          component={JogoDoBichoScreen}
          options={{
            tabBarLabel: 'Jogo do Bicho',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="paw" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});