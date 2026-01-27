import { GlassCard } from '@/components/molecules/GlassCard';
import type { Post } from '@/types/post';

interface UserPostsWidgetProps {
  posts: Post[];
}

export function UserPostsWidget({ posts }: UserPostsWidgetProps) {
  return (
    <GlassCard>
      <h3>Articles</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
