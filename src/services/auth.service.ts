import { fetchApi } from './api';
import type { User } from '@/types/user';

export const authService = {
  async getCurrentUser(): Promise<User | null> {
    try {
      return await fetchApi<User>('/users/me');
    } catch {
      return null;
    }
  },
};
