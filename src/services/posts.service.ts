import { api } from './api';
import type { CreatePostDto, Post, UpdatePostDto } from '@/types/post';

export const postsService = {
  async getMine(): Promise<Post[]> {
    return api<Post[]>(`/posts/me`);
  },
  async getAll(): Promise<Post[]> {
    return api<Post[]>('/posts');
  },

    async create(dto: CreatePostDto): Promise<Post> {
    return api<Post>("/posts", {
      method: "POST",
      body: JSON.stringify(dto),
    });
  },

  async update(
    postId: number,
    dto: UpdatePostDto,
  ): Promise<Post> {
    return api<Post>(`/posts/${postId}`, {
      method: 'PATCH',
      body: JSON.stringify(dto),
    });
  },

  async remove(postId: number): Promise<void> {
    return api<void>(`/posts/${postId}`, {
      method: 'DELETE',
    });
  },

  async uploadMedia(
    postId: number,
    files: {
      pdfs?: File[];
      video?: File;
    },
  ) {
    const formData = new FormData();

    files.pdfs?.forEach((pdf) =>
      formData.append('pdfs', pdf),
    );

    if (files.video) {
      formData.append('video', files.video);
    }

    return api(`/posts/${postId}/media`, {
      method: 'POST',
      body: formData,
    });
  },

  async getOne(postId: number): Promise<Post> {
  return api<Post>(`/posts/${postId}`);
},


  async removeMedia(mediaId: number): Promise<void> {
    return api<void>(`/posts/media/${mediaId}`, {
      method: 'DELETE',
    });
  },
};

