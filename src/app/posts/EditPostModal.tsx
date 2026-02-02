"use client";

import { useState } from "react";
import { Post } from "@/types/post";
import { postsService } from "@/services/posts.service";
import styles from "./EditPostModal.module.scss";

interface Props {
  post: Post;
  onClose: () => void;
  onUpdated?: (post: Post) => void;
}

export function EditPostModal({ post, onClose, onUpdated }: Props) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [published, setPublished] = useState(post.published);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      const updated = await postsService.update(post.id, {
        title,
        content,
        published,
      });
      onUpdated?.(updated);
      onClose();
    } catch {
      alert("Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>Modifier le post</h3>

        <input
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre"
        />

        <textarea
          className={styles.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Contenu"
        />

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <span>Publié</span>
        </label>

        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles.cancel}`}
            onClick={onClose}
            disabled={loading}
          >
            Annuler
          </button>

          <button
            className={`${styles.button} ${styles.save}`}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}
