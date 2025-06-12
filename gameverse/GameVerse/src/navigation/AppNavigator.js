import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAuth } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet } from 'react-native';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// Main Screens
import HomeScreen from '../screens/main/HomeScreen';
import GamesScreen from '../screens/main/GamesScreen';
import TournamentsScreen from '../screens/main/TournamentsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import SettingsScreen from '../screens/main/SettingsScreen';

// Detail Screens
import GameDetailScreen from '../screens/game/GameDetailScreen';
import AddGameScreen from '../screens/game/AddGameScreen';
import EditGameScreen from '../screens/game/EditGameScreen';
import TournamentDetailScreen from '../screens/tournament/TournamentDetailScreen';
import AddTournamentScreen from '../screens/tournament/AddTournamentScreen';
import EditTournamentScreen from '../screens/tournament/EditTournamentScreen';

import { COLORS } from '../utils/theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Custom Tab Bar Component
function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <LinearGradient
      colors={['rgba(26, 26, 46, 0.95)', 'rgba(10, 10, 15, 0.95)']}
      style={styles.tabBar}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View key={route.key} style={styles.tabItem}>
            {isFocused && (
              <LinearGradient
                colors={COLORS.gradient.primary}
                style={styles.activeTabBackground}
              />
            )}
            <Icon
              name={options.tabBarIcon}
              size={24}
              color={isFocused ? COLORS.text : COLORS.textSecondary}
              onPress={onPress}
              style={styles.tabIcon}
            />
            <Text style={[
              styles.tabLabel,
              { color: isFocused ? COLORS.text : COLORS.textSecondary }
            ]}>
              {label}
            </Text>
          </View>
        );
      })}
    </LinearGradient>
  );
}

// Auth Stack
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// Main Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: 'home-variant',
        }}
      />
      <Tab.Screen
        name="Games"
        component={GamesScreen}
        options={{
          tabBarLabel: 'Games',
          tabBarIcon: 'gamepad-variant',
        }}
      />
      <Tab.Screen
        name="Tournaments"
        component={TournamentsScreen}
        options={{
          tabBarLabel: 'Tournaments',
          tabBarIcon: 'trophy',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: 'account-circle',
        }}
      />
    </Tab.Navigator>
  );
}

// Drawer Navigator
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: COLORS.surface,
          width: 280,
        },
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.textSecondary,
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={MainTabs}
        options={{
          drawerLabel: 'Dashboard',
          drawerIcon: ({ color }) => <Icon name="view-dashboard" size={24} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerLabel: 'Settings',
          drawerIcon: ({ color }) => <Icon name="cog" size={24} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}

// Main App Navigator
export default function AppNavigator() {
  const { isLoading, isSignedIn } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient colors={COLORS.gradient.background} style={StyleSheet.absoluteFill} />
        <Icon name="loading" size={48} color={COLORS.primary} />
        <Text style={styles.loadingText}>GameVerse</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.background },
      }}
    >
      {isSignedIn ? (
        <>
          <Stack.Screen name="Main" component={DrawerNavigator} />
          <Stack.Screen name="GameDetail" component={GameDetailScreen} />
          <Stack.Screen name="AddGame" component={AddGameScreen} />
          <Stack.Screen name="EditGame" component={EditGameScreen} />
          <Stack.Screen name="TournamentDetail" component={TournamentDetailScreen} />
          <Stack.Screen name="AddTournament" component={AddTournamentScreen} />
          <Stack.Screen name="EditTournament" component={EditTournamentScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 80,
    paddingBottom: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 210, 255, 0.2)',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeTabBackground: {
    position: 'absolute',
    top: -5,
    left: 10,
    right: 10,
    bottom: -5,
    borderRadius: 20,
    opacity: 0.2,
  },
  tabIcon: {
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
});