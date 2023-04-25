import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Image } from 'react-native-elements';
import { styles } from './Carousel.styles';
import CarouselSnap, { Pagination } from 'react-native-snap-carousel';
import { size } from 'lodash';

const Carousel = ({ images, width, height, hideDots }) => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const renderItem = ({ item }) => <Image source={{ uri: item }} style={{ height, width }} />;

  const pagination = () => {
    return (
      <Pagination
        dotsLength={size(images)}
        activeDotIndex={activeDotIndex}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        containerStyle={styles.dotsContainer}
        dotStyle={styles.dot}
      />
    );
  };

  return (
    <View style={styles.content}>
      <CarouselSnap
        layout='default'
        data={images}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveDotIndex(index)}
      />

      {!hideDots && pagination()}
    </View>
  );
};

export default Carousel;
