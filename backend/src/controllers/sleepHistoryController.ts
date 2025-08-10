import { Request, Response } from 'express';
import * as sleepHistoryService from '../services/sleepHistoryService';
import { SleepHistory } from '../models/SleepHistory';

export async function createSleepHistory(req: Request, res: Response) {
  try {
    const data: Omit<SleepHistory, 'id'> = req.body;
    const newHistory = await sleepHistoryService.createSleepHistory(data);
    return res.status(201).json(newHistory);
  } catch (error: any) {
    console.error('Error creating sleep history:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getSleepHistory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const history = await sleepHistoryService.getSleepHistory(id);
    if (!history) return res.status(404).json({ error: 'SleepHistory not found' });
    return res.json(history);
  } catch (error) {
    console.error('Error getting sleep history:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getSleepHistoriesByUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const histories = await sleepHistoryService.getSleepHistoriesByUser(userId);
    return res.json(histories);
  } catch (error) {
    console.error('Error getting sleep histories by userId:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateSleepHistory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data: Partial<SleepHistory> = req.body;
    const updatedHistory = await sleepHistoryService.updateSleepHistory(id, data);
    if (!updatedHistory) return res.status(404).json({ error: 'SleepHistory not found' });
    return res.json(updatedHistory);
  } catch (error) {
    console.error('Error updating sleep history:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteSleepHistory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await sleepHistoryService.deleteSleepHistory(id);
    if (!deleted) return res.status(404).json({ error: 'SleepHistory not found' });
    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting sleep history:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
