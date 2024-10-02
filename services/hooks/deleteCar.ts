import { getDatabase, ref, remove } from 'firebase/database';
import { db } from '@/firebaseConfig';

const deleteCars = async (carId: number): Promise<void> => {
  const dbRef = ref(db, `/${carId}`);
  try {
    await remove(dbRef);
    console.log(`Car with id ${carId} has been deleted.`);
  } catch (error) {
    console.error("Error deleting car:", error);
    throw error;
  }
};

export default deleteCars;
