// src/models/CardioHistory.ts

export interface CardioHistory {
  id: string;
  userId: string;
  date: string;        // ISO date string
  duration: number;    // duración en minutos (o la unidad que uses)
  distance: number;    // distancia recorrida (km, metros, etc.)
  notes: string;      // opcional
}
