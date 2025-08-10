// src/hooks/useSleepHistory.ts

import { useState, useEffect, useCallback } from 'react';
import type { SleepHistory } from '../models/SleepHistory';
import {
  createSleepHistory,
  getSleepHistory,
  getSleepHistoriesByUser,
  updateSleepHistory,
  deleteSleepHistory,
} from '../services/sleepHistoryService';

export function useSleepHistoryById(id?: string) {
  const [sleepHistory, setSleepHistory] = useState<SleepHistory | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setSleepHistory(null);
      return;
    }
    setLoading(true);
    getSleepHistory(id)
      .then(data => {
        setSleepHistory(data);
        setError(null);
      })
      .catch(err => {
        setError(err.message || 'Error al obtener historial de sueño');
        setSleepHistory(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const create = useCallback(async (data: Omit<SleepHistory, 'id'>) => {
    setLoading(true);
    try {
      const newHistory = await createSleepHistory(data);
      setSleepHistory(newHistory);
      setError(null);
      return newHistory;
    } catch (err: any) {
      setError(err.message || 'Error al crear historial de sueño');
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
      } catch (err: any) {
        setError(err.message || 'Error al actualizar historial de sueño');
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
    } catch (err: any) {
      setError(err.message || 'Error al eliminar historial de sueño');
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
    if (!userId) {
      setHistories([]);
      return;
    }
    setLoading(true);
    getSleepHistoriesByUser(userId)
      .then(data => {
        setHistories(data);
        setError(null);
      })
      .catch(err => {
        setError(err.message || 'Error al obtener historiales de sueño');
        setHistories([]);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return { histories, loading, error };
}
