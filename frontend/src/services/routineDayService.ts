// src/services/routineDayService.ts

import type { RoutineDay } from "../models/RoutineDay";
import { apiRequest } from './apiClient';

// Crear un RoutineDay
export async function createRoutineDay(data: Omit<RoutineDay, 'id'>): Promise<RoutineDay> {
  return apiRequest<RoutineDay>('/routine-day/create', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

//

// Generar y guardar rutina semanal para el usuario autenticado
export async function generateWeeklyRoutine(userId: string): Promise<RoutineDay[]> {
  return apiRequest<RoutineDay[]>('/routine-day/generate-rutine-weekly', {
    method: 'POST',
    body: JSON.stringify({ userId }),
  });
}

//

// Obtener un RoutineDay por ID
export async function getRoutineDay(id: string): Promise<RoutineDay | null> {
  return apiRequest<RoutineDay>(`/routine-day/${id}`, {
    method: 'GET',
  });
}

// Obtener RoutineDays por UserId
export async function getRoutineDaysByUserId(userId: string): Promise<RoutineDay[]> {
  return apiRequest<RoutineDay[]>(`/routine-day/user/${userId}`, {
    method: 'GET',
  });
}

// Actualizar un RoutineDay
export async function updateRoutineDay(id: string, data: Partial<Omit<RoutineDay, 'id'>>): Promise<RoutineDay> {
  return apiRequest<RoutineDay>(`/routine-day/update/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// Eliminar un RoutineDay
export async function deleteRoutineDay(id: string): Promise<void> {
  await apiRequest<void>(`/routine-day/delete/${id}`, {
    method: 'DELETE',
  });
}
