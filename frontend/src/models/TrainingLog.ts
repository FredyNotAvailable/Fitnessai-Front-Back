// src/models/TrainingLog.ts

export interface TrainingLog {
  id: string;
  userId: string;
  date: string;       // ISO date string
  duration: number;   // duración del entrenamiento en minutos (o la unidad que uses)
  completed: boolean; // si el entrenamiento fue completado o no
  notes?: string;     // notas opcionales, pero siempre se guarda aunque esté vacío
}
