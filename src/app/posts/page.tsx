"use client";

import { useEffect, useState } from "react";
import { postsService } from "@/services/posts.service";
import { GlassCard } from "@/components/molecules/GlassCard";
import { Post } from "@/types/post";
import { Button } from "@/components/atoms/Button";
import { useRouter } from "next/navigation";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    postsService
      .getAll()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ padding: 40 }}>Chargement…</p>;
  }

  return (
    <main style={{ padding: 40 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Mon profil</h2>
        <Button
          label="revenir au profil"
          onClick={() => router.push("/profile")}
        />
      </div>
      <GlassCard>
        <h2>Tous les posts</h2>

        {posts.length === 0 && <p>Aucun post publié.</p>}

        <ul style={{ marginTop: 20 }}>
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: 12 }}>
              <strong>{post.title}</strong>
            </li>
          ))}
        </ul>
      </GlassCard>
    </main>
  );
}
