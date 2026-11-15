import Icon from '../ui/Icon.jsx';
import StripPreview from './StripPreview.jsx';
import styles from './GridCard.module.css';

export default function GridCard({ layout, selected, onSelect }) {
  const { cols, rows, name } = layout;
  const n = cols * rows;
  return (
    <button type="button" role="radio" aria-checked={selected} className={`${styles.card} ${selected ? styles.selected : ''}`} onClick={() => onSelect(layout)}>
      {selected && <span className={styles.check}><Icon name="check" size={16} /></span>}
      <span className={styles.art}><StripPreview cols={cols} rows={rows} /></span>
      <span className={styles.meta}>
        <span className={styles.name}>{name}</span>
        <span className={styles.sub}>{cols}×{rows} · {n} {n === 1 ? 'photo' : 'photos'}</span>
      </span>
    </button>
  );
}
