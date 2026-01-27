import styles from './Button.module.scss';

interface Props {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export const Button = ({ label, onClick, type = 'button' }: Props) => (
  <button className={styles.button} onClick={onClick} type={type}>
    {label}
  </button>
);
