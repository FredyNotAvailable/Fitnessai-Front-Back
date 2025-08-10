// src/services/trainingLogService.ts

import type { TrainingLog } from '../models/TrainingLog';
import { apiRequest } from './apiClient';

export async function createTrainingLog(data: Omit<TrainingLog, 'id'>): Promise<TrainingLog> {
  return apiRequest<TrainingLog>('/training-log/create', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getTrainingLog(id: string): Promise<TrainingLog | null> {
  return apiRequest<TrainingLog>(`/training-log/${id}`, {
    method: 'GET',
  });
}

export async function getTrainingLogsByUser(userId: string): Promise<TrainingLog[]> {
  return apiRequest<TrainingLog[]>(`/training-log/user/${userId}`, {
    method: 'GET',
  });
}

export async function updateTrainingLog(id: string, data: Partial<Omit<TrainingLog, 'id'>>): Promise<TrainingLog> {
  return apiRequest<TrainingLog>(`/training-log/update/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteTrainingLog(id: string): Promise<void> {
  await apiRequest<void>(`/training-log/delete/${id}`, {
    method: 'DELETE',
  });
}
