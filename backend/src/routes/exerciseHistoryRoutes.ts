// src/routes/exerciseHistoryRoutes.ts
import { Router } from 'express';
import validateFirebaseToken from '../middlewares/validateFirebaseToken';
import * as exerciseHistoryController from '../controllers/exerciseHistoryController';

const router = Router();

// Crear historial de ejercicio
router.post('/create', validateFirebaseToken, exerciseHistoryController.createExerciseHistory);

// Obtener historial de ejercicio por ID
router.get('/:id', validateFirebaseToken, exerciseHistoryController.getExerciseHistory);

// Obtener todo el historial de un usuario
router.get('/user/:userId', validateFirebaseToken, exerciseHistoryController.getExerciseHistoriesByUser);

// Obtener historial de un usuario por fecha
router.get('/user/:userId/date/:date', validateFirebaseToken, exerciseHistoryController.getExerciseHistoriesByUserAndDate);

// Actualizar historial de ejercicio por ID
router.put('/update/:id', validateFirebaseToken, exerciseHistoryController.updateExerciseHistory);

// Eliminar historial de ejercicio por ID
router.delete('/delete/:id', validateFirebaseToken, exerciseHistoryController.deleteExerciseHistory);

export default router;
