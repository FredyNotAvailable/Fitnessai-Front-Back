// src/services/exerciseHistoryService.ts

import { db } from '../config/firebase';
import { ExerciseHistory } from '../models/ExerciseHistory';

const HISTORY_COLLECTION = 'exerciseHistories';

// Filtra solo las claves válidas para ExerciseHistory, excluyendo 'id'
function sanitizeHistoryData(
  data: Partial<ExerciseHistory>
): Omit<Partial<ExerciseHistory>, 'id'> {
  const allowedKeys = Object.keys({
    userId: '',
    exerciseBaseId: '',
    date: '',
    sets: 0,
    reps: 0,
    weight: 0,
    notes: '',
  }) as (keyof ExerciseHistory)[];

  return Object.fromEntries(
    Object.entries(data).filter(([key]) =>
      allowedKeys.includes(key as keyof ExerciseHistory)
    )
  ) as Omit<Partial<ExerciseHistory>, 'id'>;
}

// Crear registro de historial
export async function createExerciseHistory(data: Omit<ExerciseHistory, 'id'>): Promise<ExerciseHistory> {
  const historyRef = db.collection(HISTORY_COLLECTION).doc();
  const historyData = sanitizeHistoryData(data);
  await historyRef.set(historyData);
  return { id: historyRef.id, ...historyData } as ExerciseHistory;
}

// Obtener historial por ID
export async function getExerciseHistory(
  id: string
): Promise<ExerciseHistory | null> {
  const doc = await db.collection(HISTORY_COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  const data = doc.data()!;
  return { id: doc.id, ...data } as ExerciseHistory;
}


// Obtener historial por ID de usuario
export async function getExerciseHistoriesByUser(userId: string): Promise<ExerciseHistory[]> {
  const querySnapshot = await db
    .collection(HISTORY_COLLECTION)
    .where('userId', '==', userId)
    .orderBy('date', 'desc')
    .get();

  const histories: ExerciseHistory[] = [];
  querySnapshot.forEach(doc => {
    const data = doc.data()!;
    histories.push({ id: doc.id, ...data } as ExerciseHistory);
  });

  return histories;
}
//

// Actualizar historial
export async function updateExerciseHistory(
  id: string,
  data: Partial<ExerciseHistory>
): Promise<ExerciseHistory | null> {
  const historyRef = db.collection(HISTORY_COLLECTION).doc(id);
  const doc = await historyRef.get();
  if (!doc.exists) return null;

  const historyData = sanitizeHistoryData(data);
  await historyRef.update(historyData);

  const updatedDoc = await historyRef.get();
  const updatedData = updatedDoc.data()!;
  return { id: updatedDoc.id, ...updatedData } as ExerciseHistory;
}

// Eliminar historial
export async function deleteExerciseHistory(id: string): Promise<boolean> {
  const historyRef = db.collection(HISTORY_COLLECTION).doc(id);
  const doc = await historyRef.get();
  if (!doc.exists) return false;

  await historyRef.delete();
  return true;
}
