import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db } from '../utils';

export const useRankingRestaurants = () => {
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'restaurants'), orderBy('ratingMedia', 'desc'), limit(10));

    onSnapshot(q, (snapshot) => {
      setRestaurants(snapshot.docs);
    });
  }, []);

  return {
    restaurants,
  };
};
