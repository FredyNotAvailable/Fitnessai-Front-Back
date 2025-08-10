// src/models/Profile.ts

export type Gender = 'male' | 'female' | 'other' | '';

export type Goal = 'lose weight' | 'gain muscle' | 'maintain' | '';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced' | '';

export type WeekDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface Profile {
  userId: string;
  gender: Gender;               // Genero
  trainingDays: WeekDay[];       // Ejemplo: [WeekDay.Monday, WeekDay.Wednesday]
  weight: number;               // en kg
  height: number;               // en cm
  birthdate: string;            // ISO date string
  goal: Goal;                   // Objetivo
  experience: ExperienceLevel;  // Experiencia
}
