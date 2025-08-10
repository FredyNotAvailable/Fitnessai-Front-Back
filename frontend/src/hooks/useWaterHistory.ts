// src/hooks/useWaterHistory.ts

import { useState, useEffect, useCallback } from 'react';
import type { WaterHistory } from '../models/WaterHistory';
import {
  createWaterHistory,
  getWaterHistory,
  getWaterHistoriesByUser,
  updateWaterHistory,
  deleteWaterHistory,
} from '../services/waterHistoryService';

export function useWaterHistory(id?: string) {
  const [waterHistory, setWaterHistory] = useState<WaterHistory | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setWaterHistory(null);
      return;
    }
    setLoading(true);
    getWaterHistory(id)
      .then(data => {
        setWaterHistory(data);
        setError(null);
      })
      .catch(err => {
        setError(err.message || 'Error al obtener historial de agua');
        setWaterHistory(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const create = useCallback(async (data: Omit<WaterHistory, 'id'>) => {
    setLoading(true);
    try {
      const newHistory = await createWaterHistory(data);
      setWaterHistory(newHistory);
      setError(null);
      return newHistory;
    } catch (err: any) {
      setError(err.message || 'Error al crear historial de agua');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(
    async (data: Partial<Omit<WaterHistory, 'id'>>) => {
      if (!waterHistory?.id) {
        throw new Error('No hay historial de agua cargado para actualizar');
      }
      setLoading(true);
      try {
        const updated = await updateWaterHistory(waterHistory.id, data);
        setWaterHistory(updated);
        setError(null);
        return updated;
      } catch (err: any) {
        setError(err.message || 'Error al actualizar historial de agua');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [waterHistory?.id]
  );

  const remove = useCallback(async () => {
    if (!waterHistory?.id) {
      throw new Error('No hay historial de agua cargado para eliminar');
    }
    setLoading(true);
    try {
      await deleteWaterHistory(waterHistory.id);
      setWaterHistory(null);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al eliminar historial de agua');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [waterHistory?.id]);

  return {
    waterHistory,
    loading,
    error,
    create,
    update,
    remove,
  };
}

export function useWaterHistoriesByUser(userId?: string) {
  const [histories, setHistories] = useState<WaterHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setHistories([]);
      return;
    }
    setLoading(true);
    getWaterHistoriesByUser(userId)
      .then(data => {
        setHistories(data);
        setError(null);
      })
      .catch(err => {
        setError(err.message || 'Error al obtener historiales de agua');
        setHistories([]);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return { histories, loading, error };
}
