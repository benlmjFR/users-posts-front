import { PostItem } from "@/app/posts/PostItem";
import { GlassCard } from "@/components/molecules/GlassCard";
import type { Post } from "@/types/post";

interface UserPostsWidgetProps {
  posts: Post[];
  onPostUpdated?: (post: Post) => void;
  onPostDeleted?: (id: number) => void;
}

export function UserPostsWidget({
  posts,
  onPostUpdated,
  onPostDeleted,
}: UserPostsWidgetProps) {
  return (
    <GlassCard>
      <h3>Mes posts</h3>
      <div>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onUpdated={onPostUpdated}
            onDeleted={onPostDeleted}
          />
        ))}
      </div>
    </GlassCard>
  );
}
