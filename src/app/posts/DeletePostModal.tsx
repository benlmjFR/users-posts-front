"use client";

import { useState } from "react";
import { Post } from "@/types/post";
import { postsService } from "@/services/posts.service";
import styles from "./EditPostModal.module.scss";

interface Props {
  post: Post;
  onClose: () => void;
  onDeleted?: (id: number) => void;
}

export function DeletePostModal({ post, onClose, onDeleted }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await postsService.remove(post.id);
      onDeleted?.(post.id);
      onClose();
    } catch {
      alert("Erreur lors de la suppression");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>Supprimer le post</h3>

        <p>
          Supprimer définitivement :
          <br />
          <strong>{post.title}</strong>
        </p>

        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles.cancel}`}
            onClick={onClose}
            disabled={loading}
          >
            Annuler
          </button>

          <button
            className={`${styles.button} ${styles.danger}`}
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Suppression..." : "Supprimer"}
          </button>
        </div>
      </div>
    </div>
  );
}
