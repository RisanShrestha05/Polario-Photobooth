import { TIMER_OPTIONS, BETWEEN_SHOT_DELAY } from '../../constants/config.js';
import SegmentedControl from '../ui/SegmentedControl.jsx';
import Icon from '../ui/Icon.jsx';
import styles from './TimerPicker.module.css';

export default function TimerPicker({ value, onChange, disabled }) {
  const options = TIMER_OPTIONS.map((s) => ({ value: s, label: `${s}s` }));
  return (
    <div className={styles.wrap}>
      <span className={styles.label}><Icon name="clock" size={18} /> First photo timer</span>
      <SegmentedControl label="Timer before the first photo" options={options} value={value} onChange={onChange} disabled={disabled} />
      <p className={styles.note}>Every photo after the first has a {BETWEEN_SHOT_DELAY}-second countdown.</p>
    </div>
  );
}
