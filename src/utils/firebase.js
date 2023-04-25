import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBSjdLjY5Cjhug4QQbqEAGce0UcNr3o54w',
  authDomain: 'tenedores-f0098.firebaseapp.com',
  projectId: 'tenedores-f0098',
  storageBucket: 'tenedores-f0098.appspot.com',
  messagingSenderId: '144706833089',
  appId: '1:144706833089:web:e0dfd03bb3ae07f4656240',
};

export const initFirebase = initializeApp(firebaseConfig);

export const db = getFirestore(initFirebase);
