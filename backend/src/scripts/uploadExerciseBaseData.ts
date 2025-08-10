// src/scripts/uploadExerciseBaseData.ts

import { db } from '../config/firebase';
import {
  chestExercises,
  backExercises,
  legExercises,
  armExercises
} from '../data/ExerciseBaseData';

async function uploadExerciseBase() {
  // 1. Traer todos los ejercicios ya guardados (solo sus 'id')
  const existingSnapshot = await db.collection('exerciseBases').get();
  const existingIds = new Set<string>();

  existingSnapshot.forEach(doc => {
    const data = doc.data();
    if (data.id) existingIds.add(data.id);
  });

  const allExercises = [
    ...chestExercises,
    ...backExercises,
    ...legExercises,
    ...armExercises
  ];

  const batch = db.batch();
  let addedCount = 0;

  for (const [index, exercise] of allExercises.entries()) {
    console.log(`Revisando ejercicio #${index + 1}: ${exercise.name}`);

    if (!existingIds.has(exercise.id)) {
      const docRef = db.collection('exerciseBases').doc();

      // Excluir el campo 'id' al guardar
      const { id, ...exerciseData } = exercise;

      batch.set(docRef, exerciseData);
      addedCount++;
      console.log(`Ejercicio "${exercise.name}" agregado para subir.`);
    } else {
      console.log(`Ejercicio "${exercise.name}" ya existe, se omitirá.`);
    }
  }

  if (addedCount === 0) {
    console.log("No hay ejercicios nuevos para subir.");
    return;
  }

  try {
    await batch.commit();
    console.log(`Ejercicios base subidos correctamente. Total agregados: ${addedCount}`);
  } catch (error) {
    console.error('Error subiendo ejercicios base:', error);
  }
}

uploadExerciseBase();
