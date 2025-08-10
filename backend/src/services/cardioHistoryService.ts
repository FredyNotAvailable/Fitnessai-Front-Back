// src/services/cardioHistoryService.ts

import { db } from '../config/firebase';
import { CardioHistory } from '../models/CardioHistory';

const CARDIO_HISTORY_COLLECTION = 'cardioHistories';

// Filtra solo las claves válidas para CardioHistory, excluyendo 'id'
function sanitizeCardioHistoryData(
  data: Partial<CardioHistory>
): Omit<Partial<CardioHistory>, 'id'> {
  const allowedKeys = Object.keys({
    userId: '',
    date: '',
    duration: 0,
    distance: 0,
    notes: '',
  }) as (keyof CardioHistory)[];

  return Object.fromEntries(
    Object.entries(data).filter(([key]) =>
      allowedKeys.includes(key as keyof CardioHistory)
    )
  ) as Omit<Partial<CardioHistory>, 'id'>;
}

// Crear registro de historial de cardio
export async function createCardioHistory(
  data: Omit<CardioHistory, 'id'>
): Promise<CardioHistory> {
  const cardioRef = db.collection(CARDIO_HISTORY_COLLECTION).doc();
  const cardioData = sanitizeCardioHistoryData(data);
  if (!cardioData.notes) {
    cardioData.notes = '';
  }
  await cardioRef.set(cardioData);
  return { id: cardioRef.id, ...cardioData } as CardioHistory;
}

// Obtener historial de cardio por ID
export async function getCardioHistory(
  id: string
): Promise<CardioHistory | null> {
  const doc = await db.collection(CARDIO_HISTORY_COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  const data = doc.data()!;
  return { id: doc.id, ...data } as CardioHistory;
}

// Obtener todos los historiales de cardio de un usuario, ordenados por fecha descendente
export async function getCardioHistoriesByUser(
  userId: string
): Promise<CardioHistory[]> {
  const querySnapshot = await db
    .collection(CARDIO_HISTORY_COLLECTION)
    .where('userId', '==', userId)
    .orderBy('date', 'desc')
    .get();

  const histories: CardioHistory[] = [];
  querySnapshot.forEach(doc => {
    const data = doc.data()!;
    histories.push({ id: doc.id, ...data } as CardioHistory);
  });

  return histories;
}

// Actualizar historial de cardio
export async function updateCardioHistory(
  id: string,
  data: Partial<CardioHistory>
): Promise<CardioHistory | null> {
  const cardioRef = db.collection(CARDIO_HISTORY_COLLECTION).doc(id);
  const doc = await cardioRef.get();
  if (!doc.exists) return null;

  const cardioData = sanitizeCardioHistoryData(data);
  if (cardioData.notes === undefined) {
    cardioData.notes = '';
  }
  await cardioRef.update(cardioData);

  const updatedDoc = await cardioRef.get();
  const updatedData = updatedDoc.data()!;
  return { id: updatedDoc.id, ...updatedData } as CardioHistory;
}

// Eliminar historial de cardio
export async function deleteCardioHistory(id: string): Promise<boolean> {
  const cardioRef = db.collection(CARDIO_HISTORY_COLLECTION).doc(id);
  const doc = await cardioRef.get();
  if (!doc.exists) return false;

  await cardioRef.delete();
  return true;
}
