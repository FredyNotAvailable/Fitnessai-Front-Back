// src/models/WaterHistory.ts

export interface WaterHistory {
  id: string;
  userId: string;
  date: string;       // ISO date string
  liters: number;
  notes: string;      // obligatorio, aunque pueda ser cadena vacía
}
