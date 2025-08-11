// src/services/exerciseService.ts
import { db } from '../config/firebase';
import { ExerciseBase } from '../models/ExerciseBase';

const EXERCISES_COLLECTION = 'exerciseBases';

// Función para filtrar solo las claves válidas para ExerciseBase, excluyendo 'id'
function sanitizeExerciseData(data: Partial<ExerciseBase>): Omit<Partial<ExerciseBase>, 'id'> {
  const allowedKeys = Object.keys({
    name: '',
    description: '',
    category: '',
    photoUrl: '',
  }) as (keyof ExerciseBase)[];

  return Object.fromEntries(
    Object.entries(data).filter(([key]) => allowedKeys.includes(key as keyof ExerciseBase))
  ) as Omit<Partial<ExerciseBase>, 'id'>;
}

export async function createExercise(data: Omit<ExerciseBase, 'id'>): Promise<ExerciseBase> {
  // Generar doc sin id explícito (Firestore genera uno)
  const exerciseRef = db.collection(EXERCISES_COLLECTION).doc();

  const exerciseData = sanitizeExerciseData(data);
  await exerciseRef.set(exerciseData);

  // Retornamos con id generado
  return { id: exerciseRef.id, ...exerciseData } as ExerciseBase;
}

export async function getExercise(id: string): Promise<ExerciseBase | null> {
  const doc = await db.collection(EXERCISES_COLLECTION).doc(id).get();
  if (!doc.exists) return null;

  const data = doc.data()!;
  return { id: doc.id, ...data } as ExerciseBase;
}

export async function getAllExercises(): Promise<ExerciseBase[]> {
  const snapshot = await db.collection(EXERCISES_COLLECTION).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ExerciseBase[];
}

export async function updateExercise(id: string, data: Partial<ExerciseBase>): Promise<ExerciseBase | null> {
  const exerciseRef = db.collection(EXERCISES_COLLECTION).doc(id);
  const doc = await exerciseRef.get();
  if (!doc.exists) return null;

  const exerciseData = sanitizeExerciseData(data);
  await exerciseRef.update(exerciseData);

  const updatedDoc = await exerciseRef.get();
  const updatedData = updatedDoc.data()!;
  return { id: updatedDoc.id, ...updatedData } as ExerciseBase;
}

export async function deleteExercise(id: string): Promise<boolean> {
  const exerciseRef = db.collection(EXERCISES_COLLECTION).doc(id);
  const doc = await exerciseRef.get();
  if (!doc.exists) return false;

  await exerciseRef.delete();
  return true;
}
