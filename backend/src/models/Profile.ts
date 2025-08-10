// src/models/Profile.ts

export enum Gender { Male = 'male', Female = 'female', Other = 'other', Unknown = '' }

export enum Goal { LoseWeight = 'lose weight', GainMuscle = 'gain muscle', Maintain = 'maintain', Unknown = '' }

export enum ExperienceLevel { Beginner = 'beginner', Intermediate = 'intermediate', Advanced = 'advanced', Unknown = '' }

export enum WeekDay { Monday = 'Monday', Tuesday = 'Tuesday', Wednesday = 'Wednesday', Thursday = 'Thursday', Friday = 'Friday', Saturday = 'Saturday', Sunday = 'Sunday' }

export interface Profile {
  userId: string;
  gender: Gender;               // Genero
  trainingDays: string[];       // Ejemplo: [WeekDay.Monday, WeekDay.Wednesday]
  weight: number;               // en kg
  height: number;               // en cm
  birthdate: string;            // ISO date string
  goal: Goal;                   // Objetivo
  experience: ExperienceLevel;  // Experiencia
}
