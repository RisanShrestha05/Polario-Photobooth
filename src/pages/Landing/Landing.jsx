import { useNavigate } from 'react-router-dom';
import boothImg from '../../assets/images/booth-hero.png';
import cat1 from '../../assets/images/cat1.jpg';
import cat2 from '../../assets/images/cat2.jpg';
import cat3 from '../../assets/images/cat3.jpg';
import cat4 from '../../assets/images/cat4.jpg';
import { useCurtain } from '../../components/landing/CurtainTransition.jsx';
import PhotoStrip from '../../components/landing/PhotoStrip.jsx';
import styles from './Landing.module.css';

export default function Landing() {
  const navigate = useNavigate();
  const curtain = useCurtain();
  const start = () => curtain.close(() => navigate('/select'));

  return (
    <div className={styles.page}>
      <div className={`${styles.curtain} ${styles.curtainL}`} aria-hidden="true" />
      <div className={`${styles.curtain} ${styles.curtainR}`} aria-hidden="true" />

      <h1 className={styles.title}>Polario</h1>
      <p className={styles.tagline}>Your personal photobooth.</p>

      <div className={styles.row}>
        <PhotoStrip className={styles.outer} photos={[cat1, cat2, cat3]} paper="#d9ccf5" rotate={-6} />
        <PhotoStrip photos={[cat2, cat3, cat4]} paper="#f6b8c8" rotate={5} />
        <img className={styles.booth} src={boothImg} alt="A vintage photo booth with a red curtain" draggable="false" />
        <PhotoStrip photos={[cat4, cat1, cat2]} paper="#d9ccf5" rotate={-5} />
        <PhotoStrip className={styles.outer} photos={[cat3, cat4, cat1]} paper="#f6b8c8" rotate={6} />
      </div>

      <button className={styles.start} onClick={start} data-testid="start-session-btn">
        <span>Start Photo Session</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
