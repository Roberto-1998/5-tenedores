import { useEffect, useState } from 'react';
import { db } from '../utils';

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'restaurants'), orderBy('createdAt', 'desc'));

    onSnapshot(q, (snapshot) => {
      setRestaurants(snapshot.docs);
      setLoading(false);
    });
  }, []);

  return {
    loading,
    restaurants,
  };
};
