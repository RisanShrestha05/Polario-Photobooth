import StepNav from './StepNav.jsx';
import styles from './PageFrame.module.css';

/** Headline + content + bottom navigation. No step bar, no subtitle. */
export default function PageFrame({ title, nav, children }) {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.content}>{children}</div>
      {nav && (
        <div className={styles.navWrap}>
          <StepNav {...nav} />
        </div>
      )}
    </main>
  );
}
