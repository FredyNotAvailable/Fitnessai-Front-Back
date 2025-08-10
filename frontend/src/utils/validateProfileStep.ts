import type { ProfileData } from "../types/ProfileData";
import type { UserData } from "../types/UserData";

export function validateProfileStep(step: number, data: ProfileData, userData: UserData): string | null {
  switch (step) {
    case 0:
      if (!userData.fullname) return "Ingresa tu nombre completo";
      if (!userData.email || !/\S+@\S+\.\S+/.test(userData.email))
        return "Ingresa un email válido";
      if (!userData.password || userData.password.length < 6)
        return "La contraseña debe tener al menos 6 caracteres";
      return null;
    case 1:
      return data.gender ? null : "Elige tu género";
    case 2:
      return data.trainingDays.length > 0
        ? null
        : "Selecciona al menos un día de entrenamiento";
    case 3:
      return data.weight > 0 && data.height > 0
        ? null
        : "Ingresa tu peso y altura válidos";
    case 4:
      return data.birthdate ? null : "Ingresa tu fecha de nacimiento";
    case 5:
      return data.goal ? null : "Selecciona al menos un objetivo";
    case 6:
      return data.experience ? null : "Selecciona tu nivel de experiencia";
    default:
      return null;
  }
}
