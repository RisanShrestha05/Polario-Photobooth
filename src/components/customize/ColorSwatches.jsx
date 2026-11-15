import { isLowContrast, readableOn } from '../../constants/palettes.js';
import Icon from '../ui/Icon.jsx';
import styles from './ColorSwatches.module.css';

/** Preset-only color picker. `against` marks swatches that would be hard to read on that color. */
export default function ColorSwatches({ label, colors, value, onChange, against }) {
  const selected = colors.find((c) => c.value === value);
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <span className={styles.label} id={`${label}-label`}>{label}</span>
        <span className={styles.name}>{selected?.name}</span>
      </div>
      <div className={styles.grid} role="radiogroup" aria-labelledby={`${label}-label`}>
        {colors.map((c) => {
          const active = c.value === value;
          const low = against ? isLowContrast(c.value, against) : false;
          return (
            <button
              key={c.value}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={`${c.name}${low ? ' (low contrast on this frame)' : ''}`}
              title={c.name + (low ? ' · low contrast' : '')}
              className={`${styles.swatch} ${active ? styles.active : ''} ${low ? styles.low : ''}`}
              style={{ background: c.value, color: readableOn(c.value) }}
              onClick={() => onChange(c.value)}
            >
              {active && <Icon name="check" size={16} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
