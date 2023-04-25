import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './ImageRestaurant.styles';
import { Image } from 'react-native-elements';

const ImageRestaurant = ({ formik }) => {
  const primaryImage = formik.values.images[0];

  return (
    <View style={styles.content}>
      <Image
        source={{ uri: primaryImage ?? 'https://www.gmt-sales.com/wp-content/uploads/2015/10/no-image-found.jpg' }}
        style={styles.image}
      />
    </View>
  );
};

export default ImageRestaurant;
