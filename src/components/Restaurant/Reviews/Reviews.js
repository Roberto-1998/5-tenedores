import React from 'react';
import { View } from 'react-native';
import { styles } from './Reviews.styles';
import { Text, AirbnbRating, ListItem, Avatar } from 'react-native-elements';
import { useRestaurantReviews } from '../../../hooks';
import { Loading } from '../../shared';
import { map } from 'lodash';
import { DateTime } from 'luxon';
import 'intl';
import 'intl/locale-data/jsonp/es';

const Reviews = ({ idRestaurant }) => {
  const { reviews } = useRestaurantReviews(idRestaurant);

  if (!reviews) return <Loading show text={'cargando'} />;

  return (
    <View style={styles.content}>
      {map(reviews, (review) => {
        const data = review.data();

        const createReview = new Date(data.createdAt.seconds * 1000);

        return (
          <ListItem key={data.id} bottomDivider containerStyle={styles.review}>
            <Avatar source={{ uri: data.avatar }} size={50} rounded />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{data.title}</ListItem.Title>
              <View style={styles.subTitle}>
                <Text style={styles.comment}>{data.comment}</Text>
                <View style={styles.contentRatingDate}>
                  <AirbnbRating
                    starContainerStyle={styles.starContainer}
                    defaultRating={data.rating}
                    showRating={false}
                    size={15}
                    isDisabled
                  />
                  <Text style={styles.date}>
                    {DateTime.fromISO(createReview.toISOString()).toFormat('yyyy/LL/dd - hh:mm')}
                  </Text>
                </View>
              </View>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </View>
  );
};

export default Reviews;
