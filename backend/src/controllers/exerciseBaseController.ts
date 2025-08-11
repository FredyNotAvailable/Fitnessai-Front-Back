// src/controllers/exerciseController.ts
import { Request, Response } from 'express';
import * as exerciseService from '../services/exerciseBaseService';
import { ExerciseBase } from '../models/ExerciseBase';

// Crear ejercicio
export async function createExercise(req: Request, res: Response) {
  try {
    // El id NO se recibe en el body, solo los demás datos
    const data: Omit<ExerciseBase, 'id'> = req.body;

    // No validamos data.id porque se genera en Firestore

    const newExercise = await exerciseService.createExercise(data);
    return res.status(201).json(newExercise);
  } catch (error: any) {
    console.error('Error al crear ejercicio:', error);
    // Ya no se espera error de "Ejercicio ya existe"
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// Obtener ejercicio por ID
export async function getExercise(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const exercise = await exerciseService.getExercise(id);
    if (!exercise) return res.status(404).json({ error: 'Ejercicio no encontrado' });

    return res.json(exercise);
  } catch (error) {
    console.error('Error al obtener ejercicio:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// Obtener todos los ejercicios
export async function getAllExercises(req: Request, res: Response) {
  try {
    const exercises = await exerciseService.getAllExercises();
    return res.json(exercises);
  } catch (error) {
    console.error('Error al obtener ejercicios:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}


// Actualizar ejercicio parcialmente
export async function updateExercise(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data: Partial<ExerciseBase> = req.body;

    const updatedExercise = await exerciseService.updateExercise(id, data);
    if (!updatedExercise) return res.status(404).json({ error: 'Ejercicio no encontrado' });

    return res.json(updatedExercise);
  } catch (error) {
    console.error('Error al actualizar ejercicio:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// Eliminar ejercicio
export async function deleteExercise(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const deleted = await exerciseService.deleteExercise(id);
    if (!deleted) return res.status(404).json({ error: 'Ejercicio no encontrado' });

    return res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar ejercicio:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
