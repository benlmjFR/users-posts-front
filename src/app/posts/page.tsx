"use client";

import { useEffect, useState } from "react";
import { postsService } from "@/services/posts.service";
import { Post } from "@/types/post";
import { PostItem } from "./PostItem";
import { AuthButton } from "@/components/molecules/AuthButton/AuthButton/AuthButton";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const handlePostUpdated = (updated: Post) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === updated.id
          ? {
              ...p,
              ...updated,
              medias: updated.medias ?? p.medias ?? [],
            }
          : p,
      ),
    );
  };

  const handlePostDeleted = (id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  useEffect(() => {
    postsService
      .getAll()
      .then((data) =>
        setPosts(
          data.map((p) => ({
            ...p,
            medias: p.medias ?? [],
          })),
        ),
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: 40 }}>Chargement…</p>;

  return (
    <main style={{ padding: 40 }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <h2>Tous les posts</h2>
        <AuthButton />
      </header>

      {posts.length === 0 && <p>Aucun post.</p>}

      <div style={{ display: "grid", gap: 20 }}>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onUpdated={handlePostUpdated}
            onDeleted={handlePostDeleted}
          />
        ))}
      </div>
    </main>
  );
}
