import { ref, update } from 'firebase/database';
import { db } from '@/firebaseConfig';

const updateStore = async (store: Store): Promise<void> => {
  const dbRef = ref(db, `${store.id}`);
  try {
    await update(dbRef, {
      name: store.name,
      city: store.city,
      location: store.location,
      contact: store.contact,
      segment: store.segment,
      description: store.description,
      currencies: store.currencies,
    });
    console.log('Store updated successfully');
  } catch (error) {
    console.error('Error updating store:', error);
    throw error;
  }
};

export default updateStore;
