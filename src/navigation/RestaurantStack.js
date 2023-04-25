import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RestaurantsScreen, AddRestaurantScreen } from '../screens';
import { screen } from '../utils';
import React from 'react';
import { RestaurantScreen } from '../screens/Restaurants/RestaurantScreen';
import { AddReviewRestaurantScreen } from '../screens/Restaurants';

const Stack = createNativeStackNavigator();

const RestaurantStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.restaurant.restaurants}
        component={RestaurantsScreen}
        options={{ title: 'Restaurantes' }}
      />
      <Stack.Screen
        name={screen.restaurant.addRestaurant}
        component={AddRestaurantScreen}
        options={{ title: 'Nuevo Restaurante' }}
      />
      <Stack.Screen
        name={screen.restaurant.restaurant}
        component={RestaurantScreen}
        options={{ title: 'Restaurante' }}
      />
      <Stack.Screen
        name={screen.restaurant.addReviewRestaurant}
        component={AddReviewRestaurantScreen}
        options={{ title: 'Nueva Opinión' }}
      />
    </Stack.Navigator>
  );
};

export default RestaurantStack;
