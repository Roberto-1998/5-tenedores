import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Image, Text, Rating, Icon } from 'react-native-elements';
import { styles } from './RestaurantRanking.styles';
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../../utils';

const RestaurantRanking = ({ restaurant, index }) => {
  const navigation = useNavigation();

  const renderMedal = () => {
    if (index > 2) {
      return null;
    }

    let color = index === 0 ? '#FFD700' : index === 1 ? '#BEBEBE' : '#CD7F32';
    return <Icon type='material-community' name='medal-outline' color={color} containerStyle={styles.medal} />;
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(screen.restaurant.tab, {
          screen: screen.restaurant.restaurant,
          params: { id: restaurant.id },
        })
      }
    >
      <View style={styles.content}>
        <Image source={{ uri: restaurant.images[0] }} style={styles.image} />
        <View style={styles.infoContent}>
          <View style={styles.nameContent}>
            {renderMedal()}
            <Text style={styles.name}>{restaurant.name}</Text>
          </View>
          <Rating imageSize={15} readonly startingValue={restaurant.ratingMedia} />
        </View>
        <Text style={styles.description}>{restaurant.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantRanking;
