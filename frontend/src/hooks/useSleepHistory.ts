import { useState, useEffect, useCallback } from 'react';
import type { SleepHistory } from '../models/SleepHistory';
import {
  createSleepHistory,
  getSleepHistory,
  getSleepHistoriesByUser,
  getSleepHistoryByUserAndDate,
  updateSleepHistory,
  deleteSleepHistory,
} from '../services/sleepHistoryService';

export function useSleepHistoryById(id?: string) {
  const [sleepHistory, setSleepHistory] = useState<SleepHistory | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchSleepHistory() {
      if (!id) {
        if (isMounted) {
          setSleepHistory(null);
          setError(null);
          setLoading(false);
        }
        return;
      }
      setLoading(true);
      try {
        const data = await getSleepHistory(id);
        if (isMounted) {
          setSleepHistory(data);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Error al obtener historial de sueño';
          setError(message);
          setSleepHistory(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchSleepHistory();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const create = useCallback(async (data: Omit<SleepHistory, 'id'>) => {
    setLoading(true);
    try {
      const newHistory = await createSleepHistory(data);
      setSleepHistory(newHistory);
      setError(null);
      return newHistory;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al crear historial de sueño';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(
    async (data: Partial<Omit<SleepHistory, 'id'>>) => {
      if (!sleepHistory?.id) {
        throw new Error('No hay historial de sueño cargado para actualizar');
      }
      setLoading(true);
      try {
        const updated = await updateSleepHistory(sleepHistory.id, data);
        setSleepHistory(updated);
        setError(null);
        return updated;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error al actualizar historial de sueño';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [sleepHistory?.id]
  );

  const remove = useCallback(async () => {
    if (!sleepHistory?.id) {
      throw new Error('No hay historial de sueño cargado para eliminar');
    }
    setLoading(true);
    try {
      await deleteSleepHistory(sleepHistory.id);
      setSleepHistory(null);
      setError(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al eliminar historial de sueño';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [sleepHistory?.id]);

  return {
    sleepHistory,
    loading,
    error,
    create,
    update,
    remove,
  };
}

export function useSleepHistoriesByUser(userId?: string) {
  const [histories, setHistories] = useState<SleepHistory[]>([]);
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
        const data = await getSleepHistoriesByUser(userId);
        if (isMounted) {
          setHistories(data);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Error al obtener historiales de sueño';
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
  }, [userId]);

  return { histories, loading, error };
}

// NUEVO: Hook para obtener SleepHistory por userId y date
export function useSleepHistoryByUserAndDate(userId?: string, date?: string) {
  const [sleepHistory, setSleepHistory] = useState<SleepHistory | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchByUserAndDate() {
      if (!userId || !date) {
        if (isMounted) {
          setSleepHistory(null);
          setError(null);
          setLoading(false);
        }
        return;
      }
      setLoading(true);
      try {
        const data = await getSleepHistoryByUserAndDate(userId, date);
        if (isMounted) {
          setSleepHistory(data);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Error al obtener historial de sueño por usuario y fecha';
          setError(message);
          setSleepHistory(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchByUserAndDate();

    return () => {
      isMounted = false;
    };
  }, [userId, date]);

  const create = useCallback(async (data: Omit<SleepHistory, 'id'>) => {
    setLoading(true);
    try {
      const newHistory = await createSleepHistory(data);
      setSleepHistory(newHistory);
      setError(null);
      return newHistory;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al crear historial de sueño';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(
    async (data: Partial<Omit<SleepHistory, 'id'>>) => {
      if (!sleepHistory?.id) {
        throw new Error('No hay historial de sueño cargado para actualizar');
      }
      setLoading(true);
      try {
        const updated = await updateSleepHistory(sleepHistory.id, data);
        setSleepHistory(updated);
        setError(null);
        return updated;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error al actualizar historial de sueño';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [sleepHistory?.id]
  );

  return { sleepHistory, loading, error, create, update };
}
