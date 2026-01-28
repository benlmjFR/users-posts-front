"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/molecules/GlassCard";
import styles from "../../error.module.scss";

function CallbackContent() {
  const router = useRouter();
  const params = useSearchParams();

  const error = params.get("error");
  const token =
    params.get("token") ??
    params.get("access_token") ??
    params.get("accessToken");

  useEffect(() => {
    if (!token || error) return;

    localStorage.setItem("token", token);
    router.replace("/profile");
  }, [token, error, router]);

  if (error) {
    return (
      <main className={styles.wrapper}>
        <GlassCard>
          <div className={styles.content}>
            <span className={styles.icon}>🔐</span>
            <h1 className={styles.title}>Échec de la connexion</h1>
            <p className={styles.message}>
              La connexion avec Google n&apos;a pas abouti.
            </p>
            <Link href="/" className={styles.link}>
              Retour à l&apos;accueil
            </Link>
          </div>
        </GlassCard>
      </main>
    );
  }

  if (!token) {
    return (
      <main className={styles.wrapper}>
        <GlassCard>
          <div className={styles.content}>
            <span className={styles.icon}>🔑</span>
            <h1 className={styles.title}>Aucun token reçu</h1>
            <p className={styles.message}>
              Le backend doit rediriger avec <code>?token=VOTRE_JWT</code>.
            </p>
            <Link href="/" className={styles.link}>
              Retour à l&apos;accueil
            </Link>
          </div>
        </GlassCard>
      </main>
    );
  }

  return (
    <main className={styles.wrapper}>
      <p className={styles.message}>Connexion réussie, redirection…</p>
    </main>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className={styles.wrapper}>
          <p className={styles.message}>Chargement…</p>
        </main>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
