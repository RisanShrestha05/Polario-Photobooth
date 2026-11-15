import styles from './SegmentedControl.module.css';

/** options: [{ value, label, disabled? }] */
export default function SegmentedControl({ label, options, value, onChange, disabled = false, className = '' }) {
  return (
    <div className={`${styles.group} ${className}`} role="radiogroup" aria-label={label}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={disabled || o.disabled}
            className={`${styles.seg} ${active ? styles.active : ''}`}
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
