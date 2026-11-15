import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import styles from './StepNav.module.css';

export default function StepNav({ onBack, backLabel = 'Back', onNext, nextLabel = 'Continue', nextDisabled = false }) {
  return (
    <nav className={styles.nav} aria-label="Step navigation">
      {onBack ? (
        <Button variant="secondary" icon={<Icon name="arrow-left" size={18} />} onClick={onBack}>
          {backLabel}
        </Button>
      ) : <span />}
      {onNext && (
        <Button variant="accent" iconRight={<Icon name="arrow-right" size={18} />} onClick={onNext} disabled={nextDisabled}>
          {nextLabel}
        </Button>
      )}
    </nav>
  );
}
