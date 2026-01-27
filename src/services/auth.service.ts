import { api } from './api';
import type { User } from '@/types/user';

export const login = (email: string, password: string) =>
  api<{ user?: User; token?: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const register = (email: string, password: string) =>
  api<{ user?: User; token?: string }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    return await api<User>('/users/me');
  } catch {
    return null;
  }
};
