import 'dotenv/config'; // Cargar variables de entorno al inicio

import express, { Request, Response } from 'express';
import cors from 'cors';

import validateFirebaseToken from './middlewares/validateFirebaseToken';
import profileRoutes from './routes/profileRoutes';
import exerciseBaseRoutes from './routes/exerciseBaseRoutes';
import routineDayRoutes from './routes/routineDayRoutes';
import exerciseHistoryRoutes from './routes/exerciseHistoryRoutes';
import waterHistoryRoutes from './routes/waterHistoryRoutes';
import cardioHistoryRoutes from './routes/cardioHistoryRoutes';
import sleepHistoryRoutes from './routes/sleepHistoryRoutes';
import weightHistoryRoutes from './routes/weightHistoryRoutes';
import trainingLogRoutes from './routes/trainingLogRoutes';
import userReportRoutes from './routes/userReportRoutes';

const app = express();

// Configuración CORS
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://fitnessai-4a18d.web.app', // producción
    ],
  })
);

app.use(express.json());

// Tipado para extender Request con user (opcional, para evitar casteos)
interface AuthenticatedRequest extends Request {
  user?: any;
}

// Rutas para perfil
app.use('/api/profile', profileRoutes);
// Rutas para ejercicios base
app.use('/api/exercise-base', exerciseBaseRoutes);
// Rutas para rutina diaria
app.use('/api/routine-day', routineDayRoutes);
// Rutas para historial de ejercicios
app.use('/api/exercise-history', exerciseHistoryRoutes);
// Rutas para historial de Water
app.use('/api/water-history', waterHistoryRoutes);
// Rutas para historial de cardio
app.use('/api/cardio-history', cardioHistoryRoutes);
// Rutas para historial de Sueño
app.use('/api/sleep-history', sleepHistoryRoutes);
// Rutas para historial de peso
app.use('/api/weight-history', weightHistoryRoutes);
// Rutas para historial de entrenamiento
app.use('/api/training-log', trainingLogRoutes);
// Reporte
app.use('/api/report', userReportRoutes);

// Ruta pública
app.get('/', (_req: Request, res: Response) => {
  res.send('Backend Fitness Started funcionando');
});

// Ruta protegida con token Firebase
app.get('/api/protected', validateFirebaseToken, (req: AuthenticatedRequest, res: Response) => {
  res.json({
    message: 'Acceso autorizado',
    user: req.user, // Ya con tipado
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
