import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';

export const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});