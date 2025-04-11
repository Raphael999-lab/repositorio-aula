// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PaperProvider } from 'react-native-paper';
import EscudoScreen from './screens/EscudosScreens';
import JogadoresScreen from './screens/JogadoresScreen';
import TitulosScreen from './screens/TitulosScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#d32f2f',
            tabBarInactiveTintColor: '#9e9e9e',
            tabBarStyle: {
              backgroundColor: '#ffffff',
              paddingBottom: 5,
              height: 60,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              elevation: 8,
            },
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Escudo') iconName = 'shield';
              else if (route.name === 'Jogadores') iconName = 'account-group';
              else if (route.name === 'Títulos') iconName = 'trophy-outline';

              return <Icon name={iconName} color={color} size={size} />;
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
            },
          })}
        >
          <Tab.Screen name="Escudo" component={EscudoScreen} />
          <Tab.Screen name="Jogadores" component={JogadoresScreen} />
          <Tab.Screen name="Títulos" component={TitulosScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
