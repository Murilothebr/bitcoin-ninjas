import { ref, update } from 'firebase/database';
import { db } from '@/firebaseConfig';

const updateCar = async (car: Cars): Promise<void> => {
  const dbRef = ref(db, `${car.id}`);
  try {
    await update(dbRef, {
      brand: car.brand,
      price: car.price,
      model: car.model,
      year: car.year,
    });
    console.log('Car updated successfully');
  } catch (error) {
    console.error('Error updating car:', error);
    throw error;
  }
};

export default updateCar;
