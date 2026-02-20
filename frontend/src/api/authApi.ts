import { api } from './client';

export const signup = (payload: { name: string; email: string; password: string }) =>
  api.post('/auth/signup', payload);

export const login = (payload: { email: string; password: string }) => api.post('/auth/login', payload);

export const me = () => api.get('/auth/me');
