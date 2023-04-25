import { useState, useEffect } from 'react';
import { doc, onSnapshot, collection, query, where, orderBy } from 'firebase/firestore';
import { db } from '../utils';

export const useRestaurant = (id) => {
  const [restaurant, setRestaurant] = useState(null);
  useEffect(() => {
    setRestaurant(null);

    onSnapshot(doc(db, 'restaurants', id), (doc) => {
      setRestaurant(doc.data());
    });
  }, [id]);

  return {
    restaurant,
  };
};
