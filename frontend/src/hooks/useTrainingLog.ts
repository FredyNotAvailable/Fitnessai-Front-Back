// src/hooks/useTrainingLog.ts
import { useState, useEffect, useCallback } from 'react';
import type { TrainingLog } from '../models/TrainingLog';
import {
  createTrainingLog,
  getTrainingLog,
  getTrainingLogsByUser,
  updateTrainingLog,
  deleteTrainingLog,
} from '../services/trainingLogService';

export function useTrainingLog(id?: string) {
  const [trainingLog, setTrainingLog] = useState<TrainingLog | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setTrainingLog(null);
      return;
    }
    setLoading(true);
    getTrainingLog(id)
      .then(data => {
        setTrainingLog(data);
        setError(null);
      })
      .catch(err => {
        setError(err.message || 'Error al obtener el registro de entrenamiento');
        setTrainingLog(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const create = useCallback(async (data: Omit<TrainingLog, 'id'>) => {
    setLoading(true);
    try {
      const newLog = await createTrainingLog(data);
      setTrainingLog(newLog);
      setError(null);
      return newLog;
    } catch (err: any) {
      setError(err.message || 'Error al crear el registro de entrenamiento');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(
    async (data: Partial<Omit<TrainingLog, 'id'>>) => {
      if (!trainingLog?.id) {
        throw new Error('No hay registro de entrenamiento cargado para actualizar');
      }
      setLoading(true);
      try {
        const updated = await updateTrainingLog(trainingLog.id, data);
        setTrainingLog(updated);
        setError(null);
        return updated;
      } catch (err: any) {
        setError(err.message || 'Error al actualizar el registro de entrenamiento');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [trainingLog?.id]
  );

  const remove = useCallback(async () => {
    if (!trainingLog?.id) {
      throw new Error('No hay registro de entrenamiento cargado para eliminar');
    }
    setLoading(true);
    try {
      await deleteTrainingLog(trainingLog.id);
      setTrainingLog(null);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al eliminar el registro de entrenamiento');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [trainingLog?.id]);

  return {
    trainingLog,
    loading,
    error,
    create,
    update,
    remove,
  };
}

export function useTrainingLogsByUser(userId?: string) {
  const [logs, setLogs] = useState<TrainingLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLogs([]);
      return;
    }
    setLoading(true);
    getTrainingLogsByUser(userId)
      .then(data => {
        setLogs(data);
        setError(null);
      })
      .catch(err => {
        setError(err.message || 'Error al obtener registros de entrenamiento');
        setLogs([]);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return { logs, loading, error };
}
