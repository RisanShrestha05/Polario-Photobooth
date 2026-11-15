import clipImg from '../../assets/images/clip-frame.png';
import { CLIP_ASPECT } from '../../constants/animation.js';
import { useViewport } from '../../hooks/useViewport.js';
import { stripAspect } from '../../utils/canvas.js';
import styles from './ClipViewer.module.css';

/** The strip hanging from a metal clip. The clip keeps its 1-column size; wider paper hangs below it. */
export default function ClipViewer({ cols, rows, children }) {
  const { w: vw, h: vh } = useViewport();
  const aspect = stripAspect(cols, rows);
  const clipRatio = 1.02 * CLIP_ASPECT / cols; // clip height per unit of paper width

  const availW = Math.min(vw * 0.9, 520);
  const availH = Math.max(160, vh - (vw < 900 ? 460 : 200)); // leaves room for title, controls and nav
  const paperW = Math.max(60, Math.min(availW, availH / (aspect + clipRatio)));
  const clipW = (paperW / cols) * 1.02;

  return (
    <div className={styles.hanger} style={{ width: paperW }}>
      <img className={styles.clip} src={clipImg} alt="" style={{ width: clipW }} draggable="false" />
      <div className={styles.paper}>{children}</div>
    </div>
  );
}
