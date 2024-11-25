import { ref, push } from 'firebase/database';
import { db } from '@/firebaseConfig';

const addStore = async (store: Omit<Store, 'id'>): Promise<void> => {
  const dbRef = ref(db, '/');
  try {
    console.log('Store' , store);
    await push(dbRef, store);
    console.log('Store added successfully' , store);
  } catch (error) {
    console.error('Error adding store:', error);
    throw error;
  }
};

export default addStore;
