// src/services/trainingLogService.ts

import { db } from '../config/firebase';
import { TrainingLog } from '../models/TrainingLog';

const TRAINING_LOG_COLLECTION = 'trainingLogs';

// Filtra solo las claves válidas para TrainingLog, excluyendo 'id'
function sanitizeTrainingLogData(
  data: Partial<TrainingLog>
): Omit<Partial<TrainingLog>, 'id'> {
  const allowedKeys = Object.keys({
    userId: '',
    date: '',
    duration: 0,
    completed: false,
    notes: '',
  }) as (keyof TrainingLog)[];

  return Object.fromEntries(
    Object.entries(data).filter(([key]) =>
      allowedKeys.includes(key as keyof TrainingLog)
    )
  ) as Omit<Partial<TrainingLog>, 'id'>;
}

// Crear registro de training log
export async function createTrainingLog(
  data: Omit<TrainingLog, 'id'>
): Promise<TrainingLog> {
  const logRef = db.collection(TRAINING_LOG_COLLECTION).doc();
  const logData = sanitizeTrainingLogData(data);
  if (logData.notes === undefined) {
    logData.notes = '';
  }
  await logRef.set(logData);
  return { id: logRef.id, ...logData } as TrainingLog;
}

// Obtener training log por ID
export async function getTrainingLog(
  id: string
): Promise<TrainingLog | null> {
  const doc = await db.collection(TRAINING_LOG_COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  const data = doc.data()!;
  return { id: doc.id, ...data } as TrainingLog;
}

// Obtener todos los training logs de un usuario, ordenados por fecha descendente
export async function getTrainingLogsByUser(
  userId: string
): Promise<TrainingLog[]> {
  const querySnapshot = await db
    .collection(TRAINING_LOG_COLLECTION)
    .where('userId', '==', userId)
    .orderBy('date', 'desc')
    .get();

  const logs: TrainingLog[] = [];
  querySnapshot.forEach(doc => {
    const data = doc.data()!;
    logs.push({ id: doc.id, ...data } as TrainingLog);
  });

  return logs;
}

// Actualizar training log
export async function updateTrainingLog(
  id: string,
  data: Partial<TrainingLog>
): Promise<TrainingLog | null> {
  const logRef = db.collection(TRAINING_LOG_COLLECTION).doc(id);
  const doc = await logRef.get();
  if (!doc.exists) return null;

  const logData = sanitizeTrainingLogData(data);
  if (logData.notes === undefined) {
    logData.notes = '';
  }
  await logRef.update(logData);

  const updatedDoc = await logRef.get();
  const updatedData = updatedDoc.data()!;
  return { id: updatedDoc.id, ...updatedData } as TrainingLog;
}

// Eliminar training log
export async function deleteTrainingLog(id: string): Promise<boolean> {
  const logRef = db.collection(TRAINING_LOG_COLLECTION).doc(id);
  const doc = await logRef.get();
  if (!doc.exists) return false;

  await logRef.delete();
  return true;
}
