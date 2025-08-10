// src/services/profileService.ts

import type { Profile } from "../models/Profile";
import { apiRequest } from './apiClient';

export async function createProfile(data: Omit<Profile, 'userId'>): Promise<Profile> {
  return apiRequest<Profile>('/profile/create', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getProfile(): Promise<Profile | null> {
  return apiRequest<Profile>('/profile/me', {
    method: 'GET',
  });
}

export async function updateProfile(data: Partial<Omit<Profile, 'userId'>>): Promise<Profile> {
  return apiRequest<Profile>('/profile/update', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
