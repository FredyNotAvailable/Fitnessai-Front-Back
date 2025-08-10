// src/services/weightHistoryService.ts

import type { WeightHistory } from '../models/WeightHistory';
import { apiRequest } from './apiClient';

export async function createWeightHistory(data: Omit<WeightHistory, 'id'>): Promise<WeightHistory> {
  return apiRequest<WeightHistory>('/weight-history/create', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getWeightHistory(id: string): Promise<WeightHistory | null> {
  return apiRequest<WeightHistory>(`/weight-history/${id}`, {
    method: 'GET',
  });
}

export async function getWeightHistoriesByUser(userId: string): Promise<WeightHistory[]> {
  return apiRequest<WeightHistory[]>(`/weight-history/user/${userId}`, {
    method: 'GET',
  });
}

export async function updateWeightHistory(id: string, data: Partial<Omit<WeightHistory, 'id'>>): Promise<WeightHistory> {
  return apiRequest<WeightHistory>(`/weight-history/update/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteWeightHistory(id: string): Promise<void> {
  await apiRequest<void>(`/weight-history/delete/${id}`, {
    method: 'DELETE',
  });
}
