import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import React from 'react';
import { screen } from '../utils';
import { AccountStack, FavoritesStack, RankingStack, RestaurantStack, SearchStack } from '../navigation';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#00a680',
        tabBarInactiveTintColor: '#646464',
        tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
      })}
    >
      <Tab.Screen name={screen.restaurant.tab} component={RestaurantStack} options={{ title: 'Restaurantes' }} />
      <Tab.Screen name={screen.favorites.tab} component={FavoritesStack} options={{ title: 'Favoritos' }} />
      <Tab.Screen name={screen.ranking.tab} component={RankingStack} options={{ title: 'Ranking' }} />
      <Tab.Screen name={screen.search.tab} component={SearchStack} options={{ title: 'Buscar' }} />
      <Tab.Screen name={screen.account.tab} component={AccountStack} options={{ title: 'Cuenta' }} />
    </Tab.Navigator>
  );
};

export default AppNavigation;

const screenOptions = (route, color, size) => {
  let iconName;
  if (route.name === screen.restaurant.tab) {
    iconName = 'compass-outline';
  }

  if (route.name === screen.favorites.tab) {
    iconName = 'heart-outline';
  }

  if (route.name === screen.account.tab) {
    iconName = 'home-outline';
  }
  if (route.name === screen.search.tab) {
    iconName = 'magnify';
  }
  if (route.name === screen.ranking.tab) {
    iconName = 'star-outline';
  }

  return <Icon type='material-community' name={iconName} color={color} size={size} />;
};
