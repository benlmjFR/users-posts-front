"use client";

import { useState } from "react";
import { Post } from "@/types/post";
import { postsService } from "@/services/posts.service";
import styles from "./EditPostModal.module.scss";

interface Props {
  post: Post;
  onClose: () => void;
  onUpdated?: (post: Post) => void;  
  onDeleted?: (id: number) => void;
}

export function EditPostModal({ post, onClose, onUpdated }: Props) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [published, setPublished] = useState(post.published);

  const [pdfs, setPdfs] = useState<File[]>([]);
  const [video, setVideo] = useState<File | undefined>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      await postsService.update(post?.id, {
        title,
        content,
        published,
      });

      if (pdfs.length > 0 || video) {
        await postsService.uploadMedia(post.id, {
          pdfs,
          video,
        });
      }

      onUpdated && onUpdated(post);
      onClose();
    } catch (e) {
      console.error(e);
      setError("Erreur lors de la mise à jour.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMedia = async (mediaId: number) => {
    try {
      await postsService.removeMedia(mediaId);
      onUpdated && onUpdated(post);
    } catch {
      alert("Erreur suppression média");
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>Modifier le post</h3>

        {error && <p className={styles.error}>{error}</p>}

        <input
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className={styles.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <span>Publié</span>
        </label>

        {/* Médias existants */}
        {post.medias?.map((media) => (
          <div key={media.id} className={styles.mediaItem}>
            {media.type === "VIDEO" && (
              <video src={media.url} controls width={200} />
            )}
            {media.type === "PDF" && (
              <a href={media.url} target="_blank">
                PDF
              </a>
            )}
            <button onClick={() => handleRemoveMedia(media.id)}>
              Supprimer
            </button>
          </div>
        ))}

        <input
          type="file"
          multiple
          accept="application/pdf"
          onChange={(e) => setPdfs(Array.from(e.target.files ?? []))}
        />

        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files?.[0])}
        />

        <div className={styles.actions}>
          <button onClick={onClose}>Annuler</button>
          <button onClick={handleSave} disabled={loading}>
            {loading ? "…" : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}
