import Icon from './Icon.jsx';
import styles from './Toast.module.css';

export default function Toast({ toasts }) {
  return (
    <div className={styles.stack} role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`${styles.toast} ${styles[t.type]}`}>
          <Icon name={t.type === 'success' ? 'check' : 'alert'} size={18} />
          {t.message}
        </div>
      ))}
    </div>
  );
}
