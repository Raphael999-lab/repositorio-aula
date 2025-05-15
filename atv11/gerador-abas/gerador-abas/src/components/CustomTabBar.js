import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomTabBar = ({ navigation, state, descriptors }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <BottomNavigation.Bar
        navigationState={state}
        onTabPress={({ route }) => {
          navigation.navigate(route.name);
        }}
        renderIcon={({ route, focused, color }) => {
          const { options } = descriptors[route.key];
          const iconName = options.tabBarIcon;

          return (
            <MaterialCommunityIcons
              name={iconName}
              size={24}
              color={color}
              style={styles.icon}
            />
          );
        }}
        getLabelText={({ route }) => {
          const { options } = descriptors[route.key];
          return options.tabBarLabel;
        }}
        activeColor={colors.primary}
        inactiveColor={colors.onSurface}
        style={styles.bar}
        theme={{ colors: { secondaryContainer: colors.primaryContainer } }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bar: {
    height: 60,
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 4,
  },
});

export default CustomTabBar;