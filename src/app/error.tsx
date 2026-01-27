"use client";

import { useEffect } from "react";
import { GlassCard } from "@/components/molecules/GlassCard";
import { Button } from "@/components/atoms/Button";
import styles from "./error.module.scss";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.wrapper}>
      <GlassCard>
        <div className={styles.content}>
          <span className={styles.icon} aria-hidden>
            ⚠️
          </span>
          <h1 className={styles.title}>Une erreur est survenue</h1>
          <p className={styles.message}>
            Quelque chose s&apos;est mal passé. Vous pouvez réessayer ou retourner à l&apos;accueil.
          </p>
          <div className={styles.actions}>
            <Button label="Réessayer" onClick={reset} />
            <Button
              label="Retour à l'accueil"
              onClick={() => (window.location.href = "/")}
            />
          </div>
        </div>
      </GlassCard>
    </main>
  );
}
