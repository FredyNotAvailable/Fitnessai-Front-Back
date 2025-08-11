// src/routes/exerciseRoutes.ts
import { Router } from 'express';
import validateFirebaseToken from '../middlewares/validateFirebaseToken';
import * as exerciseController from '../controllers/exerciseBaseController';

const router = Router();

// Crear ejercicio
router.post('/create', validateFirebaseToken, exerciseController.createExercise);

// Obtener ejercicio por ID
// router.get('/:id', exerciseController.getExercise);
router.get('/:id', validateFirebaseToken, exerciseController.getExercise);

// Todos
router.get('/', validateFirebaseToken, exerciseController.getAllExercises);

// Actualizar ejercicio por ID
router.put('/update/:id', validateFirebaseToken, exerciseController.updateExercise);

// Eliminar ejercicio por ID
router.delete('/delete/:id', validateFirebaseToken, exerciseController.deleteExercise);

export default router;
