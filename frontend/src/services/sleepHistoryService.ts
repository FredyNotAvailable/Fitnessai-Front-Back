// src/service/sleepHistoryService.ts

import type { SleepHistory } from '../models/SleepHistory';
import { apiRequest } from './apiClient';

const BASE_PATH = '/sleep-history';

export async function createSleepHistory(data: Omit<SleepHistory, 'id'>): Promise<SleepHistory> {
  return apiRequest<SleepHistory>(`${BASE_PATH}/create`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getSleepHistory(id: string): Promise<SleepHistory | null> {
  return apiRequest<SleepHistory>(`${BASE_PATH}/${id}`, {
    method: 'GET',
  });
}

export async function getSleepHistoriesByUser(userId: string): Promise<SleepHistory[]> {
  return apiRequest<SleepHistory[]>(`${BASE_PATH}/user/${userId}`, {
    method: 'GET',
  });
}

export async function getSleepHistoryByUserAndDate(userId: string, date: string): Promise<SleepHistory | null> {
  return apiRequest<SleepHistory | null>(`${BASE_PATH}/user/${userId}/date/${date}`, {
    method: 'GET',
  });
}


export async function updateSleepHistory(id: string, data: Partial<Omit<SleepHistory, 'id'>>): Promise<SleepHistory> {
  return apiRequest<SleepHistory>(`${BASE_PATH}/update/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteSleepHistory(id: string): Promise<void> {
  await apiRequest<void>(`${BASE_PATH}/delete/${id}`, {
    method: 'DELETE',
  });
}
