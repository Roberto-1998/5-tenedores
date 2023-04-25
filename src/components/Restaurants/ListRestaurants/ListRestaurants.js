import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { styles } from './ListRestaurants.styles';
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../../utils';

const ListRestaurants = ({ restaurants }) => {
  const { navigate } = useNavigation();

  const goToRestaurant = (restaurant) => {
    navigate(screen.restaurant.restaurant, { id: restaurant.id });
  };

  return (
    <FlatList
      data={restaurants}
      renderItem={({ item }) => {
        const restaurant = item.data();

        return (
          <TouchableOpacity onPress={() => goToRestaurant(restaurant)}>
            <View style={styles.restaurant}>
              <Image source={{ uri: restaurant.images[0] }} style={styles.image} />

              <View>
                <Text style={styles.name}>{restaurant.name}</Text>
                <Text style={styles.info}>{restaurant.address}</Text>
                <Text style={styles.info}>{restaurant.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default ListRestaurants;
