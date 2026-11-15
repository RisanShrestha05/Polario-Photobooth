import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import styles from './CameraError.module.css';

const MESSAGES = {
  denied: ['Camera access is blocked', 'Allow camera access in your browser’s address bar, then try again.'],
  missing: ['No camera found', 'Connect a camera and try again.'],
  busy: ['The camera is in use', 'Close other apps or tabs using the camera, then try again.'],
  unsupported: ['This browser can’t open the camera', 'Try a recent Chrome, Edge, Firefox or Safari, over HTTPS or localhost.'],
};

export default function CameraError({ kind, onRetry }) {
  const [title, body] = MESSAGES[kind] || MESSAGES.busy;
  return (
    <div className={styles.box} role="alert">
      <Icon name="alert" size={36} />
      <h2>{title}</h2>
      <p>{body}</p>
      <Button variant="accent" icon={<Icon name="refresh" size={18} />} onClick={onRetry}>Try again</Button>
    </div>
  );
}
