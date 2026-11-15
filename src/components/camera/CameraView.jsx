import { forwardRef } from 'react';
import CameraError from './CameraError.jsx';
import styles from './CameraView.module.css';

const resLabel = ({ width, height }) => `${Math.min(width, height)}p · ${width}×${height}`;

/** Square viewfinder: what you see is exactly what gets captured. */
const CameraView = forwardRef(function CameraView({ status, error, resolution, onRetry, count, flashKey, shotLabel }, ref) {
  return (
    <div className={styles.frame}>
      <video ref={ref} className={styles.video} autoPlay playsInline muted />
      <div className={styles.corners} aria-hidden="true" />
      {status === 'starting' && <div className={styles.loading}>Starting camera…</div>}
      {status === 'error' && <CameraError kind={error} onRetry={onRetry} />}
      {count > 0 && <div key={count} className={styles.count} aria-live="assertive">{count}</div>}
      {flashKey > 0 && <div key={`f${flashKey}`} className={styles.flash} aria-hidden="true" />}
      {shotLabel && <span className={styles.chip}>{shotLabel}</span>}
      {resolution && status === 'ready' && <span className={styles.badge}>{resLabel(resolution)}</span>}
    </div>
  );
});

export default CameraView;
