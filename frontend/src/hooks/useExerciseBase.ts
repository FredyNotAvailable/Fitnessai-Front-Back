// src/hooks/useExerciseBase.ts
import { useState, useEffect, useCallback } from 'react';
import type { ExerciseBase } from '../models/ExerciseBase';
import {
  createExerciseBase,
  getExerciseBase,
  updateExerciseBase,
  deleteExerciseBase,
} from '../services/exerciseBaseService';

export function useExerciseBase(id?: string) {
  const [exerciseBase, setExerciseBase] = useState<ExerciseBase | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar ejercicio base si se proporciona un id
  useEffect(() => {
    if (!id) {
      setExerciseBase(null);
      return;
    }
    setLoading(true);
    getExerciseBase(id)
      .then((data) => {
        setExerciseBase(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || 'Error al obtener el ejercicio base');
        setExerciseBase(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Crear ejercicio base
  const create = useCallback(async (data: Omit<ExerciseBase, 'id'>) => {
    setLoading(true);
    try {
      const newExerciseBase = await createExerciseBase(data);
      setExerciseBase(newExerciseBase);
      setError(null);
      return newExerciseBase;
    } catch (err: any) {
      setError(err.message || 'Error al crear el ejercicio base');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar ejercicio base
  const update = useCallback(
    async (data: Partial<Omit<ExerciseBase, 'id'>>) => {
      if (!exerciseBase?.id) {
        throw new Error('No hay ejercicio base cargado para actualizar');
      }
      setLoading(true);
      try {
        const updated = await updateExerciseBase(exerciseBase.id, data);
        setExerciseBase(updated);
        setError(null);
        return updated;
      } catch (err: any) {
        setError(err.message || 'Error al actualizar el ejercicio base');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [exerciseBase?.id]
  );

  // Eliminar ejercicio base
  const remove = useCallback(async () => {
    if (!exerciseBase?.id) {
      throw new Error('No hay ejercicio base cargado para eliminar');
    }
    setLoading(true);
    try {
      await deleteExerciseBase(exerciseBase.id);
      setExerciseBase(null);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al eliminar el ejercicio base');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [exerciseBase?.id]);

  return {
    exerciseBase,
    loading,
    error,
    create,
    update,
    remove,
  };
}
