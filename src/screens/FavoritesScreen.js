import React from 'react';
import { ScrollView } from 'react-native';
import { useLoggedUser } from '../hooks/useLoggedUser';
import { Loading, NotFoundRestaurants, RestaurantFavorite, UserNotLogged } from '../components';
import { useFavUserRestaurants } from '../hooks';
import { size, map } from 'lodash';

const FavoritesScreen = () => {
  const { hasLogged } = useLoggedUser();
  const { restaurants } = useFavUserRestaurants();

  if (!hasLogged) return <UserNotLogged />;

  if (!restaurants) return <Loading show text={'cargando'} />;

  if (size(restaurants) === 0) return <NotFoundRestaurants />;

  return (
    <ScrollView>
      {map(restaurants, (restaurant) => (
        <RestaurantFavorite key={restaurant.id} restaurant={restaurant} />
      ))}
    </ScrollView>
  );
};

export default FavoritesScreen;
