// src/services/waterHistoryService.ts

import { db } from '../config/firebase';
import { WaterHistory } from '../models/WaterHistory';

const WATER_HISTORY_COLLECTION = 'waterHistories';

// Filtra solo las claves válidas para WaterHistory, excluyendo 'id'
function sanitizeWaterHistoryData(
  data: Partial<WaterHistory>
): Omit<Partial<WaterHistory>, 'id'> {
  const allowedKeys = Object.keys({
    userId: '',
    date: '',
    liters: 0,
    notes: '',
  }) as (keyof WaterHistory)[];

  return Object.fromEntries(
    Object.entries(data).filter(([key]) =>
      allowedKeys.includes(key as keyof WaterHistory)
    )
  ) as Omit<Partial<WaterHistory>, 'id'>;
}

// Crear registro de historial de agua
export async function createWaterHistory(
  data: Omit<WaterHistory, 'id'>
): Promise<WaterHistory> {
  const waterRef = db.collection(WATER_HISTORY_COLLECTION).doc();
  const waterData = sanitizeWaterHistoryData(data);
  // Aseguramos que notes esté definido (aunque sea '')
  if (!waterData.notes) {
    waterData.notes = '';
  }
  await waterRef.set(waterData);
  return { id: waterRef.id, ...waterData } as WaterHistory;
}

// Obtener historial de agua por ID
export async function getWaterHistory(
  id: string
): Promise<WaterHistory | null> {
  const doc = await db.collection(WATER_HISTORY_COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  const data = doc.data()!;
  return { id: doc.id, ...data } as WaterHistory;
}

// Obtener todos los historiales de agua de un usuario, ordenados por fecha descendente
export async function getWaterHistoriesByUser(
  userId: string
): Promise<WaterHistory[]> {
  const querySnapshot = await db
    .collection(WATER_HISTORY_COLLECTION)
    .where('userId', '==', userId)
    .orderBy('date', 'desc')
    .get();

  const histories: WaterHistory[] = [];
  querySnapshot.forEach(doc => {
    const data = doc.data()!;
    histories.push({ id: doc.id, ...data } as WaterHistory);
  });

  return histories;
}

// Actualizar historial de agua
export async function updateWaterHistory(
  id: string,
  data: Partial<WaterHistory>
): Promise<WaterHistory | null> {
  const waterRef = db.collection(WATER_HISTORY_COLLECTION).doc(id);
  const doc = await waterRef.get();
  if (!doc.exists) return null;

  const waterData = sanitizeWaterHistoryData(data);
  // Aseguramos que notes esté definido (aunque sea '')
  if (waterData.notes === undefined) {
    waterData.notes = '';
  }
  await waterRef.update(waterData);

  const updatedDoc = await waterRef.get();
  const updatedData = updatedDoc.data()!;
  return { id: updatedDoc.id, ...updatedData } as WaterHistory;
}

// Eliminar historial de agua
export async function deleteWaterHistory(id: string): Promise<boolean> {
  const waterRef = db.collection(WATER_HISTORY_COLLECTION).doc(id);
  const doc = await waterRef.get();
  if (!doc.exists) return false;

  await waterRef.delete();
  return true;
}
