"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/molecules/GlassCard";
import styles from "../error.module.scss";

function getParams(): { token: string | null; error: string | null } {
  if (typeof window === "undefined") return { token: null, error: null };
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token") ?? params.get("access_token") ?? params.get("accessToken");
  const error = params.get("error");
  return { token, error };
}

function CallbackContent() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error" | "no-token">("loading");

  useEffect(() => {
    const { token, error } = getParams();

    if (error) {
      setStatus("error");
      return;
    }

    if (token) {
      localStorage.setItem("token", token);
      setStatus("success");
      router.replace("/profile");
      return;
    }

    setStatus("no-token");
  }, [router]);

  if (status === "error") {
    return (
      <main className={styles.wrapper}>
        <GlassCard>
          <div className={styles.content}>
            <span className={styles.icon} aria-hidden>
              🔐
            </span>
            <h1 className={styles.title}>Échec de la connexion</h1>
            <p className={styles.message}>
              La connexion avec Google n&apos;a pas abouti. Vous pouvez réessayer ou
              revenir à l&apos;accueil.
            </p>
            <div className={styles.actions}>
              <Link href="/" className={styles.link}>
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </GlassCard>
      </main>
    );
  }

  if (status === "no-token") {
    return (
      <main className={styles.wrapper}>
        <GlassCard>
          <div className={styles.content}>
            <span className={styles.icon} aria-hidden>
              🔑
            </span>
            <h1 className={styles.title}>Aucun token reçu</h1>
            <p className={styles.message}>
              Le backend doit rediriger vers cette page avec le token en query, par
              exemple&nbsp;: <code>/auth/callback?token=VOTRE_JWT</code>. Vérifiez
              la variable <code>FRONTEND_URL</code> et que la redirection envoie bien{" "}
              <code>?token=...</code>.
            </p>
            <div className={styles.actions}>
              <Link href="/" className={styles.link}>
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </GlassCard>
      </main>
    );
  }

  return (
    <main className={styles.wrapper}>
      <p className={styles.message}>
        {status === "success" ? "Redirection…" : "Connexion en cours…"}
      </p>
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
