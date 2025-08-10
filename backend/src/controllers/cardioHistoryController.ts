import { Request, Response } from 'express';
import * as cardioHistoryService from '../services/cardioHistoryService';
import { CardioHistory } from '../models/CardioHistory';

export async function createCardioHistory(req: Request, res: Response) {
  try {
    const data: Omit<CardioHistory, 'id'> = req.body;
    const newHistory = await cardioHistoryService.createCardioHistory(data);
    return res.status(201).json(newHistory);
  } catch (error: any) {
    console.error('Error creating cardio history:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getCardioHistory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const history = await cardioHistoryService.getCardioHistory(id);
    if (!history) return res.status(404).json({ error: 'CardioHistory not found' });
    return res.json(history);
  } catch (error) {
    console.error('Error getting cardio history:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getCardioHistoriesByUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const histories = await cardioHistoryService.getCardioHistoriesByUser(userId);
    return res.json(histories);
  } catch (error) {
    console.error('Error getting cardio histories by userId:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateCardioHistory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data: Partial<CardioHistory> = req.body;
    const updatedHistory = await cardioHistoryService.updateCardioHistory(id, data);
    if (!updatedHistory) return res.status(404).json({ error: 'CardioHistory not found' });
    return res.json(updatedHistory);
  } catch (error) {
    console.error('Error updating cardio history:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteCardioHistory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await cardioHistoryService.deleteCardioHistory(id);
    if (!deleted) return res.status(404).json({ error: 'CardioHistory not found' });
    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting cardio history:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
