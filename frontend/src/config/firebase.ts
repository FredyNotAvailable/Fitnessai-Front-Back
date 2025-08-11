// src/config/firebase.ts

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';  // <-- importa Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAvH1DoG3NQXDPqYXZGhhuqW9khQ5KVd0k",
  authDomain: "fitnessai-86c6a.firebaseapp.com",
  projectId: "fitnessai-86c6a",
  storageBucket: "fitnessai-86c6a.firebasestorage.app",
  messagingSenderId: "357415096984",
  appId: "1:357415096984:web:cc00677ac671ce4696f6ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Instancia de Auth
export const auth = getAuth(app);

// Instancia de Firestore (base de datos)
export const db = getFirestore(app);
