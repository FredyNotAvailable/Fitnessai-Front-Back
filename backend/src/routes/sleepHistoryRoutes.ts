import { Router } from 'express';
import validateFirebaseToken from '../middlewares/validateFirebaseToken';
import * as sleepHistoryController from '../controllers/sleepHistoryController';

const router = Router();

// Crear historial de sueño
router.post('/create', validateFirebaseToken, sleepHistoryController.createSleepHistory);

// Obtener historial de sueño por ID
router.get('/:id', validateFirebaseToken, sleepHistoryController.getSleepHistory);

// Obtener todos los historiales de sueño de un usuario
router.get('/user/:userId', validateFirebaseToken, sleepHistoryController.getSleepHistoriesByUser);

// Actualizar historial de sueño por ID
router.put('/update/:id', validateFirebaseToken, sleepHistoryController.updateSleepHistory);

// Eliminar historial de sueño por ID
router.delete('/delete/:id', validateFirebaseToken, sleepHistoryController.deleteSleepHistory);

export default router;
