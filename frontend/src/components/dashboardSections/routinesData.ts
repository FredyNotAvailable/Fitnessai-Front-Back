import { exercisesBase, type ExerciseBase } from "./exerciseData";

export type Exercise = {
  id: string;      // referencia al ejercicio base
  series: number;
  reps: number | string;
  weight: string;
};

export type RoutineDay = {
  day: string;
  category: string | string[];  // una o varias categorías
  exercises: Exercise[];
  duration: number;
  };

// Helper para obtener datos base de un ejercicio por id
export function getExerciseBaseById(id: string): ExerciseBase | undefined {
  return exercisesBase.find((ex) => ex.id === id);
}

// Ejemplo de rutinas organizadas por día, con categorías múltiples posibles
export const routinesByDay: Record<string, RoutineDay> = {
  Lunes: {
    day: "Lunes",
    category: "Pierna",
    duration: 30,
    exercises: [
      { id: "sentadillas", series: 4, reps: 12, weight: "20 kg" },
      { id: "peso_muerto", series: 3, reps: 10, weight: "30 kg" },
    ],
  },
  Martes: {
    day: "Martes",
    category: ["Pecho", "Brazo"],
    duration: 60,
    exercises: [
      { id: "press_banca", series: 4, reps: 10, weight: "40 kg" },
      { id: "fondos_paralelas", series: 3, reps: "hasta fallo", weight: "sin peso" },
      { id: "curl_biceps", series: 3, reps: 12, weight: "15 kg" },
    ],
  },
  Miércoles: {
    day: "Miércoles",
    category: "Espalda",
    duration: 30,
    exercises: [
      { id: "dominadas", series: 3, reps: 8, weight: "sin peso" },
      { id: "remo_barra", series: 4, reps: 10, weight: "35 kg" },
    ],
  },
  // Añade más días y categorías conforme necesites
};
