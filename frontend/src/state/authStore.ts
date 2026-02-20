import { create } from 'zustand';
import { login, me, signup } from '../api/authApi';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  initialize: () => Promise<void>;
  signupUser: (payload: { name: string; email: string; password: string }) => Promise<void>;
  loginUser: (payload: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  initialize: async () => {
    if (!localStorage.getItem('token')) return;
    try {
      const { data } = await me();
      set({ user: data.user, token: localStorage.getItem('token') });
    } catch {
      localStorage.removeItem('token');
      set({ user: null, token: null });
    }
  },
  signupUser: async (payload) => {
    set({ loading: true });
    const { data } = await signup(payload);
    localStorage.setItem('token', data.token);
    set({ user: data.user, token: data.token, loading: false });
  },
  loginUser: async (payload) => {
    set({ loading: true });
    const { data } = await login(payload);
    localStorage.setItem('token', data.token);
    set({ user: data.user, token: data.token, loading: false });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  }
}));
