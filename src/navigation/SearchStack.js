import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screen } from '../utils';
import { SearchScreen } from '../screens';

const Stack = createNativeStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={screen.search.search} component={SearchScreen} options={{ title: 'Buscar' }} />
    </Stack.Navigator>
  );
};

export default SearchStack;
