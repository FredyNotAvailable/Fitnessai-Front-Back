// src/hooks/useProfile.ts
import { useState, useEffect, useCallback } from 'react';
import type { Profile } from '../models/Profile';
import { getProfile, updateProfile, createProfile } from '../services/profileService';

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar el perfil al montar el hook
  useEffect(() => {
    setLoading(true);
    getProfile()
      .then((data) => {
        setProfile(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || 'Error al obtener el perfil');
        setProfile(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // Crear perfil
  const create = useCallback(async (data: Omit<Profile, 'userId'>) => {
    setLoading(true);
    try {
      const newProfile = await createProfile(data);
      setProfile(newProfile);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al crear el perfil');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar perfil
  const update = useCallback(async (data: Partial<Omit<Profile, 'userId'>>) => {
    setLoading(true);
    try {
      const updatedProfile = await updateProfile(data);
      setProfile(updatedProfile);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el perfil');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    profile,
    loading,
    error,
    create,
    update,
  };
}
