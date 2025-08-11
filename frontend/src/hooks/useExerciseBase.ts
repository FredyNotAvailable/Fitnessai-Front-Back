// src/hooks/useExerciseBase.ts
import { useState, useEffect, useCallback } from 'react';
import type { ExerciseBase } from '../models/ExerciseBase';
import {
  createExerciseBase,
  getExerciseBase,
  updateExerciseBase,
  deleteExerciseBase,
  getAllExerciseBases, // <-- importa esta función nueva
} from '../services/exerciseBaseService';

// Hook para un ejercicio base individual por id
export function useExerciseBase(id?: string) {
  const [exerciseBase, setExerciseBase] = useState<ExerciseBase | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

// Nuevo hook para obtener todos los ejercicios base
export function useExerciseBases() {
  const [exerciseBases, setExerciseBases] = useState<ExerciseBase[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getAllExerciseBases()
      .then((data) => {
        setExerciseBases(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || 'Error al obtener los ejercicios base');
        setExerciseBases([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { exerciseBases, loading, error };
}
