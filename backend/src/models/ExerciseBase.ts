// src/ExerciseBase.ts

export enum Category {
  Chest = 'chest',
  Back = 'back',
  Arm = 'arm',
  Leg = 'leg',
}

export interface ExerciseBase {
  id: string;
  name: string;
  description: string;
  category: Category;
  photoUrl: string;
}
