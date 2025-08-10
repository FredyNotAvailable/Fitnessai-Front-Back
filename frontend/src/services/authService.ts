// src/services/authService.ts


import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut, type User } from 'firebase/auth';
import { auth } from '../config/firebase'; // Asumiendo que aquí está inicializado Firebase

export async function getAuthToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;
  return user.getIdToken();
}

export async function login(email: string, password: string): Promise<void> {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error((error as Error).message || 'Error en login');
  }
}

export async function register(email: string, password: string, fullname: string): Promise<User> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: fullname });
    return userCredential.user;
  } catch (error) {
    throw new Error((error as Error).message || 'Error en registro');
  }
}

export async function logout(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error((error as Error).message || 'Error al cerrar sesión');
  }
}
