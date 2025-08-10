// src/models/ExerciseBase.ts

export type Category = 'chest' | 'back' | 'arm' | 'leg';

export interface ExerciseBase {
  id: string;
  name: string;
  description: string;
  category: Category;  // Ahora es un string union type
  photoUrl: string;
}
