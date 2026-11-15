import { useBooth } from '../../context/BoothContext.jsx';
import { LAYOUTS } from '../../utils/grids.js';
import GridCard from './GridCard.jsx';
import styles from './GridPicker.module.css';

export default function GridPicker() {
  const { state, dispatch } = useBooth();

  const pick = ({ cols, rows }) => {
    if (cols === state.cols && rows === state.rows) return;
    dispatch({ type: 'SET_GRID', cols, rows });
  };

  return (
    <div className={styles.grid} role="radiogroup" aria-label="Layout">
      {LAYOUTS.map((l) => (
        <GridCard key={`${l.cols}x${l.rows}`} layout={l} selected={l.cols === state.cols && l.rows === state.rows} onSelect={pick} />
      ))}
    </div>
  );
}
