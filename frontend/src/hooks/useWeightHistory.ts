// src/hooks/useWeightHistory.ts

import { useState, useEffect, useCallback } from 'react';
import type { WeightHistory } from '../models/WeightHistory';
import {
  createWeightHistory,
  getWeightHistory,
  getWeightHistoriesByUser,
  updateWeightHistory,
  deleteWeightHistory,
} from '../services/weightHistoryService';

export function useWeightHistory(id?: string) {
  const [weightHistory, setWeightHistory] = useState<WeightHistory | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setWeightHistory(null);
      return;
    }
    setLoading(true);
    getWeightHistory(id)
      .then(data => {
        setWeightHistory(data);
        setError(null);
      })
      .catch(err => {
        setError(err.message || 'Error al obtener historial de peso');
        setWeightHistory(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const create = useCallback(async (data: Omit<WeightHistory, 'id'>) => {
    setLoading(true);
    try {
      const newHistory = await createWeightHistory(data);
      setWeightHistory(newHistory);
      setError(null);
      return newHistory;
    } catch (err: any) {
      setError(err.message || 'Error al crear historial de peso');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(
    async (data: Partial<Omit<WeightHistory, 'id'>>) => {
      if (!weightHistory?.id) {
        throw new Error('No hay historial de peso cargado para actualizar');
      }
      setLoading(true);
      try {
        const updated = await updateWeightHistory(weightHistory.id, data);
        setWeightHistory(updated);
        setError(null);
        return updated;
      } catch (err: any) {
        setError(err.message || 'Error al actualizar historial de peso');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [weightHistory?.id]
  );

  const remove = useCallback(async () => {
    if (!weightHistory?.id) {
      throw new Error('No hay historial de peso cargado para eliminar');
    }
    setLoading(true);
    try {
      await deleteWeightHistory(weightHistory.id);
      setWeightHistory(null);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al eliminar historial de peso');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [weightHistory?.id]);

  return {
    weightHistory,
    loading,
    error,
    create,
    update,
    remove,
  };
}

export function useWeightHistoriesByUser(userId?: string) {
  const [histories, setHistories] = useState<WeightHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setHistories([]);
      return;
    }
    setLoading(true);
    getWeightHistoriesByUser(userId)
      .then(data => {
        setHistories(data);
        setError(null);
      })
      .catch(err => {
        setError(err.message || 'Error al obtener historiales de peso');
        setHistories([]);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return { histories, loading, error };
}
