import styles from './GlassCard.module.scss';

interface Props {
  children: React.ReactNode;
}

export const GlassCard = ({ children }: Props) => (
  <div className={styles.card}>{children}</div>
);
