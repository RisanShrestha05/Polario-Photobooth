import { geometry } from '../../utils/canvas.js';
import styles from './StripPreview.module.css';

/** The layout drawn as an empty polaroid strip (no branding). */
export default function StripPreview({ cols, rows }) {
  const S = 100;
  const g = geometry(cols, rows, S);
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push(<rect key={`${r}-${c}`} x={g.pad + c * (S + g.gap)} y={g.pad + r * (S + g.gap)} width={S} height={S} rx="3" className={styles.cell} />);
    }
  }
  return (
    <svg className={styles.svg} viewBox={`0 0 ${g.width} ${g.height}`} aria-hidden="true">
      <rect width={g.width} height={g.height} rx="6" className={styles.paper} />
      {cells}
    </svg>
  );
}
