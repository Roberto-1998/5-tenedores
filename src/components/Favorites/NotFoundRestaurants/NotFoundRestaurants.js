import React from 'react';
import { View } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { styles } from './NotFoundRestaurants.styles';

const NotFoundRestaurants = () => {
  return (
    <View style={styles.content}>
      <Icon type='meterial-community' name='alert-outline' size={80} />
      <Text style={styles.text}>No tienes restaurantes en tu lista</Text>
    </View>
  );
};

export default NotFoundRestaurants;
