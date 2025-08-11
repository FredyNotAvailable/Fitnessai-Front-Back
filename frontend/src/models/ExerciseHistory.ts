// src/models/ExerciseHistory.ts

export interface ExerciseHistory {
  id: string;
  userId: string;
  exerciseBaseId: string;
  date: string;             // ISO date string
  sets: number;
  reps: number;
  weight: number;
  notes: string;
}
