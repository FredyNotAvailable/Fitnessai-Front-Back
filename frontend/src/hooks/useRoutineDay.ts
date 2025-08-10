// src/hooks/useRoutineDay.ts

import { useState, useEffect, useCallback } from 'react';
import type { RoutineDay } from '../models/RoutineDay';
import {
  createRoutineDay,
  getRoutineDay,
  getRoutineDaysByUserId,
  updateRoutineDay,
  deleteRoutineDay,
  generateWeeklyRoutine,
} from '../services/routineDayService';

export function useRoutineDay(id?: string) {
  const [routineDay, setRoutineDay] = useState<RoutineDay | null>(null);
  const [routineDaysByUser, setRoutineDaysByUser] = useState<RoutineDay[]>([]);
  const [weeklyRoutine, setWeeklyRoutine] = useState<RoutineDay[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar RoutineDay por ID
  useEffect(() => {
    if (!id) {
      setRoutineDay(null);
      return;
    }
    setLoading(true);
    getRoutineDay(id)
      .then((data) => {
        setRoutineDay(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || 'Error al obtener la rutina del día');
        setRoutineDay(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Cargar RoutineDays por userId
  const loadByUserId = useCallback(async (userId: string) => {
    setLoading(true);
    try {
      const days = await getRoutineDaysByUserId(userId);
      setRoutineDaysByUser(days);
      setError(null);
      return days;
    } catch (err: any) {
      setError(err.message || 'Error al obtener rutinas por usuario');
      setRoutineDaysByUser([]);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear RoutineDay
  const create = useCallback(async (data: Omit<RoutineDay, 'id'>) => {
    setLoading(true);
    try {
      const newRoutineDay = await createRoutineDay(data);
      setRoutineDay(newRoutineDay);
      setError(null);
      return newRoutineDay;
    } catch (err: any) {
      setError(err.message || 'Error al crear la rutina del día');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar RoutineDay
  const update = useCallback(
    async (data: Partial<Omit<RoutineDay, 'id'>>) => {
      if (!routineDay?.id) {
        throw new Error('No hay rutina del día cargada para actualizar');
      }
      setLoading(true);
      try {
        const updated = await updateRoutineDay(routineDay.id, data);
        setRoutineDay(updated);
        setError(null);
        return updated;
      } catch (err: any) {
        setError(err.message || 'Error al actualizar la rutina del día');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [routineDay?.id]
  );

  // Eliminar RoutineDay
  const remove = useCallback(async () => {
    if (!routineDay?.id) {
      throw new Error('No hay rutina del día cargada para eliminar');
    }
    setLoading(true);
    try {
      await deleteRoutineDay(routineDay.id);
      setRoutineDay(null);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al eliminar la rutina del día');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [routineDay?.id]);

  // Generar rutina semanal, ahora con profile obligatorio
  const generateWeekly = useCallback(async (userId: string) => {
    setLoading(true);
    try {
      const generatedRoutine = await generateWeeklyRoutine(userId);
      setWeeklyRoutine(generatedRoutine);
      setError(null);
      return generatedRoutine;
    } catch (err: any) {
      setError(err.message || 'Error al generar la rutina semanal');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    routineDay,
    routineDaysByUser,
    weeklyRoutine,
    loading,
    error,
    create,
    update,
    remove,
    loadByUserId,
    generateWeekly,
  };
}
