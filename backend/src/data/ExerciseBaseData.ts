// src/data/ExerciseBaseData.ts

// Instalar: npm install -D ts-node
// Comando: npx ts-node src/scripts/uploadExerciseBaseData.ts

// barra, mancuernas,maquina, polea, corporal, polea


import type { ExerciseBase } from '../models/ExerciseBase';
import { Category } from '../models/ExerciseBase';

export const chestExercises: ExerciseBase[] = [
  // Plano
  {
    id: "chest-flat-barbell-press",
    name: "Press de Pecho Plano con Barra",
    description: "Ejercicio clásico para trabajar el pectoral mayor en el ángulo plano usando barra.",
    category: Category.Chest,
    photoUrl: "url-a-imagen-press-plano-barra"
  },
  {
    id: "chest-flat-dumbbell-press",
    name: "Press de Pecho Plano con Mancuernas",
    description: "Variante con mancuernas para mayor rango de movimiento en pectoral plano.",
    category: Category.Chest,
    photoUrl: "url-a-imagen-press-plano-mancuernas"
  },
  {
    id: "chest-flat-machine-press",
    name: "Press de Pecho Plano en Máquina",
    description: "Ejercicio asistido con máquina para pectoral plano.",
    category: Category.Chest,
    photoUrl: "url-a-imagen-press-plano-maquina"
  },
  {
    id: "chest-flat-cable-fly",
    name: "Aperturas Planas con Polea",
    description: "Aperturas para pectoral plano usando poleas para resistencia constante.",
    category: Category.Chest,
    photoUrl: "url-a-imagen-aperturas-polea-plano"
  },
  {
    id: "chest-flat-pushup",
    name: "Flexiones Planas",
    description: "Ejercicio corporal para pectoral plano usando peso corporal.",
    category: Category.Chest,
    photoUrl: "url-a-imagen-flexiones-plano"
  },
  {
    id: "chest-flat-cable-press",
    name: "Press Plano con Polea",
    description: "Press para pectoral plano usando poleas para tensión continua.",
    category: Category.Chest,
    photoUrl: "url-a-imagen-press-plano-polea"
  },

  // Inclinado
  {
    id: "chest-incline-barbell-press",
    name: "Press de Pecho Inclinado con Barra",
    description: "Press para pectoral superior con barra en banco inclinado.",
    category: Category.Chest,
    photoUrl: "url-a-imagen-press-inclinado-barra"
  },
  {
    id: "chest-incline-dumbbell-press",
    name: "Press de Pecho Inclinado con Mancuernas",
    description: "Variante con mancuernas para pectoral superior en banco inclinado.",
    category: Category.Chest,
    photoUrl: "url-a-imagen-press-inclinado-mancuernas"
  },
  {
    id: "chest-incline-machine-press",
    name: "Press Inclinado en Máquina",
    description: "Press asistido para pectoral superior con máquina.",
    category: Category.Chest,
    photoUrl: "url-a-imagen-press-inclinado-maquina"
  },
  {
    id: "chest-incline-cable-fly",
    name: "Aperturas con Polea en Banco Inclinado",
    description: "Aperturas para pectoral superior usando poleas.",
    category: Category.Chest,
    photoUrl: "url-a-imagen-aperturas-polea-inclinado"
  },
  {
    id: "chest-incline-pushup",
    name: "Flexiones con Manos Elevadas",
    description: "Flexiones para pectoral superior con manos en banco o plataforma.",
    category: Category.Chest,
    photoUrl: "url-a-imagen-flexiones-inclinado"
  },
  {
    id: "chest-incline-cable-press",
    name: "Press Inclinado con Polea",
    description: "Press para pectoral superior usando poleas para tensión continua.",
    category: Category.Chest,
    photoUrl: "url-a-imagen-press-inclinado-polea"
  },

  // Declinado
  {
    id: "chest-decline-barbell-press",
    name: "Press de Pecho Declinado con Barra",
    description: "Press para pectoral inferior con barra en banco declinado.",
    category: Category.Chest,
    photoUrl: "url-a-imagen-press-declinado-barra"
  },
  {
    id: "chest-decline-dumbbell-press",
    name: "Press de Pecho Declinado con Mancuernas",
    description: "Variante con mancuernas para pectoral inferior.",
    category: Category.Chest,
    photoUrl: "url-a-imagen-press-declinado-mancuernas"
  },
  {
    id: "chest-decline-machine-press",
    name: "Press Declinado en Máquina",
    description: "Press asistido para pectoral inferior con máquina.",
    category: Category.Chest,
    photoUrl: "url-a-imagen-press-declinado-maquina"
  },
  {
    id: "chest-decline-cable-fly",
    name: "Aperturas con Polea en Banco Declinado",
    description: "Aperturas para pectoral inferior usando poleas.",
    category: Category.Chest,
    photoUrl: "url-a-imagen-aperturas-polea-declinado"
  },
  {
    id: "chest-decline-pushup",
    name: "Flexiones con Pies Elevados",
    description: "Flexiones para pectoral inferior con pies elevados.",
    category: Category.Chest,
    photoUrl: "url-a-imagen-flexiones-declinado"
  },
  {
    id: "chest-decline-cable-press",
    name: "Press Declinado con Polea",
    description: "Press para pectoral inferior usando poleas para tensión continua.",
    category: Category.Chest,
    photoUrl: "url-a-imagen-press-declinado-polea"
  },
];

export const backExercises = [
  // Espalda alta
  {
    id: "back-upper-barbell-row",
    name: "Remo con Barra",
    description: "Ejercicio de remo con barra para trabajar la parte alta de la espalda.",
    category: Category.Back,
    photoUrl: "url-a-imagen-remo-barra"
  },
  {
    id: "back-upper-one-arm-dumbbell-row",
    name: "Remo a un brazo con Mancuerna",
    description: "Remo unilateral con mancuerna enfocado en la espalda alta.",
    category: Category.Back,
    photoUrl: "url-a-imagen-remo-mancuerna"
  },
  {
    id: "back-upper-seated-row-machine",
    name: "Remo sentado en máquina",
    description: "Remo en máquina sentado para trabajar espalda alta con soporte.",
    category: Category.Back,
    photoUrl: "url-a-imagen-remo-maquina"
  },
  {
    id: "back-upper-cable-seated-row",
    name: "Remo en polea baja",
    description: "Remo en polea baja para estimular la espalda alta con tensión constante.",
    category: Category.Back,
    photoUrl: "url-a-imagen-remo-polea"
  },
  {
    id: "back-upper-inverted-row",
    name: "Remo invertido corporal",
    description: "Ejercicio con peso corporal para espalda alta usando barra fija.",
    category: Category.Back,
    photoUrl: "url-a-imagen-remo-invertido"
  },

  // Espalda media
  {
    id: "back-mid-pullups",
    name: "Dominadas",
    description: "Dominadas para trabajar la espalda media con peso corporal.",
    category: Category.Back,
    photoUrl: "url-a-imagen-dominadas"
  },
  {
    id: "back-mid-dumbbell-pullover",
    name: "Pullover con mancuerna",
    description: "Ejercicio con mancuerna para expandir caja torácica y fortalecer espalda media.",
    category: Category.Back,
    photoUrl: "url-a-imagen-pullover-mancuerna"
  },
  {
    id: "back-mid-lat-pulldown-machine",
    name: "Jalón al pecho en máquina",
    description: "Jalón en máquina para espalda media y dorsal ancho.",
    category: Category.Back,
    photoUrl: "url-a-imagen-jalon-maquina"
  },
  {
    id: "back-mid-lat-pulldown-cable",
    name: "Jalón al pecho en polea alta",
    description: "Jalón en polea para activar dorsal ancho y espalda media.",
    category: Category.Back,
    photoUrl: "url-a-imagen-jalon-polea"
  },
  {
    id: "back-mid-superman",
    name: "Superman corporal",
    description: "Ejercicio corporal para fortalecer la espalda media y lumbar.",
    category: Category.Back,
    photoUrl: "url-a-imagen-superman"
  },

  // Espalda baja
  {
    id: "back-lower-deadlift",
    name: "Peso muerto convencional",
    description: "Ejercicio con barra para fortalecer la zona lumbar y cadena posterior.",
    category: Category.Back,
    photoUrl: "url-a-imagen-peso-muerto"
  },
  {
    id: "back-lower-romanian-dumbbell-deadlift",
    name: "Peso muerto rumano con mancuernas",
    description: "Variante del peso muerto con mancuernas para espalda baja y glúteos.",
    category: Category.Back,
    photoUrl: "url-a-imagen-peso-muerto-rumano"
  },
  {
    id: "back-lower-back-extension-machine",
    name: "Hiperextensiones en máquina",
    description: "Ejercicio para fortalecer la zona lumbar usando máquina de hiperextensión.",
    category: Category.Back,
    photoUrl: "url-a-imagen-hiperextensiones-maquina"
  },
  {
    id: "back-lower-cable-good-mornings",
    name: "Buenos días con polea baja",
    description: "Buenos días asistidos con polea para fortalecer espalda baja.",
    category: Category.Back,
    photoUrl: "url-a-imagen-buenos-dias-polea"
  },
  {
    id: "back-lower-glute-bridge",
    name: "Puente lumbar corporal",
    description: "Ejercicio corporal para fortalecer glúteos y espalda baja.",
    category: Category.Back,
    photoUrl: "url-a-imagen-puente-lumbar"
  },
];

export const legExercises: ExerciseBase[] = [
  // Cuádriceps
  {
    id: "quad-barbell-back-squat",
    name: "Sentadilla Trasera con Barra",
    description: "Ejercicio fundamental para trabajar el cuádriceps y toda la parte baja usando barra.",
    category: Category.Leg,
    photoUrl: "url-a-imagen-sentadilla-barra"
  },
  {
    id: "quad-dumbbell-lunges",
    name: "Zancadas con Mancuernas",
    description: "Ejercicio unilateral para fortalecer el cuádriceps y glúteos con mancuernas.",
    category: Category.Leg,
    photoUrl: "url-a-imagen-zancadas-mancuernas"
  },
  {
    id: "quad-leg-press-machine",
    name: "Prensa de Piernas",
    description: "Ejercicio en máquina que aísla el cuádriceps y permite trabajar con cargas pesadas.",
    category: Category.Leg,
    photoUrl: "url-a-imagen-prensa-piernas"
  },
  {
    id: "quad-leg-extension-pulley",
    name: "Extensión de Piernas en Polea Baja",
    description: "Ejercicio para aislar el cuádriceps usando polea baja con accesorio específico.",
    category: Category.Leg,
    photoUrl: "url-a-imagen-extension-piernas-polea"
  },
  {
    id: "quad-bodyweight-squat",
    name: "Sentadillas sin Peso",
    description: "Ejercicio corporal para fortalecer el cuádriceps y la resistencia muscular.",
    category: Category.Leg,
    photoUrl: "url-a-imagen-sentadillas-sin-peso"
  },
  {
    id: "quad-leg-kickback-pulley",
    name: "Patada de Pierna en Polea Baja",
    description: "Ejercicio para activar el cuádriceps y glúteos con polea baja.",
    category: Category.Leg,
    photoUrl: "url-a-imagen-patada-pierna-polea"
  },

  // Isquiotibiales
  {
    id: "ham-barbell-romanian-deadlift",
    name: "Peso Muerto Rumano con Barra",
    description: "Ejercicio clave para fortalecer los isquiotibiales y glúteos con barra.",
    category: Category.Leg,
    photoUrl: "url-a-imagen-peso-muerto-rumano-barra"
  },
  {
    id: "ham-dumbbell-deadlift",
    name: "Peso Muerto con Mancuernas",
    description: "Variante unilateral para trabajar isquiotibiales usando mancuernas.",
    category: Category.Leg,
    photoUrl: "url-a-imagen-peso-muerto-mancuernas"
  },
  {
    id: "ham-lying-leg-curl-machine",
    name: "Curl de Piernas Acostado",
    description: "Ejercicio en máquina que aísla y fortalece los isquiotibiales.",
    category: Category.Leg,
    photoUrl: "url-a-imagen-curl-piernas-maquina"
  },
  {
    id: "ham-leg-curl-pulley",
    name: "Curl de Piernas en Polea Baja",
    description: "Ejercicio para isquiotibiales con polea baja y accesorio de tobillo.",
    category: Category.Leg,
    photoUrl: "url-a-imagen-curl-piernas-polea"
  },
  {
    id: "ham-bodyweight-hip-thrust",
    name: "Puente de Glúteos sin Peso",
    description: "Ejercicio corporal para activar isquiotibiales y glúteos sin peso.",
    category: Category.Leg,
    photoUrl: "url-a-imagen-puente-gluteos"
  },
  {
    id: "ham-leg-kickback-pulley",
    name: "Patada de Isquiotibiales en Polea",
    description: "Ejercicio para trabajar isquiotibiales con polea y accesorio de tobillo.",
    category: Category.Leg,
    photoUrl: "url-a-imagen-patada-isquios-polea"
  },

  // Glúteos
  {
    id: "glutes-barbell-hip-thrust",
    name: "Hip Thrust con Barra",
    description: "Ejercicio potente para activar el glúteo mayor con barra.",
    category: Category.Leg,
    photoUrl: "url-a-imagen-hip-thrust-barra"
  },
  {
    id: "glutes-dumbbell-bulgarian-split-squat",
    name: "Sentadilla Búlgara con Mancuernas",
    description: "Ejercicio unilateral que trabaja glúteos y cuádriceps con mancuernas.",
    category: Category.Leg,
    photoUrl: "url-a-imagen-sentadilla-bulgara-mancuernas"
  },
  {
    id: "glutes-hip-abduction-machine",
    name: "Abducción de Cadera en Máquina",
    description: "Ejercicio en máquina para trabajar glúteo medio y menor.",
    category: Category.Leg,
    photoUrl: "url-a-imagen-abduccion-maquina"
  },
  {
    id: "glutes-kickback-pulley",
    name: "Patada de Glúteos en Polea Alta",
    description: "Ejercicio para activar glúteos con polea alta y accesorio de tobillo.",
    category: Category.Leg,
    photoUrl: "url-a-imagen-patada-gluteos-polea"
  },
  {
    id: "glutes-bodyweight-side-leg-raise",
    name: "Elevación Lateral de Pierna",
    description: "Ejercicio corporal para fortalecer glúteo medio y menor.",
    category: Category.Leg,
    photoUrl: "url-a-imagen-elevacion-lateral-pierna"
  },
  {
    id: "glutes-side-hip-abduction-pulley",
    name: "Abducción de Cadera en Polea Lateral",
    description: "Ejercicio para trabajar glúteo medio con polea lateral.",
    category: Category.Leg,
    photoUrl: "url-a-imagen-abduccion-polea-lateral"
  },

  // Pantorrillas
  {
    id: "calves-barbell-standing-calf-raise",
    name: "Elevación de Talones con Barra (De Pie)",
    description: "Ejercicio para fortalecer gastrocnemio con barra de pie.",
    category: Category.Leg,
    photoUrl: "url-a-imagen-elevacion-talones-barra"
  },
  {
    id: "calves-dumbbell-standing-calf-raise",
    name: "Elevación de Talones con Mancuernas (De Pie)",
    description: "Variante con mancuernas para trabajar las pantorrillas de pie.",
    category: Category.Leg,
    photoUrl: "url-a-imagen-elevacion-talones-mancuernas"
  },
  {
    id: "calves-seated-calf-raise-machine",
    name: "Elevación de Talones en Máquina Sentado",
    description: "Ejercicio para trabajar el sóleo sentado en máquina.",
    category: Category.Leg,
    photoUrl: "url-a-imagen-elevacion-talones-maquina"
  },
  {
    id: "calves-calf-raise-pulley",
    name: "Elevación de Talones con Polea Baja",
    description: "Ejercicio para activar las pantorrillas con polea baja.",
    category: Category.Leg,
    photoUrl: "url-a-imagen-elevacion-talones-polea"
  },
  {
    id: "calves-bodyweight-standing-calf-raise",
    name: "Elevación de Talones sin Peso (De Pie)",
    description: "Ejercicio corporal básico para fortalecer las pantorrillas.",
    category: Category.Leg,
    photoUrl: "url-a-imagen-elevacion-talones-sin-peso"
  },
  {
    id: "calves-seated-calf-raise-pulley",
    name: "Elevación de Talones en Polea Sentado",
    description: "Variante en polea para trabajar sóleo sentado.",
    category: Category.Leg,
    photoUrl: "url-a-imagen-elevacion-talones-polea-sentado"
  }
];

export const armExercises: ExerciseBase[] = [
  // Bíceps
  {
    id: "biceps-barbell-curl",
    name: "Curl de Bíceps con Barra",
    description: "Ejercicio clásico para fortalecer el bíceps usando barra.",
    category: Category.Arm,
    photoUrl: "url-a-imagen-curl-barra"
  },
  {
    id: "biceps-dumbbell-alternate-curl",
    name: "Curl Alterno con Mancuernas",
    description: "Ejercicio unilateral para trabajar el bíceps con mancuernas.",
    category: Category.Arm,
    photoUrl: "url-a-imagen-curl-mancuernas"
  },
  {
    id: "biceps-machine-concentration-curl",
    name: "Curl de Bíceps en Máquina Concentrada",
    description: "Ejercicio en máquina para aislar el bíceps.",
    category: Category.Arm,
    photoUrl: "url-a-imagen-curl-maquina"
  },
  {
    id: "biceps-pulley-curl",
    name: "Curl de Bíceps en Polea Baja",
    description: "Ejercicio para bíceps usando polea baja.",
    category: Category.Arm,
    photoUrl: "url-a-imagen-curl-polea"
  },
  {
    id: "biceps-bodyweight-chinups",
    name: "Chin-ups (Dominadas con agarre supino)",
    description: "Ejercicio corporal que trabaja el bíceps y la espalda.",
    category: Category.Arm,
    photoUrl: "url-a-imagen-chinups"
  },
  {
    id: "biceps-pulley-hammer-curl",
    name: "Curl Martillo en Polea",
    description: "Variante de curl para bíceps y braquiorradial en polea.",
    category: Category.Arm,
    photoUrl: "url-a-imagen-curl-martillo-polea"
  },

  // Tríceps
  {
    id: "triceps-barbell-close-grip-press",
    name: "Press Cerrado con Barra",
    description: "Ejercicio compuesto para trabajar el tríceps con barra.",
    category: Category.Arm,
    photoUrl: "url-a-imagen-press-cerrado-barra"
  },
  {
    id: "triceps-dumbbell-overhead-extension",
    name: "Extensión de Tríceps por Encima de la Cabeza con Mancuerna",
    description: "Ejercicio unilateral para aislar el tríceps con mancuerna.",
    category: Category.Arm,
    photoUrl: "url-a-imagen-extension-triceps-mancuerna"
  },
  {
    id: "triceps-machine-overhead-extension",
    name: "Extensión de Tríceps en Máquina de Polea Alta",
    description: "Ejercicio en máquina para trabajar el tríceps.",
    category: Category.Arm,
    photoUrl: "url-a-imagen-extension-triceps-maquina"
  },
  {
    id: "triceps-pulley-rope-pushdown",
    name: "Jalón de Tríceps en Polea Alta (Cuerda)",
    description: "Ejercicio para tríceps usando polea alta con cuerda.",
    category: Category.Arm,
    photoUrl: "url-a-imagen-jalon-triceps-polea"
  },
  {
    id: "triceps-bodyweight-dips",
    name: "Fondos en Paralelas",
    description: "Ejercicio corporal para fortalecer el tríceps y pecho.",
    category: Category.Arm,
    photoUrl: "url-a-imagen-fondos-paralelas"
  },
  {
    id: "triceps-pulley-kickback",
    name: "Patada de Tríceps en Polea Baja",
    description: "Ejercicio de aislamiento para tríceps con polea baja.",
    category: Category.Arm,
    photoUrl: "url-a-imagen-patada-triceps-polea"
  },

  // Deltoides
  {
    id: "deltoids-barbell-military-press",
    name: "Press Militar con Barra",
    description: "Ejercicio compuesto para fortalecer los deltoides.",
    category: Category.Arm,
    photoUrl: "url-a-imagen-press-militar-barra"
  },
  {
    id: "deltoids-dumbbell-lateral-raise",
    name: "Elevaciones Laterales con Mancuernas",
    description: "Ejercicio para fortalecer el deltoide lateral.",
    category: Category.Arm,
    photoUrl: "url-a-imagen-elevacion-lateral"
  },
  {
    id: "deltoids-machine-shoulder-press",
    name: "Press de Hombro en Máquina",
    description: "Ejercicio en máquina para trabajar los deltoides.",
    category: Category.Arm,
    photoUrl: "url-a-imagen-press-hombro-maquina"
  },
  {
    id: "deltoids-pulley-front-raise",
    name: "Elevaciones Frontales en Polea",
    description: "Ejercicio para deltoides frontales usando polea.",
    category: Category.Arm,
    photoUrl: "url-a-imagen-elevacion-frontal-polea"
  },
  {
    id: "deltoids-bodyweight-pike-pushups",
    name: "Pike Push-ups",
    description: "Ejercicio corporal que trabaja principalmente los deltoides.",
    category: Category.Arm,
    photoUrl: "url-a-imagen-pike-pushups"
  },
  {
    id: "deltoids-pulley-upright-row",
    name: "Remo al Cuello en Polea",
    description: "Ejercicio para deltoides y trapecio con polea.",
    category: Category.Arm,
    photoUrl: "url-a-imagen-remo-cuello-polea"
  },

  // Antebrazo
  {
    id: "forearm-barbell-wrist-curl",
    name: "Curl de Muñeca con Barra",
    description: "Ejercicio para fortalecer los músculos flexores del antebrazo.",
    category: Category.Arm,
    photoUrl: "url-a-imagen-curl-muneca-barra"
  },
  {
    id: "forearm-dumbbell-reverse-curl",
    name: "Curl Inverso con Mancuernas",
    description: "Ejercicio para fortalecer los extensores del antebrazo.",
    category: Category.Arm,
    photoUrl: "url-a-imagen-curl-inverso-mancuernas"
  },
  {
    id: "forearm-machine-wrist-curl",
    name: "Curl de Muñeca en Máquina",
    description: "Ejercicio en máquina para trabajar los músculos del antebrazo.",
    category: Category.Arm,
    photoUrl: "url-a-imagen-curl-muneca-maquina"
  },
  {
    id: "forearm-pulley-wrist-curl",
    name: "Curl de Muñeca en Polea Baja",
    description: "Ejercicio con polea para fortalecer el antebrazo.",
    category: Category.Arm,
    photoUrl: "url-a-imagen-curl-muneca-polea"
  },
  {
    id: "forearm-bodyweight-hang",
    name: "Suspensión en Barra",
    description: "Ejercicio corporal para mejorar agarre y fuerza de antebrazo.",
    category: Category.Arm,
    photoUrl: "url-a-imagen-suspension-barra"
  },
  {
    id: "forearm-pulley-wrist-extension",
    name: "Extensión de Muñeca en Polea",
    description: "Ejercicio para fortalecer los extensores del antebrazo con polea.",
    category: Category.Arm,
    photoUrl: "url-a-imagen-extension-muneca-polea"
  }
];
