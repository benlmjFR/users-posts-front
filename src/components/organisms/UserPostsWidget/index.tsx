import { PostItem } from "@/app/posts/PostItem";
import { GlassCard } from "@/components/molecules/GlassCard";
import type { Post } from "@/types/post";

interface UserPostsWidgetProps {
  posts: Post[];
}

export function UserPostsWidget({ posts }: UserPostsWidgetProps) {
  return (
    <GlassCard>
      <h3>Mes posts</h3>
      <div>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </GlassCard>
  );
}
