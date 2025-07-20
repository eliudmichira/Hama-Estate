import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCjtZynMr3W1Yk9jfnPLNJZNlgKRzAF_IQ",
  authDomain: "makao-648bd.firebaseapp.com",
  projectId: "makao-648bd",
  storageBucket: "makao-648bd.appspot.com",
  messagingSenderId: "142667530803",
  appId: "1:142667530803:web:d635acdf583356dda21946",
  measurementId: "G-QSSV2V096Q"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app; 