import { Request, Response } from 'express';
import * as userReportService from '../services/userReportServiceKimiK2';
import * as userReportServiceDeepSeek from '../services/userReportServiceDeepSeek';

export async function getUserReportWithAI(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: 'userId parameter is required' });
    }

    console.log(`[DEBUG] Llamando a getUserReportWithAI para userId: ${userId}`);

    // const report = await userReportServiceDeepSeek.getUserReportWithAI(userId);
    const report = await userReportService.getUserReportWithAI(userId);

    if (!report) {
      console.warn(`[DEBUG] No se encontró reporte para userId: ${userId}`);
      return res.status(404).json({ error: 'User report not found' });
    }

    // Debug del contenido que devuelve la IA
    console.log('[DEBUG] Respuesta de AI:', JSON.stringify(report, null, 2));

    return res.json(report);
  } catch (error) {
    console.error('Error fetching user report:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
