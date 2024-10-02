import { getDatabase, ref, get, child } from 'firebase/database';
import { db } from '@/firebaseConfig';

const getCars = async (): Promise<Cars[]> => {
    const dbRef = ref(db);
    try {
        const snapshot = await get(child(dbRef, '/'));
        if (snapshot.exists()) {
            const carsData = snapshot.val();
            const carsList: Cars[] = Object.keys(carsData).map((key) => ({
                id: key,
                price: carsData[key].price,
                brand: carsData[key].brand,
                model: carsData[key].model,
                year: carsData[key].year,
            }));
            return carsList;
        } else {
            console.log("No data available");
            return [];
        }
    } catch (error) {
        console.error("Error fetching cars data:", error);
        throw error;
    }
};

export default getCars;