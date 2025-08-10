// src/services/weightHistoryService.ts

import { db } from '../config/firebase';
import { WeightHistory } from '../models/WeightHistory';

const WEIGHT_HISTORY_COLLECTION = 'weightHistories';

// Filtra solo las claves válidas para WeightHistory, excluyendo 'id'
function sanitizeWeightHistoryData(
  data: Partial<WeightHistory>
): Omit<Partial<WeightHistory>, 'id'> {
  const allowedKeys = Object.keys({
    userId: '',
    date: '',
    weight: 0,
    notes: '',
  }) as (keyof WeightHistory)[];

  return Object.fromEntries(
    Object.entries(data).filter(([key]) =>
      allowedKeys.includes(key as keyof WeightHistory)
    )
  ) as Omit<Partial<WeightHistory>, 'id'>;
}

// Crear registro de historial de peso
export async function createWeightHistory(
  data: Omit<WeightHistory, 'id'>
): Promise<WeightHistory> {
  const weightRef = db.collection(WEIGHT_HISTORY_COLLECTION).doc();
  const weightData = sanitizeWeightHistoryData(data);
  if (!weightData.notes) {
    weightData.notes = '';
  }
  await weightRef.set(weightData);
  return { id: weightRef.id, ...weightData } as WeightHistory;
}

// Obtener historial de peso por ID
export async function getWeightHistory(
  id: string
): Promise<WeightHistory | null> {
  const doc = await db.collection(WEIGHT_HISTORY_COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  const data = doc.data()!;
  return { id: doc.id, ...data } as WeightHistory;
}

// Obtener todos los historiales de peso de un usuario, ordenados por fecha descendente
export async function getWeightHistoriesByUser(
  userId: string
): Promise<WeightHistory[]> {
  const querySnapshot = await db
    .collection(WEIGHT_HISTORY_COLLECTION)
    .where('userId', '==', userId)
    .orderBy('date', 'desc')
    .get();

  const histories: WeightHistory[] = [];
  querySnapshot.forEach(doc => {
    const data = doc.data()!;
    histories.push({ id: doc.id, ...data } as WeightHistory);
  });

  return histories;
}

// Actualizar historial de peso
export async function updateWeightHistory(
  id: string,
  data: Partial<WeightHistory>
): Promise<WeightHistory | null> {
  const weightRef = db.collection(WEIGHT_HISTORY_COLLECTION).doc(id);
  const doc = await weightRef.get();
  if (!doc.exists) return null;

  const weightData = sanitizeWeightHistoryData(data);
  if (weightData.notes === undefined) {
    weightData.notes = '';
  }
  await weightRef.update(weightData);

  const updatedDoc = await weightRef.get();
  const updatedData = updatedDoc.data()!;
  return { id: updatedDoc.id, ...updatedData } as WeightHistory;
}

// Eliminar historial de peso
export async function deleteWeightHistory(id: string): Promise<boolean> {
  const weightRef = db.collection(WEIGHT_HISTORY_COLLECTION).doc(id);
  const doc = await weightRef.get();
  if (!doc.exists) return false;

  await weightRef.delete();
  return true;
}
