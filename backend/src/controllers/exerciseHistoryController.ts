// src/controllers/exerciseHistoryController.ts
import { Request, Response } from 'express';
import * as exerciseHistoryService from '../services/exerciseHistoryService';
import { ExerciseHistory } from '../models/ExerciseHistory';

export async function createExerciseHistory(req: Request, res: Response) {
  try {
    const data: Omit<ExerciseHistory, 'id'> = req.body;
    const newHistory = await exerciseHistoryService.createExerciseHistory(data);
    return res.status(201).json(newHistory);
  } catch (error) {
    console.error('Error creating exercise history:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getExerciseHistory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const history = await exerciseHistoryService.getExerciseHistory(id);
    if (!history) return res.status(404).json({ error: 'ExerciseHistory not found' });
    return res.json(history);
  } catch (error) {
    console.error('Error getting exercise history:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getExerciseHistoriesByUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const histories = await exerciseHistoryService.getExerciseHistoriesByUser(userId);
    return res.json(histories);
  } catch (error) {
    console.error('Error getting exercise histories by userId:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getExerciseHistoriesByUserAndDate(req: Request, res: Response) {
  try {
    const { userId, date } = req.params;
    if (!userId || !date) {
      return res.status(400).json({ error: 'userId and date parameters are required' });
    }

    const histories = await exerciseHistoryService.getExerciseHistoriesByUserAndDate(userId, date);
    return res.json(histories);
  } catch (error) {
    console.error('Error getting exercise histories by userId and date:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateExerciseHistory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data: Partial<ExerciseHistory> = req.body;
    const updatedHistory = await exerciseHistoryService.updateExerciseHistory(id, data);
    if (!updatedHistory) return res.status(404).json({ error: 'ExerciseHistory not found' });
    return res.json(updatedHistory);
  } catch (error) {
    console.error('Error updating exercise history:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteExerciseHistory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await exerciseHistoryService.deleteExerciseHistory(id);
    if (!deleted) return res.status(404).json({ error: 'ExerciseHistory not found' });
    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting exercise history:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
