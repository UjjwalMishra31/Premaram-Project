import { api } from './client';

export const updateProfile = (payload: { role: string; goal: string }) =>
  api.patch('/users/profile', payload);
