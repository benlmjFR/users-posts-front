"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { postsService } from "@/services/posts.service";
import { GlassCard } from "@/components/molecules/GlassCard";
import { ProfileWidget } from "@/components/organisms/ProfileWidget";
import { UserPostsWidget } from "@/components/organisms/UserPostsWidget";
import { Button } from "@/components/atoms/Button";
import { AuthButton } from "@/components/molecules/AuthButton/AuthButton/AuthButton";
import { Post } from "@/types/post";
import { useAuth } from "@/context/useAuth";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);

  // 🔐 Protection de la page
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  // 📦 Chargement des posts
  useEffect(() => {
    if (!user) return;

    postsService
      .getMine()
      .then((data) =>
        setPosts(
          data.map((p) => ({
            ...p,
            medias: p.medias ?? [],
          })),
        ),
      )
      .catch((err) => {
        console.error("Erreur chargement posts", err);
      });
  }, [user]);

  if (isLoading) {
    return <p style={{ padding: 40 }}>Vérification…</p>;
  }

  if (!user) {
    return null; // évite un flash
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
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <h2>Mon profil</h2>

        <div style={{ display: "flex", gap: 20 }}>
          <Button
            label="Voir tous les posts"
            onClick={() => router.push("/posts")}
          />
          <AuthButton />
        </div>
      </div>

      <GlassCard>
        <h2>Mes infos</h2>
        <ProfileWidget user={user} />
      </GlassCard>

      <UserPostsWidget
        posts={posts}
        onPostUpdated={(updated) =>
          setPosts((prev) =>
            prev.map((p) => (p.id === updated.id ? updated : p)),
          )
        }
        onPostDeleted={(id) =>
          setPosts((prev) => prev.filter((p) => p.id !== id))
        }
        onPostCreated={(post) =>
          setPosts((prev) => [post, ...prev])
        }
      />
    </main>
  );
}