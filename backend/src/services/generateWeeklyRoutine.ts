// src/services/generateWeeklyRoutine.ts

import type { Profile } from '../models/Profile';
import type { RoutineDay, Exercise } from '../models/RoutineDay';
import { ExerciseBase, Category } from '../models/ExerciseBase';

const ALL_CATEGORIES: Category[] = [ Category.Chest, Category.Back, Category.Arm, Category.Leg,];

export function generateWeeklyRoutine(profile: Profile, exerciseBases: ExerciseBase[]): RoutineDay[] {
  const routineDays: RoutineDay[] = [];
  const trainingDaysCount = profile.trainingDays.length;
  const dayCategoriesMap = assignCategoriesToDays(profile.trainingDays, trainingDaysCount);

  profile.trainingDays.forEach((day, index) => {
    const categoriesForDay = dayCategoriesMap[index];
    const exercisesForDay: Exercise[] = [];

    categoriesForDay.forEach((category) => {
      const exercisesInCategory = exerciseBases.filter((ex) => ex.category === category);
      // console.log(`Día ${day}, categoría ${category} - ejercicios base disponibles: ${exercisesInCategory.length}`);

      if (exercisesInCategory.length === 0) {
        // console.warn(`No hay ejercicios para categoría ${category} en día ${day}`);
        return; // saltar categoría sin ejercicios
      }

      const selectedExercises = selectRandomExercises(exercisesInCategory, 3 + Math.round(Math.random()));
      selectedExercises.forEach((exBase) => {
        exercisesForDay.push(createExerciseFromBase(exBase, profile));
      });
    });

    if (exercisesForDay.length === 0) {
      // console.warn(`El día ${day} no tiene ejercicios asignados`);
    }

    const duration = calculateDuration(exercisesForDay);
    const notes = generateNotes(profile, categoriesForDay);

    routineDays.push({
      id: '',
      userId: profile.userId,
      day,
      categories: categoriesForDay,
      exercises: exercisesForDay,
      duration,
      notes,
    });
  });


  return routineDays;
}

function assignCategoriesToDays(trainingDays: string[], trainingDaysCount: number): Category[][] {
  const categoriesPerDay: Category[][] = [];

  if (trainingDaysCount === 1) {
    categoriesPerDay.push(ALL_CATEGORIES);
  } else if (trainingDaysCount === 2) {
    categoriesPerDay.push(ALL_CATEGORIES.slice(0, 2));
    categoriesPerDay.push(ALL_CATEGORIES.slice(2, 4));
  } else if (trainingDaysCount === 3) {
    categoriesPerDay.push(ALL_CATEGORIES.slice(0, 2));
    categoriesPerDay.push([ALL_CATEGORIES[2]]);
    categoriesPerDay.push([ALL_CATEGORIES[3]]);
  } else if (trainingDaysCount === 4) {
    ALL_CATEGORIES.forEach((cat) => categoriesPerDay.push([cat]));
  } else if (trainingDaysCount > 4) {
    for (let i = 0; i < trainingDaysCount; i++) {
      categoriesPerDay.push([ALL_CATEGORIES[i % ALL_CATEGORIES.length]]);
    }
  }

  return categoriesPerDay;
}

function selectRandomExercises(exercises: ExerciseBase[], n: number): ExerciseBase[] {
  const shuffled = [...exercises].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function createExerciseFromBase(exBase: ExerciseBase, profile: Profile): Exercise {
  // Sets según experiencia
  let sets = 3;
  if (profile.experience === 'advanced') sets = 4;

  // Reps según objetivo con algo de aleatoriedad
  let reps = 10;
  switch (profile.goal) {
    case 'lose weight':
      reps = 12 + Math.floor(Math.random() * 9); // 12 a 20
      break;
    case 'gain muscle':
      reps = 6 + Math.floor(Math.random() * 7);  // 6 a 12
      break;
    case 'maintain':
      reps = 8 + Math.floor(Math.random() * 8);  // 8 a 15
      break;
  }

  // Porcentaje base según experiencia
  let weightPercent = 0.5;
  if (profile.experience === 'beginner') weightPercent = 0.4;
  if (profile.experience === 'advanced') weightPercent = 0.7;

  // Ajuste por categoría
  let categoryWeightFactor = 1;
  switch (exBase.category) {
    case Category.Leg:
      categoryWeightFactor = 1.2;
      break;
    case Category.Arm:
      categoryWeightFactor = 0.8;
      break;
    default:
      categoryWeightFactor = 1;
  }

  const weight = Math.round(profile.weight * weightPercent * categoryWeightFactor);

  return {
    exerciseBaseId: exBase.id,
    sets,
    reps,
    weight,
  };
}

function calculateDuration(exercises: Exercise[]): number {
  const timePerSet = 2;
  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets, 0);
  return totalSets * timePerSet;
}

function generateNotes(profile: Profile, categories: Category[]): string {
  return `Rutina para ${profile.goal}, experiencia ${profile.experience}. Entrenando categorías: ${categories.join(', ')}. Recuerda descansar 1-2 minutos entre sets y mantener buena forma.`;
}
