export const Category = {
  Pierna: "Pierna",
  Pecho: "Pecho",
  Brazo: "Brazo",
  Espalda: "Espalda",
} as const;

export type Category = (typeof Category)[keyof typeof Category];

export type ExerciseBase = {
  id: string;               // identificador único
  name: string;
  photoUrl: string;
  description: string;
  category: Category;       // solo UNA categoría por ejercicio, usando enum
};

export const exercisesBase: ExerciseBase[] = [
  {
    id: "sentadillas",
    name: "Sentadillas",
    photoUrl: "https://i.pinimg.com/736x/79/ae/df/79aedf0f0dc60b198a8e8d80ecce3ed5.jpg",
    description: "Flexiona las rodillas y baja el cuerpo manteniendo la espalda recta.",
    category: Category.Pierna,
  },
  {
    id: "peso_muerto",
    name: "Peso muerto",
    photoUrl: "https://i.pinimg.com/736x/79/ae/df/79aedf0f0dc60b198a8e8d80ecce3ed5.jpg",
    description: "Levanta la barra manteniendo la espalda recta y las piernas semiflexionadas.",
    category: Category.Pierna,
  },
  {
    id: "press_banca",
    name: "Press de banca",
    photoUrl: "https://i.pinimg.com/736x/79/ae/df/79aedf0f0dc60b198a8e8d80ecce3ed5.jpg",
    description: "Empuja la barra desde el pecho hacia arriba con control y firmeza.",
    category: Category.Pecho,
  },
  {
    id: "fondos_paralelas",
    name: "Fondos en paralelas",
    photoUrl: "https://i.pinimg.com/736x/79/ae/df/79aedf0f0dc60b198a8e8d80ecce3ed5.jpg",
    description: "Baja el cuerpo doblando los codos y sube manteniendo el torso recto.",
    category: Category.Brazo,
  },
  {
    id: "dominadas",
    name: "Dominadas",
    photoUrl: "https://i.pinimg.com/736x/79/ae/df/79aedf0f0dc60b198a8e8d80ecce3ed5.jpg",
    description: "Sujétate a la barra y sube controlando el movimiento hasta la barbilla.",
    category: Category.Espalda,
  },
  {
    id: "remo_barra",
    name: "Remo con barra",
    photoUrl: "https://i.pinimg.com/736x/79/ae/df/79aedf0f0dc60b198a8e8d80ecce3ed5.jpg",
    description: "Inclina el torso y lleva la barra hacia el abdomen apretando la espalda.",
    category: Category.Espalda,
  },
];
