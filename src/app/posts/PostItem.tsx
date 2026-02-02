"use client";

import { useState } from "react";
import { Post } from "@/types/post";
import { GlassCard } from "@/components/molecules/GlassCard";
import classNames from "classnames";
import styles from "./PostItem.module.scss";
import { MediaRenderer } from "@/utils/MediaRenderer";
import { Pencil, Trash2 } from "lucide-react";
import { useAuth } from "@/context/useAuth";
import { EditPostModal } from "./EditPostModal";
import { DeletePostModal } from "./DeletePostModal";

interface Props {
  post: Post;
  onUpdated?: (post: Post) => void;
  onDeleted?: (id: number) => void;
}

export function PostItem({ post, onUpdated, onDeleted }: Props) {
  const { user, isAuthenticated } = useAuth();

  const isOwner = user?.id === post.authorId;
  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

  const canEdit = isAuthenticated && isOwner && isAdmin;

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <GlassCard>
        <article
          className={classNames(
            styles.post,
            !post.published && styles.unpublished,
          )}
        >
          {!post.published && <span className={styles.badge}>Non publié</span>}

          <header className={styles.header}>
            <h3>{post.title}</h3>

            <div className={styles.headerRight}>
              <span>le {new Date(post.createdAt).toLocaleDateString()}</span>

              {canEdit && (
                <div className={styles.actions}>
                  <button onClick={() => setEditOpen(true)}>
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => setDeleteOpen(true)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>
          </header>

          <p className={styles.content}>{post.content}</p>

          {post?.medias?.length > 0 && (
            <section className={styles.medias}>
              {post.medias.map((media) => (
                <MediaRenderer
                  key={media.id}
                  media={media}
                  title={post.title}
                />
              ))}
            </section>
          )}
        </article>
      </GlassCard>

      {editOpen && (
        <EditPostModal
          post={post}
          onClose={() => setEditOpen(false)}
          onUpdated={onUpdated}
        />
      )}

      {deleteOpen && (
        <DeletePostModal
          post={post}
          onClose={() => setDeleteOpen(false)}
          onDeleted={onDeleted}
        />
      )}
    </>
  );
}
