// src/services/routineDayService.ts

import { db } from '../config/firebase';
import { RoutineDay } from '../models/RoutineDay';

import type { Profile } from '../models/Profile';
import { ExerciseBase } from '../models/ExerciseBase';
import { generateWeeklyRoutine } from './generateWeeklyRoutine';

// ------------------------------------------------------------------------------
// Constantes de colección Firestore

const EXERCISE_BASES_COLLECTION = 'exerciseBases';
const ROUTINE_DAYS_COLLECTION = 'routineDays';

// ------------------------------------------------------------------------------
// Función para obtener ejercicios base de Firestore

export async function fetchExerciseBases(): Promise<ExerciseBase[]> {
  const snapshot = await db.collection(EXERCISE_BASES_COLLECTION).get();
  const exerciseBases = snapshot.docs.map(doc => ({
    id: doc.id,        // ID Firestore del documento
    ...doc.data(),
  })) as ExerciseBase[];
  return exerciseBases;
}

// ------------------------------------------------------------------------------
// Sanitizar datos para guardar en Firestore (excluir id)

function sanitizeRoutineDayData(data: Partial<RoutineDay>): Omit<Partial<RoutineDay>, 'id'> {
  const allowedKeys = Object.keys({
    userId: '',
    day: '',
    categories: [] as string[],
    exercises: [] as any[],
    duration: 0,
    notes: '',
  }) as (keyof RoutineDay)[];

  return Object.fromEntries(
    Object.entries(data).filter(([key]) => allowedKeys.includes(key as keyof RoutineDay))
  ) as Omit<Partial<RoutineDay>, 'id'>;
}

// ------------------------------------------------------------------------------
// Crear rutina con id autogenerado (menos usado en esta versión)

export async function createRoutineDay(data: Omit<RoutineDay, 'id'>): Promise<RoutineDay> {
  const routineRef = db.collection(ROUTINE_DAYS_COLLECTION).doc();
  const routineData = sanitizeRoutineDayData(data);
  await routineRef.set(routineData);
  return { id: routineRef.id, ...routineData } as RoutineDay;
}

// ------------------------------------------------------------------------------
// Generar ID de documento predecible userId_day

function generateRoutineDocId(userId: string, day: string): string {
  const normalizedDay = day.trim().toLowerCase().replace(/\s+/g, '_');
  return `${userId}_${normalizedDay}`;
}

// Crear o actualizar rutina según docId generado

async function createOrUpdateRoutineDay(routine: Omit<RoutineDay, 'id'> & { id?: string }): Promise<RoutineDay> {
  const docId = generateRoutineDocId(routine.userId, routine.day);
  const docRef = db.collection(ROUTINE_DAYS_COLLECTION).doc(docId);
  const { id, ...routineData } = routine;
  await docRef.set(routineData, { merge: true }); // crea o actualiza
  return { id: docId, ...routineData };
}

// ------------------------------------------------------------------------------
// Generar y guardar rutina semanal sincronizando documentos

export async function generateAndSaveWeeklyRoutine(userId: string): Promise<RoutineDay[]> {
  // 1. Obtener el perfil actualizado del usuario desde Firestore
  const profileDoc = await db.collection('profiles').doc(userId).get();
  if (!profileDoc.exists) {
    throw new Error(`Perfil no encontrado para userId: ${userId}`);
  }
  const profile = profileDoc.data() as Profile;
  profile.userId = userId; // aseguramos que tenga userId

  // 2. Obtener ejercicios base
  const exerciseBases = await fetchExerciseBases();
  if (!exerciseBases.length) {
    throw new Error('No se encontraron ejercicios base en la base de datos');
  }

  // 3. Obtener rutinas actuales del usuario
  const existingRoutinesSnapshot = await db.collection(ROUTINE_DAYS_COLLECTION)
    .where('userId', '==', userId)
    .get();

  const existingRoutines = existingRoutinesSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as RoutineDay[];

  // 4. Generar nuevas rutinas en memoria usando el perfil actualizado
  const routinesToCreate = generateWeeklyRoutine(profile, exerciseBases);

  // 5. Crear mapas para comparación
  const existingMap = new Map(existingRoutines.map(r => [r.day, r]));
  const newMap = new Map(routinesToCreate.map(r => [r.day, r]));

  const processedRoutines: RoutineDay[] = [];

  // 6. Crear o actualizar rutinas
  for (const routine of routinesToCreate) {
    routine.userId = userId; // aseguramos userId
    const updatedRoutine = await createOrUpdateRoutineDay(routine);
    processedRoutines.push(updatedRoutine);
  }

  // 7. Eliminar rutinas de días que ya no entrena
  for (const existingRoutine of existingRoutines) {
    if (!newMap.has(existingRoutine.day)) {
      await db.collection(ROUTINE_DAYS_COLLECTION).doc(existingRoutine.id).delete();
      console.log(`Rutina eliminada para día: ${existingRoutine.day}`);
    }
  }

  return processedRoutines;
}


// ------------------------------------------------------------------------------
// Funciones adicionales para obtener, actualizar, borrar rutinas

export async function getRoutineDay(id: string): Promise<RoutineDay | null> {
  const doc = await db.collection(ROUTINE_DAYS_COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  const data = doc.data()!;
  return { id: doc.id, ...data } as RoutineDay;
}

export async function getRoutineDaysByUserId(userId: string): Promise<RoutineDay[]> {
  const querySnapshot = await db
    .collection(ROUTINE_DAYS_COLLECTION)
    .where('userId', '==', userId)
    .get();

  const routineDays: RoutineDay[] = [];
  querySnapshot.forEach(doc => {
    const data = doc.data()!;
    routineDays.push({ id: doc.id, ...data } as RoutineDay);
  });

  return routineDays;
}

export async function updateRoutineDay(id: string, data: Partial<RoutineDay>): Promise<RoutineDay | null> {
  const routineRef = db.collection(ROUTINE_DAYS_COLLECTION).doc(id);
  const doc = await routineRef.get();
  if (!doc.exists) return null;
  const routineData = sanitizeRoutineDayData(data);
  await routineRef.update(routineData);
  const updatedDoc = await routineRef.get();
  const updatedData = updatedDoc.data()!;
  return { id: updatedDoc.id, ...updatedData } as RoutineDay;
}

export async function deleteRoutineDay(id: string): Promise<boolean> {
  const routineRef = db.collection(ROUTINE_DAYS_COLLECTION).doc(id);
  const doc = await routineRef.get();
  if (!doc.exists) return false;
  await routineRef.delete();
  return true;
}
