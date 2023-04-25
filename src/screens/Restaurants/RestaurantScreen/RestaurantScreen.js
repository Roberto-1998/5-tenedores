import React from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { styles } from './RestaurantScreen.styles';
import { useRestaurant } from '../../../hooks/useRestaurant';
import { BtnFavorite, BtnReviewForm, Carousel, Header, Info, Loading, Review } from '../../../components';
import { useLoggedUser } from '../../../hooks';

const { width } = Dimensions.get('window');

const RestaurantScreen = (props) => {
  const { hasLogged } = useLoggedUser();

  const {
    route: {
      params: { id },
    },
  } = props;

  const { restaurant } = useRestaurant(id);

  if (!restaurant) return <Loading show />;

  return (
    <ScrollView style={styles.content}>
      <Carousel height={250} width={width} images={restaurant.images} />
      <Header restaurant={restaurant} />
      <Info restaurant={restaurant} />
      <BtnReviewForm idRestaurant={restaurant.id} />
      <Review idRestaurant={restaurant.id} />
      {hasLogged && <BtnFavorite idRestaurant={restaurant.id} />}
    </ScrollView>
  );
};

export default RestaurantScreen;
