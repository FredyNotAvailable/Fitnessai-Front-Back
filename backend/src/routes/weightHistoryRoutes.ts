import { Router } from 'express';
import validateFirebaseToken from '../middlewares/validateFirebaseToken';
import * as weightHistoryController from '../controllers/weightHistoryController';

const router = Router();

router.post('/create', validateFirebaseToken, weightHistoryController.createWeightHistory);

router.get('/:id', validateFirebaseToken, weightHistoryController.getWeightHistory);

router.get('/user/:userId', validateFirebaseToken, weightHistoryController.getWeightHistoriesByUser);

router.put('/update/:id', validateFirebaseToken, weightHistoryController.updateWeightHistory);

router.delete('/delete/:id', validateFirebaseToken, weightHistoryController.deleteWeightHistory);

export default router;
