import { Post } from "@/types/post";
import { GlassCard } from "@/components/molecules/GlassCard";
import classNames from "classnames";
import styles from "./PostItem.module.scss";
import { MediaRenderer } from "@/utils/MediaRenderer";

interface Props {
  post: Post;
}

export function PostItem({ post }: Props) {
  return (
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
          {/* <span className={styles.author}>{post.author.email}</span> */}
        </header>

        <p className={styles.content}>{post.content}</p>

        {post.medias.length > 0 && (
          <section className={styles.medias}>
            {post.medias.map((media) => (
              <MediaRenderer key={media.id} media={media} title={post.title} />
            ))}
          </section>
        )}
      </article>
    </GlassCard>
  );
}
