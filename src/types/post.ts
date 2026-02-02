export interface Author {
  id: number;
  email: string;
  role: string
}

export interface Media {
  id: number;
  url: string;
  type: "PDF" | "VIDEO";
}

export interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;

  authorId: number;
  author: Author;

  medias: Media[];
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
  published?: boolean;
}

