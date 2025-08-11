// src/services/exerciseHistoryService.ts

import type { ExerciseHistory } from "../models/ExerciseHistory";
import { apiRequest } from './apiClient';

const BASE_PATH = '/exercise-history';

export async function createExerciseHistory(data: Omit<ExerciseHistory, 'id'>): Promise<ExerciseHistory> {
  return apiRequest<ExerciseHistory>(`${BASE_PATH}/create`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getExerciseHistory(id: string): Promise<ExerciseHistory | null> {
  return apiRequest<ExerciseHistory>(`${BASE_PATH}/${id}`, {
    method: 'GET',
  });
}

export async function getExerciseHistoriesByUser(userId: string): Promise<ExerciseHistory[]> {
  return apiRequest<ExerciseHistory[]>(`${BASE_PATH}/user/${userId}`, {
    method: 'GET',
  });
}

export async function getExerciseHistoriesByUserAndDate(userId: string, date: string): Promise<ExerciseHistory[] | null> {
  return apiRequest<ExerciseHistory[] | null>(`${BASE_PATH}/user/${userId}/date/${date}`, {
    method: 'GET',
  });
}

export async function updateExerciseHistory(id: string, data: Partial<Omit<ExerciseHistory, 'id'>>): Promise<ExerciseHistory> {
  return apiRequest<ExerciseHistory>(`${BASE_PATH}/update/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteExerciseHistory(id: string): Promise<void> {
  await apiRequest<void>(`${BASE_PATH}/delete/${id}`, {
    method: 'DELETE',
  });
}
