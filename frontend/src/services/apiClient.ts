// src/services/apiClient.ts

import { getAuthToken } from './authService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

export async function apiRequest<T>(path: string, options: RequestInit): Promise<T> {
  const token = await getAuthToken();
  if (!token) throw new Error('No auth token available');

  // Eliminar / final de API_BASE_URL y / inicial de path antes de concatenar
  const url = `${API_BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

  const res = await fetch(url, { ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Error en la solicitud');
  }

  return res.json() as Promise<T>;
}
