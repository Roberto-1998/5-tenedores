import React from 'react';
import { useRankingRestaurants } from '../hooks/useRankingRestaurants';
import { map } from 'lodash';
import { ScrollView } from 'react-native';
import { RestaurantRanking } from '../components/Restaurants/RestaurantRanking';

const RankingScreen = () => {
  const { restaurants } = useRankingRestaurants();

  return (
    <ScrollView>
      {map(restaurants, (restaurant, index) => (
        <RestaurantRanking key={index} index={index} restaurant={restaurant.data()} />
      ))}
    </ScrollView>
  );
};

export default RankingScreen;
