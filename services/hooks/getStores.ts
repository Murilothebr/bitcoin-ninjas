import { getDatabase, ref, get, child } from 'firebase/database';
import { db } from '@/firebaseConfig';

const getStores = async (): Promise<Store[]> => {
    const dbRef = ref(db);
    try {
        const snapshot = await get(child(dbRef, '/'));
        if (snapshot.exists()) {
            const storesData = snapshot.val();
            const storesList: Store[] = Object.keys(storesData).map((key) => ({
                id: key,
                name: storesData[key].name,
                location: storesData[key].location,
                contact: storesData[key].contact,
                currencies: storesData[key].currencies,
            }));
            return storesList;
        } else {
            console.log("No data available");
            return [];
        }
    } catch (error) {
        console.error("Error fetching stores data:", error);
        throw error;
    }
};

export default getStores;