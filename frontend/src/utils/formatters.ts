// src/utils/formatters.ts

import type { Gender, Goal, ExperienceLevel, WeekDay } from "../models/Profile";

export function formatGender(g: Gender): string {
  switch (g) {
    case "male":
      return "Masculino";
    case "female":
      return "Femenino";
    case "other":
      return "Otro";
    case "":
    default:
      return "No especificado";
  }
}

export function formatGoal(g: Goal): string {
  switch (g) {
    case "gain muscle":
      return "Ganar músculo";
    case "lose weight":
      return "Perder peso";
    case "maintain":
      return "Mantener";
    case "":
    default:
      return "No especificado";
  }
}

export function formatExperience(e: ExperienceLevel): string {
  switch (e) {
    case "beginner":
      return "Principiante";
    case "intermediate":
      return "Intermedio";
    case "advanced":
      return "Avanzado";
    case "":
    default:
      return "No especificado";
  }
}

export function formatWeekDays(days: WeekDay[]): string {
  const daysMap: Record<WeekDay, string> = {
    Monday: "Lunes",
    Tuesday: "Martes",
    Wednesday: "Miércoles",
    Thursday: "Jueves",
    Friday: "Viernes",
    Saturday: "Sábado",
    Sunday: "Domingo",
  };

  return days.map((day) => daysMap[day] ?? day).join(", ");
}
