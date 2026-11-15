import machineImg from '../../assets/images/booth-machine.png';
import { COL_WIDTH_FRACTION, MACHINE_ASPECT, MACHINE_IN_MS, PRINT_MS, PRINT_STEPS, SLOT_Y } from '../../constants/animation.js';
import { useViewport } from '../../hooks/useViewport.js';
import { stripAspect } from '../../utils/canvas.js';
import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import styles from './PrinterAnimation.module.css';

/** Full-screen overlay: the photo-booth machine slides in and prints the strip out of its slot. */
export default function PrinterAnimation({ phase, src, cols, rows, onDownloadAgain, onTakeAnother, onClose }) {
  const { w: vw, h: vh } = useViewport();
  if (phase === 'idle') return null;

  const f = COL_WIDTH_FRACTION[cols] ?? 0.5;
  const inv = stripAspect(cols, rows);
  const M = Math.max(200, Math.min(640, vw * 0.92, (vh * 0.72) / (MACHINE_ASPECT * SLOT_Y + f * inv)));
  const slotTop = M * MACHINE_ASPECT * SLOT_Y;
  const stripW = f * M;
  const stripH = stripW * inv;
  const stageH = Math.max(M * MACHINE_ASPECT, slotTop + stripH);
  const done = phase === 'done';

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Printing your polaroid">
      <div className={styles.stage} style={{ width: M, height: stageH, '--print-ms': `${PRINT_MS}ms`, '--steps': PRINT_STEPS, '--in-ms': `${MACHINE_IN_MS}ms` }}>
        <img className={styles.machine} src={machineImg} alt="" style={{ width: M }} draggable="false" />
        <div className={styles.mask} style={{ top: slotTop, left: (M - stripW) / 2, width: stripW, height: stripH }}>
          <img className={`${styles.strip} ${styles[phase]}`} src={src} alt="Your finished polaroid strip" draggable="false" />
        </div>
      </div>

      <div className={styles.bar} aria-live="polite">
        {done ? (
          <>
            <Button variant="accent" icon={<Icon name="download" size={18} />} onClick={onDownloadAgain}>Download again</Button>
            <Button variant="secondary" icon={<Icon name="camera" size={18} />} onClick={onTakeAnother}>Take another</Button>
            <Button variant="ghost" className={styles.light} onClick={onClose}>Back to editing</Button>
          </>
        ) : (
          <p className={styles.status}>Printing your polaroid…</p>
        )}
      </div>
    </div>
  );
}
