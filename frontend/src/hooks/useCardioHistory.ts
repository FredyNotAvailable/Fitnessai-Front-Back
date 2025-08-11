// src/hooks/useCardioHistory.ts

import { useState, useEffect, useCallback } from 'react';
import type { CardioHistory } from '../models/CardioHistory';
import {
  createCardioHistory,
  getCardioHistory,
  getCardioHistoriesByUser,
  getCardioHistoryByUserAndDate,
  updateCardioHistory,
  deleteCardioHistory,
} from '../services/cardioHistoryService';

// Hook para obtener historial único por ID
export function useCardioHistoryById(id?: string) {
  const [cardioHistory, setCardioHistory] = useState<CardioHistory | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchCardioHistory() {
      if (!id) {
        if (isMounted) {
          setCardioHistory(null);
          setError(null);
          setLoading(false);
        }
        return;
      }
      setLoading(true);
      try {
        const data = await getCardioHistory(id);
        if (isMounted) {
          setCardioHistory(data);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Error al obtener historial de cardio';
          setError(message);
          setCardioHistory(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchCardioHistory();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const create = useCallback(async (data: Omit<CardioHistory, 'id'>) => {
    setLoading(true);
    try {
      const newHistory = await createCardioHistory(data);
      setCardioHistory(newHistory);
      setError(null);
      return newHistory;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al crear historial de cardio';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(
    async (data: Partial<Omit<CardioHistory, 'id'>>) => {
      if (!cardioHistory?.id) {
        throw new Error('No hay historial de cardio cargado para actualizar');
      }
      setLoading(true);
      try {
        const updated = await updateCardioHistory(cardioHistory.id, data);
        setCardioHistory(updated);
        setError(null);
        return updated;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error al actualizar historial de cardio';
        setError(message);
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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al eliminar historial de cardio';
      setError(message);
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

// Hook para obtener todos los historiales de un usuario
export function useCardioHistoriesByUser(userId?: string) {
  const [histories, setHistories] = useState<CardioHistory[]>([]);
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
        const data = await getCardioHistoriesByUser(userId);
        if (isMounted) {
          setHistories(data);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Error al obtener historiales de cardio';
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

// Hook para obtener historial único por userId y fecha, con crear y actualizar
export function useCardioHistoryByUserAndDate(userId?: string, date?: string) {
  const [cardioHistory, setCardioHistory] = useState<CardioHistory | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchByUserAndDate() {
      if (!userId || !date) {
        if (isMounted) {
          setCardioHistory(null);
          setError(null);
          setLoading(false);
        }
        return;
      }
      setLoading(true);
      try {
        const data = await getCardioHistoryByUserAndDate(userId, date);
        if (isMounted) {
          setCardioHistory(data);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Error al obtener historial de cardio por usuario y fecha';
          setError(message);
          setCardioHistory(null);
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

  const create = useCallback(async (data: Omit<CardioHistory, 'id'>) => {
    setLoading(true);
    try {
      const newHistory = await createCardioHistory(data);
      setCardioHistory(newHistory);
      setError(null);
      return newHistory;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al crear historial de cardio';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (data: Partial<Omit<CardioHistory, 'id'>>) => {
    if (!cardioHistory?.id) {
      throw new Error('No hay historial de cardio cargado para actualizar');
    }
    setLoading(true);
    try {
      const updated = await updateCardioHistory(cardioHistory.id, data);
      setCardioHistory(updated);
      setError(null);
      return updated;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al actualizar historial de cardio';
      setError(message);
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
  };
}
