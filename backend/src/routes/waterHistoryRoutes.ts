// src/routes/waterHistoryRoutes.ts
import { Router } from 'express';
import validateFirebaseToken from '../middlewares/validateFirebaseToken';
import * as waterHistoryController from '../controllers/waterHistoryController';

const router = Router();

// Crear historial de agua
router.post('/create', validateFirebaseToken, waterHistoryController.createWaterHistory);

// Obtener historial de agua por ID
router.get('/:id', validateFirebaseToken, waterHistoryController.getWaterHistory);

// Obtener todos los historiales de agua de un usuario
router.get('/user/:userId', validateFirebaseToken, waterHistoryController.getWaterHistoriesByUser);

// Actualizar historial de agua por ID
router.put('/update/:id', validateFirebaseToken, waterHistoryController.updateWaterHistory);

// Eliminar historial de agua por ID
router.delete('/delete/:id', validateFirebaseToken, waterHistoryController.deleteWaterHistory);

export default router;
