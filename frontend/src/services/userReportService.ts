import type { UserReport } from '../models/UserReport';
import { apiRequest } from './apiClient';

const BASE_PATH = '/report';

/**
 * Obtener el reporte completo de un usuario
 * @param userId - ID del usuario
 * @returns UserReport
 */
export async function getUserReport(userId: string): Promise<UserReport | null> {
  return apiRequest<UserReport | null>(`${BASE_PATH}/${userId}`, {
    method: 'GET',
  });
}
