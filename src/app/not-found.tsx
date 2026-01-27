import Link from "next/link";
import { GlassCard } from "@/components/molecules/GlassCard";
import styles from "./error.module.scss";

export default function NotFound() {
  return (
    <main className={styles.wrapper}>
      <GlassCard>
        <div className={styles.content}>
          <span className={styles.icon} aria-hidden>
            404
          </span>
          <h1 className={styles.title}>Page introuvable</h1>
          <p className={styles.message}>
            La page que vous cherchez n&apos;existe pas ou a été déplacée.
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
