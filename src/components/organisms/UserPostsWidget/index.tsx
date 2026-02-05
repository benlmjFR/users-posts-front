"use client";

import { useState } from "react";
import type { Post } from "@/types/post";
import { Button } from "@/components/atoms/Button";
import { CreatePostModal } from "@/app/posts/CreatePostModal";
import { PostItem } from "@/app/posts/PostItem";

interface Props {
  posts: Post[];
  onPostsRefresh: () => void;
}

export function UserPostsWidget({
  posts,
  onPostsRefresh,
}: Props) {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Mes posts</h2>

        <Button label="+ Ajouter un post" onClick={() => setCreateOpen(true)} />
      </div>

      {posts.length === 0 && <p>Aucun post.</p>}

      <div style={{ display: "grid", gap: 20 }}>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onUpdated={() => onPostsRefresh()}   
            onDeleted={() => onPostsRefresh()}  
          />
        ))}
      </div>

      {createOpen && (
        <CreatePostModal
          onClose={() => setCreateOpen(false)}
          onCreated={() => {
            setCreateOpen(false);
            onPostsRefresh(); 
          }}
        />
      )}
    </>
  );
}
