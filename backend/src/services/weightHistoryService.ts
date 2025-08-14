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
// Crear registro de historial de peso (evita duplicados por userId y date)
// export async function createWeightHistory(
//   data: Omit<WeightHistory, 'id'>
// ): Promise<WeightHistory> {
//   const targetDate = data.date;

//   const querySnapshot = await db.collection(WEIGHT_HISTORY_COLLECTION)
//     .where('userId', '==', data.userId)
//     .where('date', '==', targetDate)
//     .limit(1)
//     .get();

//   if (!querySnapshot.empty) {
//     // Ya existe historial para ese día, actualiza el registro
//     const doc = querySnapshot.docs[0];
//     const updatedData = sanitizeWeightHistoryData(data);
//     if (!updatedData.notes) {
//       updatedData.notes = '';
//     }

//     await doc.ref.update(updatedData);
//     return { id: doc.id, ...updatedData } as WeightHistory;
//   }

//   // No existe, crea nuevo documento
//   const weightRef = db.collection(WEIGHT_HISTORY_COLLECTION).doc();
//   const weightData = sanitizeWeightHistoryData(data);
//   if (!weightData.notes) {
//     weightData.notes = '';
//   }
//   await weightRef.set(weightData);
//   return { id: weightRef.id, ...weightData } as WeightHistory;
// }


import { updateProfileWeight } from './profileService'; // importa la función

export async function createWeightHistory(
  data: Omit<WeightHistory, 'id'>
): Promise<WeightHistory> {
  const targetDate = data.date;

  const querySnapshot = await db.collection(WEIGHT_HISTORY_COLLECTION)
    .where('userId', '==', data.userId)
    .where('date', '==', targetDate)
    .limit(1)
    .get();

  let result: WeightHistory;

  if (!querySnapshot.empty) {
    // Ya existe historial para ese día, actualiza el registro
    const doc = querySnapshot.docs[0];
    const updatedData = sanitizeWeightHistoryData(data);
    if (!updatedData.notes) updatedData.notes = '';

    await doc.ref.update(updatedData);
    result = { id: doc.id, ...updatedData } as WeightHistory;
  } else {
    // No existe, crea nuevo documento
    const weightRef = db.collection(WEIGHT_HISTORY_COLLECTION).doc();
    const weightData = sanitizeWeightHistoryData(data);
    if (!weightData.notes) weightData.notes = '';
    await weightRef.set(weightData);
    result = { id: weightRef.id, ...weightData } as WeightHistory;
  }

  // 2️⃣ Actualizar peso en el perfil del usuario
  try {
    await updateProfileWeight(data.userId, data.weight);
  } catch (err) {
    console.error('Error actualizando peso en perfil:', err);
  }

  return result;
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
