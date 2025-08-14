import { Profile } from './Profile';
import { CardioHistory } from './CardioHistory';
import { ExerciseHistory } from './ExerciseHistory';
import { RoutineDay } from './RoutineDay';
import { SleepHistory } from './SleepHistory';
import { TrainingLog } from './TrainingLog';
import { WaterHistory } from './WaterHistory';
import { WeightHistory } from './WeightHistory';

// Agrupación de ExerciseHistory por fecha
export type ExerciseHistoryByDate = {
  [date: string]: ExerciseHistory[];
};

// Modelo completo del reporte
export interface UserReport {
  profile: Profile;
  cardioHistory: CardioHistory[];
  exerciseHistory: ExerciseHistoryByDate;
  routineDays: RoutineDay[];
  sleepHistory: SleepHistory[];
  waterHistory: WaterHistory[];
  weightHistory: WeightHistory[];
  aiSummary: string; // <-- Agregado, opcional
}
