// src/controllers/trainingLogController.ts
import { Request, Response } from 'express';
import * as trainingLogService from '../services/trainingLogService';
import { TrainingLog } from '../models/TrainingLog';

export async function createTrainingLog(req: Request, res: Response) {
  try {
    const data: Omit<TrainingLog, 'id'> = req.body;
    const newLog = await trainingLogService.createTrainingLog(data);
    return res.status(201).json(newLog);
  } catch (error: any) {
    console.error('Error creating training log:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getTrainingLog(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const log = await trainingLogService.getTrainingLog(id);
    if (!log) return res.status(404).json({ error: 'TrainingLog not found' });
    return res.json(log);
  } catch (error) {
    console.error('Error getting training log:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getTrainingLogsByUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const logs = await trainingLogService.getTrainingLogsByUser(userId);
    return res.json(logs);
  } catch (error) {
    console.error('Error getting training logs by user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateTrainingLog(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data: Partial<TrainingLog> = req.body;
    const updatedLog = await trainingLogService.updateTrainingLog(id, data);
    if (!updatedLog) return res.status(404).json({ error: 'TrainingLog not found' });
    return res.json(updatedLog);
  } catch (error) {
    console.error('Error updating training log:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteTrainingLog(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await trainingLogService.deleteTrainingLog(id);
    if (!deleted) return res.status(404).json({ error: 'TrainingLog not found' });
    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting training log:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
