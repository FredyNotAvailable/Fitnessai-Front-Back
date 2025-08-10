// src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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

// Exporta la instancia de Auth para usar en la app
export const auth = getAuth(app);
