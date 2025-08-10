// models/RoutineDay.ts

import type { Category } from "./ExerciseBase";

export interface Exercise {
  exerciseBaseId: string;
  sets: number;
  reps: number;
  weight: number;
}

export interface RoutineDay {
  id: string;
  userId: string;
  day: string;
  categories: Category[];
  exercises: Exercise[];
  duration: number;
  notes: string;
}
