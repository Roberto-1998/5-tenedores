import React from 'react';
import { View } from 'react-native';
import { Text, ListItem, Icon } from 'react-native-elements';
import { styles } from './Info.styles';
import { map } from 'lodash';
import { Map } from '../../shared';

const Info = ({ restaurant }) => {
  const listInfo = [
    {
      text: restaurant.address,
      iconName: 'map-marker',
      iconType: 'material-community',
    },
    {
      text: restaurant.phone,
      iconType: 'material-community',
      iconName: 'phone',
    },
    {
      text: restaurant.email,
      iconType: 'material-community',
      iconName: 'at',
    },
  ];

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Información sobre el restaurante</Text>
      <Map location={restaurant.location} name={restaurant.name} />
      {map(listInfo, (item, index) => (
        <ListItem key={index} bottomDivider>
          <Icon type={item.iconType} name={item.iconName} color={'#00a680'} />
          <ListItem.Content>
            <ListItem.Title>{item.text}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
};

export default Info;
