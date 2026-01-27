import { api } from './api';
import type { Post } from '@/types/post';

export const postsService = {
  async getByUserId(userId: number): Promise<Post[]> {
    return api<Post[]>(`/users/${userId}/posts`);
  },
  async getAll(): Promise<Post[]> {
    return api<Post[]>('/posts');
  },
};
