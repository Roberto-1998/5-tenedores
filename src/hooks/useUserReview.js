import { db } from '../utils';
import { query, collection, where, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { size } from 'lodash';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLoggedUser } from './useLoggedUser';

export const useUserReview = (idRestaurant) => {
  const { hasLogged } = useLoggedUser();

  const auth = getAuth();

  const [hasReview, setHasReview] = useState(false);
  useEffect(() => {
    if (hasLogged) {
      const q = query(
        collection(db, 'reviews'),
        where('idRestaurant', '==', idRestaurant),
        where('idUser', '==', auth.currentUser.uid)
      );

      onSnapshot(q, (snapshot) => {
        if (size(snapshot.docs) > 0) setHasReview(true);
      });
    }
  }, [hasLogged]);

  return {
    hasReview,
  };
};
