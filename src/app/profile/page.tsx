"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { postsService } from "@/services/posts.service";
import { GlassCard } from "@/components/molecules/GlassCard";
import { ProfileWidget } from "@/components/organisms/ProfileWidget";
import { User } from "@/types/user";
import { Post } from "@/types/post";
import { Button } from "@/components/atoms/Button";
import { UserPostsWidget } from "@/components/organisms/UserPostsWidget";
import { AuthButton } from "@/components/molecules/AuthButton/AuthButton/AuthButton";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<User>("/users/profile")
      .then(setUser)
      .catch(() => router.replace("/"))
      .finally(() => setLoading(false));
  }, [router]);

  useEffect(() => {
    if (!user) return;

    postsService
      .getMine()
      .then(setPosts)
      .catch((err: unknown) => {
        console.error("Erreur chargement posts", err);
      });
  }, [user]);

  if (loading) {
    return <p style={{ padding: 40 }}>Vérification…</p>;
  }

  return (
    <main
      style={{ padding: 40, display: "flex", flexDirection: "column", gap: 20 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Mon profil</h2>
        <div
          style={{
            padding: 40,
            display: "flex",
            gap: 20,
          }}
        >
          <Button
            label="Voir tous les posts"
            onClick={() => router.push("/posts")}
          />
          <AuthButton />
        </div>
      </div>

      <GlassCard>
        <h2>Mes infos</h2>
        {user && <ProfileWidget user={user} />}
      </GlassCard>

      <UserPostsWidget posts={posts} />
    </main>
  );
}
