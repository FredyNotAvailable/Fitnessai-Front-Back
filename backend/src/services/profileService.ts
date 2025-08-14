// src/services/profileService.ts
import { db } from '../config/firebase';
import { Profile } from '../models/Profile';
import { generateAndSaveWeeklyRoutine } from './routineDayService'; // <--- importar la función
const PROFILES_COLLECTION = 'profiles';

// Función para filtrar solo las claves que existen en el modelo Profile
function sanitizeProfileData(data: Partial<Profile>): Partial<Profile> {
  const allowedKeys = Object.keys({
    userId: '',
    gender: '',
    trainingDays: [],
    weight: 0,
    height: 0,
    birthdate: '',
    goal: '',
    experience: '',
  }) as (keyof Profile)[];

  return Object.fromEntries(
    Object.entries(data).filter(([key]) => allowedKeys.includes(key as keyof Profile))
  ) as Partial<Profile>;
}

// export async function createProfile(userId: string, data: Profile): Promise<Profile> {
//   const profileRef = db.collection(PROFILES_COLLECTION).doc(userId);
//   const doc = await profileRef.get();

//   if (doc.exists) {
//     throw new Error('Perfil ya existe');
//   }

//   const profileData = sanitizeProfileData({
//     ...data,
//     userId,
//   });

//   await profileRef.set(profileData);
//   return { userId, ...profileData } as Profile;
// }

export async function createProfile(userId: string, data: Profile): Promise<Profile> {
  const profileRef = db.collection(PROFILES_COLLECTION).doc(userId);
  const doc = await profileRef.get();

  if (doc.exists) {
    throw new Error('Perfil ya existe');
  }

  const profileData = sanitizeProfileData({
    ...data,
    userId,
  });

  // 1️⃣ Crear perfil en Firestore
  await profileRef.set(profileData);

  const profileCreated = { userId, ...profileData } as Profile;

  // 2️⃣ Generar rutina semanal automáticamente
  try {
    await generateAndSaveWeeklyRoutine(userId);
    console.log('Rutina semanal generada automáticamente al crear el perfil.');
  } catch (err) {
    console.error('Error generando la rutina semanal:', err);
  }

  return profileCreated;
}


export async function getProfile(userId: string): Promise<Profile | null> {
  const doc = await db.collection(PROFILES_COLLECTION).doc(userId).get();
  if (!doc.exists) return null;

  const data = doc.data() as Profile;
  const { userId: _, ...rest } = data; // descartamos userId del data

  return { userId: doc.id, ...rest };
}

export async function updateProfile(userId: string, data: Partial<Profile>): Promise<Profile | null> {
  const profileRef = db.collection(PROFILES_COLLECTION).doc(userId);
  const doc = await profileRef.get();
  if (!doc.exists) return null;

  const profileData = sanitizeProfileData(data);
  await profileRef.update(profileData);

  const updatedDoc = await profileRef.get();
  const updatedData = updatedDoc.data() as Profile;
  const { userId: _, ...rest } = updatedData; // descartamos userId del data

  return { userId: updatedDoc.id, ...rest };
}

export async function deleteProfile(userId: string): Promise<boolean> {
  const profileRef = db.collection(PROFILES_COLLECTION).doc(userId);
  const doc = await profileRef.get();
  if (!doc.exists) return false;

  await profileRef.delete();
  return true;
}

// src/services/profileService.ts
export async function updateProfileWeight(userId: string, weight: number): Promise<void> {
  const profileRef = db.collection('profiles').doc(userId);
  const doc = await profileRef.get();
  if (!doc.exists) return;
  await profileRef.update({ weight });
}
