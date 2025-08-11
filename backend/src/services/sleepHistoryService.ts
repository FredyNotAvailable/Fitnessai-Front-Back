import { db } from '../config/firebase';
import { SleepHistory, SleepQuality } from '../models/SleepHistory';

const SLEEP_HISTORY_COLLECTION = 'sleepHistories';

// Claves válidas para SleepHistory excepto 'id'
function sanitizeSleepHistoryData(
  data: Partial<SleepHistory>
): Omit<Partial<SleepHistory>, 'id'> {
  const allowedKeys = Object.keys({
    userId: '',
    date: '',
    duration: 0,
    quality: 'poor' as SleepQuality, // tipo string union
    notes: '',
  }) as (keyof SleepHistory)[];

  return Object.fromEntries(
    Object.entries(data).filter(([key]) =>
      allowedKeys.includes(key as keyof SleepHistory)
    )
  ) as Omit<Partial<SleepHistory>, 'id'>;
}

// Crear registro de historial de sueño
export async function createSleepHistory(
  data: Omit<SleepHistory, 'id'>
): Promise<SleepHistory> {
  const targetDate = data.date;

  const querySnapshot = await db.collection(SLEEP_HISTORY_COLLECTION)
    .where('userId', '==', data.userId)
    .where('date', '==', targetDate)
    .limit(1)
    .get();

  if (!querySnapshot.empty) {
    // Ya existe historial para ese día, actualiza el registro
    const doc = querySnapshot.docs[0];
    const updatedData = sanitizeSleepHistoryData(data);
    if (!updatedData.notes) {
      updatedData.notes = '';
    }

    await doc.ref.update(updatedData);
    return { id: doc.id, ...updatedData } as SleepHistory;
  }

  // No existe, crea nuevo documento
  const sleepRef = db.collection(SLEEP_HISTORY_COLLECTION).doc();
  const sleepData = sanitizeSleepHistoryData(data);
  if (!sleepData.notes) {
    sleepData.notes = '';
  }
  await sleepRef.set(sleepData);
  return { id: sleepRef.id, ...sleepData } as SleepHistory;
}


// Obtener historial de sueño por ID
export async function getSleepHistory(
  id: string
): Promise<SleepHistory | null> {
  const doc = await db.collection(SLEEP_HISTORY_COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  const data = doc.data()!;
  return { id: doc.id, ...data } as SleepHistory;
}

// Obtener todos los historiales de sueño de un usuario, ordenados por fecha descendente
export async function getSleepHistoriesByUser(
  userId: string
): Promise<SleepHistory[]> {
  const querySnapshot = await db
    .collection(SLEEP_HISTORY_COLLECTION)
    .where('userId', '==', userId)
    .orderBy('date', 'desc')
    .get();

  const histories: SleepHistory[] = [];
  querySnapshot.forEach(doc => {
    const data = doc.data()!;
    histories.push({ id: doc.id, ...data } as SleepHistory);
  });

  return histories;
}

// Obtener historial de sueño por userId y date exacto
export async function getSleepHistoryByUserAndDate(
  userId: string,
  date: string
): Promise<SleepHistory | null> {
  const querySnapshot = await db
    .collection(SLEEP_HISTORY_COLLECTION)
    .where('userId', '==', userId)
    .where('date', '==', date)
    .limit(1)
    .get();

  if (querySnapshot.empty) return null;

  const doc = querySnapshot.docs[0];
  const data = doc.data()!;
  return { id: doc.id, ...data } as SleepHistory;
}

// Actualizar historial de sueño
export async function updateSleepHistory(
  id: string,
  data: Partial<SleepHistory>
): Promise<SleepHistory | null> {
  const sleepRef = db.collection(SLEEP_HISTORY_COLLECTION).doc(id);
  const doc = await sleepRef.get();
  if (!doc.exists) return null;

  const sleepData = sanitizeSleepHistoryData(data);
  if (sleepData.notes === undefined) {
    sleepData.notes = '';
  }
  await sleepRef.update(sleepData);

  const updatedDoc = await sleepRef.get();
  const updatedData = updatedDoc.data()!;
  return { id: updatedDoc.id, ...updatedData } as SleepHistory;
}

// Eliminar historial de sueño
export async function deleteSleepHistory(id: string): Promise<boolean> {
  const sleepRef = db.collection(SLEEP_HISTORY_COLLECTION).doc(id);
  const doc = await sleepRef.get();
  if (!doc.exists) return false;

  await sleepRef.delete();
  return true;
}
