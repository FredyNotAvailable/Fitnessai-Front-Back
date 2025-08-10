// src/controllers/routineDayController.ts
import { Request, Response } from 'express';
import * as routineDayService from '../services/routineDayService';
import { RoutineDay } from '../models/RoutineDay';
import { Profile } from '../models/Profile';

export async function createRoutineDay(req: Request, res: Response) {
  try {
    // El id NO se recibe en el body, solo los demás datos
    const data: Omit<RoutineDay, 'id'> = req.body;

    // No chequeamos data.id porque no debe venir

    const newRoutineDay = await routineDayService.createRoutineDay(data);
    return res.status(201).json(newRoutineDay);
  } catch (error: any) {
    console.error('Error creating routine day:', error);
    if (error.message === 'RoutineDay already exists') {
      return res.status(409).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}

//

export async function createWeeklyRoutineHandler(req: Request, res: Response) {
  try {
    const userId: string = req.body.userId;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    // Ahora se llama con solo userId
    const routines = await routineDayService.generateAndSaveWeeklyRoutine(userId);

    return res.status(201).json(routines);
  } catch (error) {
    console.error('Error generating and saving weekly routine:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

//

export async function getRoutineDay(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const routineDay = await routineDayService.getRoutineDay(id);
    if (!routineDay) return res.status(404).json({ error: 'RoutineDay not found' });

    return res.json(routineDay);
  } catch (error) {
    console.error('Error getting routine day:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getRoutineDaysByUserId(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const routineDays = await routineDayService.getRoutineDaysByUserId(userId);
    return res.json(routineDays);
  } catch (error) {
    console.error('Error getting routine days by userId:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateRoutineDay(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data: Partial<RoutineDay> = req.body;

    const updatedRoutineDay = await routineDayService.updateRoutineDay(id, data);
    if (!updatedRoutineDay) return res.status(404).json({ error: 'RoutineDay not found' });

    return res.json(updatedRoutineDay);
  } catch (error) {
    console.error('Error updating routine day:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteRoutineDay(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const deleted = await routineDayService.deleteRoutineDay(id);
    if (!deleted) return res.status(404).json({ error: 'RoutineDay not found' });

    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting routine day:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
