import Image from "next/image";
import styles from "./MediaRenderer.module.scss";

interface Media {
  id: number;
  url: string;
  type: "IMAGE" | "VIDEO" | "PDF";
}

interface Props {
  media: Media;
  title: string;
}

export function MediaRenderer({ media, title }: Props) {
  switch (media.type) {
    case "IMAGE":
      return (
        <Image
          src={media.url}
          alt={title}
          width={800}
          height={450}
          className={styles.image}
        />
      );

    case "VIDEO":
      return (
        <video controls className={styles.video}>
          <source src={media.url} />
        </video>
      );

    case "PDF":
      return (
        <a
          href={media.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.pdf}
        >
          📄 Ouvrir le PDF
        </a>
      );

    default:
      return null;
  }
}
