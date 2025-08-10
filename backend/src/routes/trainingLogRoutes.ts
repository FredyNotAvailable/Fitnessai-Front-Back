// src/routes/trainingLogRoutes.ts
import { Router } from 'express';
import validateFirebaseToken from '../middlewares/validateFirebaseToken';
import * as trainingLogController from '../controllers/trainingLogController';

const router = Router();

router.post('/create', validateFirebaseToken, trainingLogController.createTrainingLog);
router.get('/:id', validateFirebaseToken, trainingLogController.getTrainingLog);
router.get('/user/:userId', validateFirebaseToken, trainingLogController.getTrainingLogsByUser);
router.put('/update/:id', validateFirebaseToken, trainingLogController.updateTrainingLog);
router.delete('/delete/:id', validateFirebaseToken, trainingLogController.deleteTrainingLog);

export default router;
