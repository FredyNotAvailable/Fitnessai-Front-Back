// src/routes/profileRoutes.ts
import { Router } from 'express';
import validateFirebaseToken from '../middlewares/validateFirebaseToken';
import * as profileController from '../controllers/profileController';

const router = Router();

// Crear perfil
router.post('/create', validateFirebaseToken, profileController.createProfile);

// Obtener perfil del usuario autenticado
router.get('/me', validateFirebaseToken, profileController.getProfile);

// Actualizar perfil del usuario autenticado
router.put('/update', validateFirebaseToken, profileController.updateProfile);

// Eliminar perfil del usuario autenticado
router.delete('/delete', validateFirebaseToken, profileController.deleteProfile);

export default router;
