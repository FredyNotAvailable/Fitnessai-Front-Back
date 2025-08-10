// src/models/WeightHistory.ts

export interface WeightHistory {
  id: string;
  userId: string;
  date: string;   // ISO date string
  weight: number; // peso en la unidad que uses (kg, lbs, etc.)
  notes: string;  // obligatorio, aunque pueda ser cadena vacía
}
