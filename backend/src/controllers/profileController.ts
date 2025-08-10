// src/controllers/profileController.ts
import { Request, Response } from 'express';
import * as profileService from '../services/profileService';
import { Profile } from '../models/Profile';

// Crear perfil (userId obligatorio, datos en body)
export async function createProfile(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.uid;
    if (!userId) return res.status(401).json({ error: 'No autorizado' });

    const data: Profile = req.body;

    // Aquí podrías agregar validaciones básicas si quieres

    const newProfile = await profileService.createProfile(userId, data);
    return res.status(201).json(newProfile);
  } catch (error: any) {
    console.error('Error al crear perfil:', error);
    if (error.message === 'Perfil ya existe') {
      return res.status(409).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// Obtener perfil por userId (debe venir autenticado y con userId en req.user.uid)
export async function getProfile(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.uid;
    if (!userId) return res.status(401).json({ error: 'No autorizado' });

    const profile = await profileService.getProfile(userId);
    if (!profile) return res.status(404).json({ error: 'Perfil no encontrado' });

    return res.json(profile);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// Actualizar perfil parcialmente
export async function updateProfile(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.uid;
    if (!userId) return res.status(401).json({ error: 'No autorizado' });

    const data: Partial<Profile> = req.body;

    const updatedProfile = await profileService.updateProfile(userId, data);
    if (!updatedProfile) return res.status(404).json({ error: 'Perfil no encontrado' });

    return res.json(updatedProfile);
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// Eliminar perfil
export async function deleteProfile(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.uid;
    if (!userId) return res.status(401).json({ error: 'No autorizado' });

    const deleted = await profileService.deleteProfile(userId);
    if (!deleted) return res.status(404).json({ error: 'Perfil no encontrado' });

    return res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar perfil:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
