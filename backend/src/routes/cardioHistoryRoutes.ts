import { Router } from 'express';
import validateFirebaseToken from '../middlewares/validateFirebaseToken';
import * as cardioHistoryController from '../controllers/cardioHistoryController';

const router = Router();

// Crear historial de cardio
router.post('/create', validateFirebaseToken, cardioHistoryController.createCardioHistory);

// Obtener historial de cardio por ID
router.get('/:id', validateFirebaseToken, cardioHistoryController.getCardioHistory);

// Obtener todos los historiales de cardio de un usuario
router.get('/user/:userId', validateFirebaseToken, cardioHistoryController.getCardioHistoriesByUser);

// Actualizar historial de cardio por ID
router.put('/update/:id', validateFirebaseToken, cardioHistoryController.updateCardioHistory);

// Eliminar historial de cardio por ID
router.delete('/delete/:id', validateFirebaseToken, cardioHistoryController.deleteCardioHistory);

export default router;
