import { Request, Response } from 'express';
import * as weightHistoryService from '../services/weightHistoryService';
import { WeightHistory } from '../models/WeightHistory';

export async function createWeightHistory(req: Request, res: Response) {
  try {
    const data: Omit<WeightHistory, 'id'> = req.body;
    const newWeightHistory = await weightHistoryService.createWeightHistory(data);
    return res.status(201).json(newWeightHistory);
  } catch (error: any) {
    console.error('Error creating weight history:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getWeightHistory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const weightHistory = await weightHistoryService.getWeightHistory(id);
    if (!weightHistory) return res.status(404).json({ error: 'WeightHistory not found' });
    return res.json(weightHistory);
  } catch (error) {
    console.error('Error getting weight history:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getWeightHistoriesByUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const histories = await weightHistoryService.getWeightHistoriesByUser(userId);
    return res.json(histories);
  } catch (error) {
    console.error('Error getting weight histories by user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateWeightHistory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data: Partial<WeightHistory> = req.body;
    const updated = await weightHistoryService.updateWeightHistory(id, data);
    if (!updated) return res.status(404).json({ error: 'WeightHistory not found' });
    return res.json(updated);
  } catch (error) {
    console.error('Error updating weight history:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteWeightHistory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await weightHistoryService.deleteWeightHistory(id);
    if (!deleted) return res.status(404).json({ error: 'WeightHistory not found' });
    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting weight history:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
