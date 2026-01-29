import { api } from './api';
import type { Post } from '@/types/post';

export const postsService = {
  async getMine(): Promise<Post[]> {
    return api<Post[]>(`/posts/me`);
  },
  async getAll(): Promise<Post[]> {
    return api<Post[]>('/posts');
  },
};
