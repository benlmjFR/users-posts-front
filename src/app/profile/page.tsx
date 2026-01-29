"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { GlassCard } from "@/components/molecules/GlassCard";
import { ProfileWidget } from "@/components/organisms/ProfileWidget";
import { User } from "@/types/user";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  console.log({ user });

  useEffect(() => {
    api("/users/profile")
      .then(setUser)
      .catch(() => router.replace("/"))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return <p style={{ padding: 40 }}>Vérification…</p>;
  }

  return (
    <main style={{ padding: 40 }}>
      <h2>Mon profil</h2>
      <GlassCard>{user && <ProfileWidget user={user} />}</GlassCard>
    </main>
  );
}
