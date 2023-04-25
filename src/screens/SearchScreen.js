import { View, ScrollView, Text } from 'react-native';
import { SearchBar, ListItem, Avatar, Icon } from 'react-native-elements';
import { Loading } from '../components';
import React, { useState, useEffect } from 'react';
import { collection, query, startAt, limit, orderBy, getDocs, endAt } from 'firebase/firestore';
import { db, screen } from '../utils';
import { size, map } from 'lodash';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [searchText, setSearchText] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, 'restaurants'),
        orderBy('name'),
        startAt(searchText),
        endAt(`${searchText}\uf8ff`),
        limit(20)
      );

      const querySnapshot = await getDocs(q);

      setSearchResults(querySnapshot.docs);
    })();
  }, [searchText]);

  const goToRestaurant = (id) => {
    navigation.navigate(screen.restaurant.tab, { screen: screen.restaurant.restaurant, params: { id } });
  };

  return (
    <>
      <SearchBar placeholder='Busca tu restaurante' value={searchText} onChangeText={(text) => setSearchText(text)} />

      {!searchResults && <Loading show />}

      <ScrollView>
        {size(searchResults) === 0 ? (
          <View>
            <Text style={{ alignItems: 'center', marginTop: 20 }}>No se han encontrado resultados</Text>
          </View>
        ) : (
          map(searchResults, (restaurant) => {
            const data = restaurant.data();

            return (
              <ListItem key={data.id} bottomDivider onPress={() => goToRestaurant(data.id)}>
                <Avatar source={{ uri: data.images[0] }} rounded />
                <ListItem.Content>
                  <ListItem.Title>{data.name}</ListItem.Title>
                </ListItem.Content>
                <Icon type='material-community' name='chevron-right' />
              </ListItem>
            );
          })
        )}
      </ScrollView>
    </>
  );
};

export default SearchScreen;
