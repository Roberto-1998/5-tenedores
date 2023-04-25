import { useEffect, useState } from 'react';
import { doc, getDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../utils';
import { useLoggedUser } from './useLoggedUser';

export const useFavUserRestaurants = () => {
  const { hasLogged } = useLoggedUser();
  const [restaurants, setRestaurants] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    /* if (!hasLogged) return; */

    const q = query(collection(db, 'favorites'), where('idUser', '==', auth.currentUser?.uid));

    onSnapshot(q, async (snapshot) => {
      let restaurantArray = [];

      for await (const item of snapshot.docs) {
        const data = item.data();
        const docRef = doc(db, 'restaurants', data.idRestaurant);
        const docSnap = await getDoc(docRef);
        const newData = docSnap.data();
        newData.idFavorite = data.id;

        restaurantArray.push(newData);
      }

      setRestaurants(restaurantArray);
    });
  }, []);

  return {
    restaurants,
  };
};
