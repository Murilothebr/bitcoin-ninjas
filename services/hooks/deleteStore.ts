import { ref, remove } from 'firebase/database';
import { db } from '@/firebaseConfig';

const deleteStores = async (storeId: number): Promise<void> => {
  const dbRef = ref(db, `/${storeId}`);
  try {
    await remove(dbRef);
    console.log(`Store with id ${storeId} has been deleted.`);
  } catch (error) {
    console.error("Error deleting store:", error);
    throw error;
  }
};

export default deleteStores;
