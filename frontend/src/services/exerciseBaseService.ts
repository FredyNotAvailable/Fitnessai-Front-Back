// src/services/exerciseBaseService.ts

import type { ExerciseBase } from "../models/ExerciseBase";
import { apiRequest } from './apiClient';

export async function createExerciseBase(data: Omit<ExerciseBase, 'id'>): Promise<ExerciseBase> {
  return apiRequest<ExerciseBase>('/exercise-base/create', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getExerciseBase(id: string): Promise<ExerciseBase | null> {
  return apiRequest<ExerciseBase>(`/exercise-base/${id}`, {
    method: 'GET',
  });
}

export async function updateExerciseBase(id: string, data: Partial<Omit<ExerciseBase, 'id'>>): Promise<ExerciseBase> {
  return apiRequest<ExerciseBase>(`/exercise-base/update/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteExerciseBase(id: string): Promise<void> {
  await apiRequest<void>(`/exercise-base/delete/${id}`, {
    method: 'DELETE',
  });
}
