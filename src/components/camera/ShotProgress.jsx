import styles from './ShotProgress.module.css';

/** The chosen grid in miniature: filled cells show the photo, tap one to retake it. */
export default function ShotProgress({ cols, rows, photos, activeIndex, canRetake, onRetake }) {
  return (
    <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, '--cols': cols }}>
      {Array.from({ length: cols * rows }, (_, i) => {
        const photo = photos[i];
        const active = i === activeIndex;
        return photo ? (
          <button key={i} type="button" className={`${styles.cell} ${active ? styles.active : ''}`} disabled={!canRetake} onClick={() => onRetake(i)} aria-label={`Retake photo ${i + 1}`}>
            <img src={photo.thumb} alt={`Photo ${i + 1}`} />
            {canRetake && <span className={styles.retake}>Retake</span>}
          </button>
        ) : (
          <div key={i} className={`${styles.cell} ${styles.empty} ${active ? styles.active : ''}`} aria-label={`Photo ${i + 1} not taken yet`}>{i + 1}</div>
        );
      })}
    </div>
  );
}
