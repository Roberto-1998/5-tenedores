import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { styles } from './BtnFavorite.styles';
import { doc, setDoc, getDocs, query, where, collection, deleteDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../../utils/firebase';
import { size, forEach } from 'lodash';

const BtnFavorite = ({ idRestaurant }) => {
  const auth = getAuth();
  const [isFavorite, setIsFavorite] = useState(undefined);
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getFavorites();

      if (size(response) > 0) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    })();
  }, [idRestaurant, isReload]);

  const onReload = () => setIsReload(!isReload);

  const getFavorites = async () => {
    const q = query(
      collection(db, 'favorites'),
      where('idRestaurant', '==', idRestaurant),
      where('idUser', '==', auth.currentUser.uid)
    );

    const result = await getDocs(q);

    return result.docs;
  };

  const addFavorite = async () => {
    try {
      const idFavorite = Math.random().toString();
      const data = {
        id: idFavorite,
        idRestaurant,
        idUser: auth.currentUser.uid,
      };

      await setDoc(doc(db, 'favorites', idFavorite), data);
      onReload();
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavorite = async () => {
    try {
      const response = await getFavorites();

      forEach(response, async (item) => {
        await deleteDoc(doc(db, 'favorites', item.id));
      });

      onReload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.content}>
      {isFavorite !== undefined && (
        <Icon
          type='material-community'
          name={isFavorite ? 'heart' : 'heart-outline'}
          color={isFavorite ? '#f00' : '#000'}
          size={35}
          onPress={isFavorite ? removeFavorite : addFavorite}
        />
      )}
    </View>
  );
};

export default BtnFavorite;
