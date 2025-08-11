// src/models/SleepHistory.ts

export type SleepQuality = 'poor' | 'fair' | 'good';

export interface SleepHistory {
  id: string;
  userId: string;
  date: string;
  duration: number;
  quality: SleepQuality;
  notes: string;
}
