import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import styles from './ReviewBar.module.css';

export default function ReviewBar({ onRetakeAll, disabled }) {
  return (
    <div className={styles.bar}>
      <p>All photos taken. Tap any photo above to retake just that one.</p>
      <Button variant="secondary" icon={<Icon name="refresh" size={18} />} onClick={onRetakeAll} disabled={disabled}>
        Retake all
      </Button>
    </div>
  );
}
