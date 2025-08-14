// src/models/ReportModels.ts

// --- Perfil ---
export enum Gender { Male = 'male', Female = 'female', Other = 'other', Unknown = '' }
export enum Goal { LoseWeight = 'lose weight', GainMuscle = 'gain muscle', Maintain = 'maintain', Unknown = '' }
export enum ExperienceLevel { Beginner = 'beginner', Intermediate = 'intermediate', Advanced = 'advanced', Unknown = '' }
export enum WeekDay { Monday = 'Monday', Tuesday = 'Tuesday', Wednesday = 'Wednesday', Thursday = 'Thursday', Friday = 'Friday', Saturday = 'Saturday', Sunday = 'Sunday' }

export interface ProfileReport {
  userId: string;
  gender: Gender;
  trainingDays: WeekDay[];
  weight: number;     // kg
  height: number;     // cm
  birthdate: string;  // ISO
  goal: Goal;
  experience: ExperienceLevel;
}

// --- Cardio ---
export enum CardioCategory { Run = 'run', Walk = 'walk', Bike = 'bike' }

export interface CardioHistoryReport {
  id: string;
  userId: string;
  date: string;
  category: CardioCategory;
  duration: number;   // minutos
  distance: number;   // km
  notes?: string;
}

// --- Ejercicios ---
export interface ExerciseHistoryReport {
  id: string;
  userId: string;
  date: string;
  sets: number;
  reps: number;
  weight: number;
  baseId?: string;    // referencia original
  name?: string;      // nombre real para el reporte
  notes?: string;
}

// --- Rutinas ---
export interface ExerciseRoutineReport {
  exerciseId?: string; // baseId original
  name?: string;       // nombre real
  sets: number;
  reps: number;
  weight: number;
}

export interface RoutineDayReport {
  id: string;
  userId: string;
  day: WeekDay;
  exercises: ExerciseRoutineReport[];
  duration: number;
  notes?: string;
}

// --- Sueño ---
export enum SleepQuality { Poor = 'poor', Fair = 'fair', Good = 'good' }

export interface SleepHistoryReport {
  id: string;
  userId: string;
  date: string;
  duration: number; // horas
  quality: SleepQuality;
  notes?: string;
}

// --- Agua ---
export interface WaterHistoryReport {
  id: string;
  userId: string;
  date: string;
  liters: number;
  notes?: string;
}

// --- Peso ---
export interface WeightHistoryReport {
  id: string;
  userId: string;
  date: string;
  weight: number;
  notes?: string;
}

// --- Reporte completo ---
export interface UserReportData {
  profile: ProfileReport;
  cardioHistory: CardioHistoryReport[];
  exerciseHistoryArray: ExerciseHistoryReport[];
  routineDays: RoutineDayReport[];
  sleepHistory: SleepHistoryReport[];
  waterHistory: WaterHistoryReport[];
  weightHistory: WeightHistoryReport[];
}
