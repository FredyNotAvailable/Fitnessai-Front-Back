// src/hooks/useExerciseHistory.ts
import { useState, useEffect, useCallback } from 'react';
import type { ExerciseHistory } from '../models/ExerciseHistory';
import {
  createExerciseHistory,
  getExerciseHistory,
  updateExerciseHistory,
  deleteExerciseHistory,
  getExerciseHistoriesByUser,
} from '../services/exerciseHistoryService';

export function useExerciseHistory(id?: string) {
  const [exerciseHistory, setExerciseHistory] = useState<ExerciseHistory | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar historial si se proporciona id
  useEffect(() => {
    if (!id) {
      setExerciseHistory(null);
      return;
    }
    setLoading(true);
    getExerciseHistory(id)
      .then((data) => {
        setExerciseHistory(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || 'Error al obtener el historial de ejercicio');
        setExerciseHistory(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Crear historial
  const create = useCallback(async (data: Omit<ExerciseHistory, 'id'>) => {
    setLoading(true);
    try {
      const newHistory = await createExerciseHistory(data);
      setExerciseHistory(newHistory);
      setError(null);
      return newHistory;
    } catch (err: any) {
      setError(err.message || 'Error al crear el historial de ejercicio');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar historial
  const update = useCallback(
    async (data: Partial<Omit<ExerciseHistory, 'id'>>) => {
      if (!exerciseHistory?.id) {
        throw new Error('No hay historial cargado para actualizar');
      }
      setLoading(true);
      try {
        const updated = await updateExerciseHistory(exerciseHistory.id, data);
        setExerciseHistory(updated);
        setError(null);
        return updated;
      } catch (err: any) {
        setError(err.message || 'Error al actualizar el historial de ejercicio');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [exerciseHistory?.id]
  );

  // Eliminar historial
  const remove = useCallback(async () => {
    if (!exerciseHistory?.id) {
      throw new Error('No hay historial cargado para eliminar');
    }
    setLoading(true);
    try {
      await deleteExerciseHistory(exerciseHistory.id);
      setExerciseHistory(null);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al eliminar el historial de ejercicio');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [exerciseHistory?.id]);

  return {
    exerciseHistory,
    loading,
    error,
    create,
    update,
    remove,
  };
}

// Hook para obtener todos los historiales de un usuario
export function useExerciseHistoriesByUser(userId?: string) {
  const [histories, setHistories] = useState<ExerciseHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setHistories([]);
      return;
    }
    setLoading(true);
    getExerciseHistoriesByUser(userId)
      .then(data => {
        setHistories(data);
        setError(null);
      })
      .catch(err => {
        setError(err.message || 'Error al obtener historiales de ejercicios');
        setHistories([]);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return { histories, loading, error };
}
