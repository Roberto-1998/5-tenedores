import { View } from 'react-native';
import { Text, Rating } from 'react-native-elements';
import React from 'react';
import { style } from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes';
import { styles } from './Header.styles';

const Header = ({ restaurant }) => {
  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Rating imageSize={20} readonly startingValue={restaurant.ratingMedia} />
      </View>
      <Text style={styles.description}>{restaurant.description}</Text>
    </View>
  );
};

export default Header;
