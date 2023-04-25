import { doc, onSnapshot, collection, query, where, orderBy } from 'firebase/firestore';
import { db } from '../utils';
import { useEffect, useState } from 'react';

export const useRestaurantReviews = (idRestaurant) => {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'reviews'), where('idRestaurant', '==', idRestaurant), orderBy('createdAt', 'desc'));

    onSnapshot(q, (snapshot) => {
      setReviews(snapshot.docs);
    });
  }, []);

  return {
    reviews,
  };
};
