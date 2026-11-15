import styles from './PhotoStrip.module.css';

/** A decorative tilted strip of three photos. */
export default function PhotoStrip({ photos, paper = '#d9ccf5', rotate = 0, className = '' }) {
  return (
    <div className={`${styles.strip} ${className}`} style={{ background: paper, transform: `rotate(${rotate}deg)` }} aria-hidden="true">
      {photos.map((src, i) => <img key={i} src={src} alt="" draggable="false" />)}
    </div>
  );
}
