// src/models/SleepHistory.ts

export interface SleepHistory {
  id: string;
  userId: string;
  date: string;      // ISO date string
  duration: number;  // duración del sueño en horas o minutos (según definas)
  quality: number;   // calidad del sueño (por ejemplo, escala 1-10)
  notes: string;    // obligatorio, aunque pueda ser cadena vacía
}
