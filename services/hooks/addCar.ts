import { getDatabase, ref, push } from 'firebase/database';
import { db } from '@/firebaseConfig';

const addCar = async (car: Omit<Cars, 'id'>): Promise<void> => {
  const dbRef = ref(db, '/');
  try {
    await push(dbRef, car);
    console.log('Car added successfully');
  } catch (error) {
    console.error('Error adding car:', error);
    throw error;
  }
};

export default addCar;
