// src/routes/routineDayRoutes.ts
import { Router } from 'express';
import validateFirebaseToken from '../middlewares/validateFirebaseToken';
import * as routineDayController from '../controllers/routineDayController';

const router = Router();

// Crear rutina diaria
router.post('/create', validateFirebaseToken, routineDayController.createRoutineDay);

//

// Crear rutinas diarias
router.post('/generate-rutine-weekly', validateFirebaseToken, routineDayController.createWeeklyRoutineHandler);

//

// Obtener rutina diaria por ID
router.get('/:id', validateFirebaseToken, routineDayController.getRoutineDay);

// Obtener todas las rutinas diarias de un usuario
router.get('/user/:userId', validateFirebaseToken, routineDayController.getRoutineDaysByUserId);

// Actualizar rutina diaria por ID
router.put('/update/:id', validateFirebaseToken, routineDayController.updateRoutineDay);

// Eliminar rutina diaria por ID
router.delete('/delete/:id', validateFirebaseToken, routineDayController.deleteRoutineDay);

export default router;
