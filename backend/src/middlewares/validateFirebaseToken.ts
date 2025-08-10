// src/middlewares/validateFirebaseToken.ts
import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebase'; // tu instancia ya configurada

async function validateFirebaseToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('⚠ Token no proporcionado o formato inválido');
    return res.status(401).json({ error: 'Token no proporcionado o inválido' });
  }

  const idToken = authHeader.split('Bearer ')[1].trim();

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    (req as any).user  = decodedToken; // TS reconocerá user si tienes la extensión global en types/express.d.ts
    next();
  } catch (error) {
    console.error('❌ Token inválido o expirado');
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

export default validateFirebaseToken;
