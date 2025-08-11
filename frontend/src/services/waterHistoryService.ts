// src/services/waterHistoryService.ts

import type { WaterHistory } from '../models/WaterHistory';
import { apiRequest } from './apiClient';

const BASE_PATH = '/water-history';

export async function createWaterHistory(data: Omit<WaterHistory, 'id'>): Promise<WaterHistory> {
  return apiRequest<WaterHistory>(`${BASE_PATH}/create`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getWaterHistory(id: string): Promise<WaterHistory | null> {
  return apiRequest<WaterHistory>(`${BASE_PATH}/${id}`, {
    method: 'GET',
  });
}

export async function getWaterHistoriesByUser(userId: string): Promise<WaterHistory[]> {
  return apiRequest<WaterHistory[]>(`${BASE_PATH}/user/${userId}`, {
    method: 'GET',
  });
}

export async function getWaterHistoryByUserAndDate(userId: string, date: string): Promise<WaterHistory | null> {
  return apiRequest<WaterHistory | null>(`${BASE_PATH}/user/${userId}/date/${date}`, {
    method: 'GET',
  });
}

export async function updateWaterHistory(id: string, data: Partial<Omit<WaterHistory, 'id'>>): Promise<WaterHistory> {
  return apiRequest<WaterHistory>(`${BASE_PATH}/update/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteWaterHistory(id: string): Promise<void> {
  await apiRequest<void>(`${BASE_PATH}/delete/${id}`, {
    method: 'DELETE',
  });
}
