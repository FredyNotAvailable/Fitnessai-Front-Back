// src/services/cardioHistoryService.ts

import { db } from '../config/firebase';
import { CardioHistory, Category } from '../models/CardioHistory';

const CARDIO_HISTORY_COLLECTION = 'cardioHistories';

// Claves válidas para CardioHistory, excluyendo 'id'
const allowedKeys: (keyof CardioHistory)[] = [
  'userId',
  'date',
  'category',
  'duration',
  'distance',
  'notes',
];

// Filtra solo las claves válidas (incluye category ahora)
function sanitizeCardioHistoryData(
  data: Partial<CardioHistory>
): Omit<Partial<CardioHistory>, 'id'> {
  return Object.fromEntries(
    Object.entries(data).filter(([key]) =>
      allowedKeys.includes(key as keyof CardioHistory)
    )
  ) as Omit<Partial<CardioHistory>, 'id'>;
}

// Crear registro de historial de cardio (evita duplicados por userId y date)
export async function createCardioHistory(
  data: Omit<CardioHistory, 'id'>
): Promise<CardioHistory> {
  const targetDate = data.date;

  const querySnapshot = await db.collection(CARDIO_HISTORY_COLLECTION)
    .where('userId', '==', data.userId)
    .where('date', '==', targetDate)
    .limit(1)
    .get();

  if (!querySnapshot.empty) {
    // Ya existe historial para ese día, actualiza el registro
    const doc = querySnapshot.docs[0];
    const updatedData = sanitizeCardioHistoryData(data);
    if (!updatedData.notes) {
      updatedData.notes = '';
    }

    await doc.ref.update(updatedData);
    return { id: doc.id, ...updatedData } as CardioHistory;
  }

  // No existe, crea nuevo documento
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

///

// Obtener historial de cardio por userId y date exacto
export async function getCardioHistoryByUserAndDate(
  userId: string,
  date: string
): Promise<CardioHistory | null> {
  const querySnapshot = await db
    .collection(CARDIO_HISTORY_COLLECTION)
    .where('userId', '==', userId)
    .where('date', '==', date)
    .limit(1)
    .get();

  if (querySnapshot.empty) return null;

  const doc = querySnapshot.docs[0];
  const data = doc.data()!;
  return { id: doc.id, ...data } as CardioHistory;
}


///


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
