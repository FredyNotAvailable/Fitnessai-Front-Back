import { Router } from 'express';
import validateFirebaseToken from '../middlewares/validateFirebaseToken';
import * as userReportController from '../controllers/userReportController';

const router = Router();

// GET /report/:userId -> Devuelve el reporte completo del usuario
router.get('/:userId', validateFirebaseToken, userReportController.getUserReportWithAI);

export default router;
