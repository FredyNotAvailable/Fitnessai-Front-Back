// src/models/CardioHistory.ts

// Enum for cardio categories/types
export enum Category {
  Run = 'run',          // Running
  Walk = 'walk',        // Walking
  Bike = 'bike',        // Biking (si quieres agregar más tipos)
}

// Interface for cardio history record
export interface CardioHistory {
  id: string;         // Unique ID
  userId: string;     // User ID
  date: string;       // ISO date string, e.g., '2025-08-10'
  category: Category; // Type of cardio (run, walk, etc.)
  duration: number;   // Duration in minutes
  distance: number;   // Distance covered (km, meters, etc.)
  notes?: string;     // Optional notes
}
