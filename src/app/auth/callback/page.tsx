"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/molecules/GlassCard";
import styles from "../../error.module.scss";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/profile");
  }, [router]);

  return (
    <main className={styles.wrapper}>
      <GlassCard>
        <p className={styles.message}>Connexion réussie, redirection…</p>
      </GlassCard>
    </main>
  );
}
