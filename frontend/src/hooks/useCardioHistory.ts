// src/hooks/useCardioHistory.ts

import { useState, useEffect, useCallback } from 'react';
import type { CardioHistory } from '../models/CardioHistory';
import { createCardioHistory, getCardioHistory, getCardioHistoriesByUser, updateCardioHistory, deleteCardioHistory, } from '../services/cardioHistoryService';

export function useCardioHistoryById(id?: string) {
  const [cardioHistory, setCardioHistory] = useState<CardioHistory | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setCardioHistory(null);
      return;
    }
    setLoading(true);
    getCardioHistory(id).then(data => { setCardioHistory(data); setError(null);}).catch(err => {
        setError(err.message || 'Error al obtener historial de cardio');
        setCardioHistory(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const create = useCallback(async (data: Omit<CardioHistory, 'id'>) => {
    setLoading(true);
    try {
      const newHistory = await createCardioHistory(data);
      setCardioHistory(newHistory);
      setError(null);
      return newHistory;
    } catch (err: any) {
      setError(err.message || 'Error al crear historial de cardio');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback( async (data: Partial<Omit<CardioHistory, 'id'>>) => {
      if (!cardioHistory?.id) {
        throw new Error('No hay historial de cardio cargado para actualizar');
      }
      setLoading(true);
      try {
        const updated = await updateCardioHistory(cardioHistory.id, data);
        setCardioHistory(updated);
        setError(null);
        return updated;
      } catch (err: any) {
        setError(err.message || 'Error al actualizar historial de cardio');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [cardioHistory?.id]
  );

  const remove = useCallback(async () => {
    if (!cardioHistory?.id) {
      throw new Error('No hay historial de cardio cargado para eliminar');
    }
    setLoading(true);
    try {
      await deleteCardioHistory(cardioHistory.id);
      setCardioHistory(null);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al eliminar historial de cardio');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [cardioHistory?.id]);

  return {
    cardioHistory,
    loading,
    error,
    create,
    update,
    remove,
  };
}

export function useCardioHistoriesByUser(userId?: string) {
  const [histories, setHistories] = useState<CardioHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setHistories([]);
      return;
    }
    setLoading(true);
    getCardioHistoriesByUser(userId)
      .then(data => {
        setHistories(data);
        setError(null);
      })
      .catch(err => {
        setError(err.message || 'Error al obtener historiales de cardio');
        setHistories([]);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return { histories, loading, error };
}
