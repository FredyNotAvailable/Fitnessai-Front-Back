// src/service/cardioHistoryService.ts

import type { CardioHistory } from '../models/CardioHistory';
import { apiRequest } from './apiClient';

const BASE_PATH = '/cardio-history';

export async function createCardioHistory(data: Omit<CardioHistory, 'id'>): Promise<CardioHistory> {
  return apiRequest<CardioHistory>(`${BASE_PATH}/create`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getCardioHistory(id: string): Promise<CardioHistory | null> {
  return apiRequest<CardioHistory>(`${BASE_PATH}/${id}`, {
    method: 'GET',
  });
}

export async function getCardioHistoriesByUser(userId: string): Promise<CardioHistory[]> {
  return apiRequest<CardioHistory[]>(`${BASE_PATH}/user/${userId}`, {
    method: 'GET',
  });
}

export async function getCardioHistoryByUserAndDate(userId: string, date: string): Promise<CardioHistory | null> {
  return apiRequest<CardioHistory | null>(`${BASE_PATH}/user/${userId}/date/${date}`, {
    method: 'GET',
  });
}

export async function updateCardioHistory(id: string, data: Partial<Omit<CardioHistory, 'id'>>): Promise<CardioHistory> {
  return apiRequest<CardioHistory>(`${BASE_PATH}/update/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteCardioHistory(id: string): Promise<void> {
  await apiRequest<void>(`${BASE_PATH}/delete/${id}`, {
    method: 'DELETE',
  });
}
