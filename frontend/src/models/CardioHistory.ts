// src/models/CardioHistory.ts

// Tipo para categorías/tipos de cardio
export type Category = 'run' | 'walk' | 'bike';

// Interface para el historial de cardio
export interface CardioHistory {
  id: string;         // Unique ID
  userId: string;     // User ID
  date: string;       // ISO date string, e.g., '2025-08-10'
  category: Category; // Tipo de cardio (run, walk, etc.)
  duration: number;   // Duración en minutos
  distance: number;   // Distancia recorrida (km, metros, etc.)
  notes: string;     // Notas opcionales
}
