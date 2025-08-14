// src/hooks/useExerciseHistory.ts
import { useState, useEffect, useCallback } from 'react';
import type { ExerciseHistory } from '../models/ExerciseHistory';
import {
  createExerciseHistory,
  getExerciseHistory,
  updateExerciseHistory,
  deleteExerciseHistory,
  getExerciseHistoriesByUser,
  getExerciseHistoriesByUserAndDate,
} from '../services/exerciseHistoryService';

// Hook para obtener historial único por ID
export function useExerciseHistoryById(id?: string) {
  const [exerciseHistory, setExerciseHistory] = useState<ExerciseHistory | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchExerciseHistory() {
      if (!id) {
        if (isMounted) {
          setExerciseHistory(null);
          setError(null);
          setLoading(false);
        }
        return;
      }
      setLoading(true);
      try {
        const data = await getExerciseHistory(id);
        if (isMounted) {
          setExerciseHistory(data);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Error al obtener historial de ejercicio';
          setError(message);
          setExerciseHistory(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchExerciseHistory();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const create = useCallback(async (data: Omit<ExerciseHistory, 'id'>) => {
    setLoading(true);
    try {
      const newHistory = await createExerciseHistory(data);
      setExerciseHistory(newHistory);
      setError(null);
      return newHistory;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al crear historial de ejercicio';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

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
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error al actualizar historial de ejercicio';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [exerciseHistory?.id]
  );

  const remove = useCallback(async () => {
    if (!exerciseHistory?.id) {
      throw new Error('No hay historial cargado para eliminar');
    }
    setLoading(true);
    try {
      await deleteExerciseHistory(exerciseHistory.id);
      setExerciseHistory(null);
      setError(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al eliminar historial de ejercicio';
      setError(message);
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
export function useExerciseHistoriesByUser(userId?: string, refreshFlag?: boolean) {
  const [histories, setHistories] = useState<ExerciseHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchHistories() {
      if (!userId) {
        if (isMounted) {
          setHistories([]);
          setError(null);
          setLoading(false);
        }
        return;
      }
      setLoading(true);
      try {
        const data = await getExerciseHistoriesByUser(userId);
        if (isMounted) {
          setHistories(data);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Error al obtener historiales de ejercicio';
          setError(message);
          setHistories([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchHistories();

    return () => {
      isMounted = false;
    };
  }, [userId, refreshFlag]);

  return { histories, loading, error };
}

// Hook para obtener todos los historiales de un usuario en una fecha específica
// Hook para obtener todos los historiales de un usuario en una fecha específica
export function useExerciseHistoriesByUserAndDate(
  userId?: string,
  date?: string,
  refreshFlag?: boolean
) {
  const [histories, setHistories] = useState<ExerciseHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para crear un nuevo historial
  const create = useCallback(
    async (payload: Omit<ExerciseHistory, 'id'>) => {
      setLoading(true);
      try {
        const newHistory = await createExerciseHistory(payload);
        setHistories((prev) => [...prev, newHistory]);
        setError(null);
        return newHistory;
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : 'Error al crear historial de ejercicio';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    let isMounted = true;

    async function fetchHistories() {
      if (!userId || !date) {
        if (isMounted) {
          setHistories([]);
          setError(null);
          setLoading(false);
        }
        return;
      }
      setLoading(true);
      try {
        const data = await getExerciseHistoriesByUserAndDate(userId, date);
        if (isMounted) {
          setHistories(data ?? []);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const message =
            err instanceof Error
              ? err.message
              : 'Error al obtener historiales de ejercicio por fecha';
          setError(message);
          setHistories([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchHistories();

    return () => {
      isMounted = false;
    };
  }, [userId, date, refreshFlag]);

  return { histories, loading, error, create };
}
