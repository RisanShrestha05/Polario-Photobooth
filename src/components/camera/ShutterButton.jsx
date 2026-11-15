import styles from './ShutterButton.module.css';

export default function ShutterButton({ onClick, disabled }) {
  return (
    <button type="button" className={styles.btn} onClick={onClick} disabled={disabled} aria-label="Start taking photos" data-testid="capture-btn">
      <span className={styles.ring} />
      <span className={styles.inner} />
    </button>
  );
}
