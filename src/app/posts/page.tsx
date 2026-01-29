"use client";

import { useEffect, useState } from "react";
import { postsService } from "@/services/posts.service";
import { Post } from "@/types/post";
import { PostItem } from "./PostItem";
import { AuthButton } from "@/components/molecules/AuthButton/AuthButton/AuthButton";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postsService
      .getAll()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: 40 }}>Chargement…</p>;

  return (
    <main style={{ padding: 40 }}>
      {/* HEADER */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h2>Tous les posts</h2>

        <div style={{ display: "flex", gap: 12 }}>
          <AuthButton />
        </div>
      </header>

      {posts.length === 0 && <p>Aucun post.</p>}

      <div style={{ display: "grid", gap: 20, marginTop: 20 }}>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
