"use client";

import { useState } from "react";
import { postsService } from "@/services/posts.service";
import type { Post } from "@/types/post";
import styles from "./EditPostModal.module.scss";

interface Props {
  onClose: () => void;
  onCreated: (post: Post) => void;
}

export function CreatePostModal({ onClose, onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(true);
  const [pdfs, setPdfs] = useState<File[]>([]);
  const [video, setVideo] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const post = await postsService.create({
        title,
        content,
        published,
      });
  
      if (pdfs.length > 0 || video) {
        try {
          await postsService.uploadMedia(post.id, { pdfs, video });
        } catch (e) {
          console.warn("Upload média échoué", e);
        }
      }
  
      onCreated({
        ...post,
        medias: [],
      });
  
      onClose();
    } catch (e) {
      setError("Erreur lors de la création du post.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>Ajouter un post</h3>

        {error && <p className={styles.error}>{error}</p>}

        <input
          className={styles.input}
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className={styles.textarea}
          placeholder="Contenu"
          value={content}
          rows={6}
          onChange={(e) => setContent(e.target.value)}
        />

        <div>
          <label>PDF</label>
          <input
            type="file"
            multiple
            accept="application/pdf"
            onChange={(e) => setPdfs(Array.from(e.target.files ?? []))}
          />
        </div>

        <div>
          <label>Vidéo</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files?.[0])}
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            Publié
          </label>
        </div>

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
            onClick={handleCreate}
            disabled={loading}
          >
            {loading ? "Création…" : "Créer"}
          </button>
        </div>
      </div>
    </div>
  );
}
