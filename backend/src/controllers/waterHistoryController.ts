// src/controllers/waterHistoryController.ts
import { Request, Response } from 'express';
import * as waterHistoryService from '../services/waterHistoryService';
import { WaterHistory } from '../models/WaterHistory';

export async function createWaterHistory(req: Request, res: Response) {
  try {
    const data: Omit<WaterHistory, 'id'> = req.body;
    const newHistory = await waterHistoryService.createWaterHistory(data);
    return res.status(201).json(newHistory);
  } catch (error: any) {
    console.error('Error creating water history:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getWaterHistory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const history = await waterHistoryService.getWaterHistory(id);
    if (!history) return res.status(404).json({ error: 'WaterHistory not found' });
    return res.json(history);
  } catch (error) {
    console.error('Error getting water history:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getWaterHistoriesByUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const histories = await waterHistoryService.getWaterHistoriesByUser(userId);
    return res.json(histories);
  } catch (error) {
    console.error('Error getting water histories by userId:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


export async function getWaterHistoryByUserAndDate(req: Request, res: Response) {
  try {
    const { userId, date } = req.params; // <-- aquí

    if (typeof userId !== 'string' || typeof date !== 'string') {
      return res.status(400).json({ error: 'userId y date son requeridos y deben ser strings' });
    }

    const history = await waterHistoryService.getWaterHistoryByUserAndDate(userId, date);

    if (!history) {
      return res.status(404).json({ error: 'No existe historial, para ese usuario y fecha' });
    }

    return res.json(history);
  } catch (error) {
    console.error('Error getting water history by userId and date:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}



export async function updateWaterHistory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data: Partial<WaterHistory> = req.body;
    const updatedHistory = await waterHistoryService.updateWaterHistory(id, data);
    if (!updatedHistory) return res.status(404).json({ error: 'WaterHistory not found' });
    return res.json(updatedHistory);
  } catch (error) {
    console.error('Error updating water history:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteWaterHistory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await waterHistoryService.deleteWaterHistory(id);
    if (!deleted) return res.status(404).json({ error: 'WaterHistory not found' });
    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting water history:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
