import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import styles from './CurtainTransition.module.css';

const CLOSE_MS = 1100;
const HOLD_MS = 250;
const OPEN_MS = 900;

const CurtainContext = createContext(null);

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Red velvet curtains that close over the screen, run `onClosed` (navigate) while hidden,
 * then open again on the next page.
 */
export function CurtainProvider({ children }) {
  const [phase, setPhase] = useState('open'); // open | closing | closed | opening
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const close = useCallback((onClosed) => {
    if (reducedMotion()) {
      onClosed?.();
      return;
    }
    setPhase('closing');
    timers.current.push(
      setTimeout(() => {
        setPhase('closed');
        onClosed?.();
      }, CLOSE_MS),
      setTimeout(() => setPhase('opening'), CLOSE_MS + HOLD_MS),
      setTimeout(() => setPhase('open'), CLOSE_MS + HOLD_MS + OPEN_MS),
    );
  }, []);

  const value = useMemo(() => ({ close }), [close]);

  return (
    <CurtainContext.Provider value={value}>
      {children}
      {phase !== 'open' && (
        <div className={`${styles.overlay} ${styles[phase]}`} aria-hidden="true">
          <div className={`${styles.panel} ${styles.left}`} />
          <div className={`${styles.panel} ${styles.right}`} />
        </div>
      )}
    </CurtainContext.Provider>
  );
}

export function useCurtain() {
  const ctx = useContext(CurtainContext);
  if (!ctx) throw new Error('useCurtain must be used inside <CurtainProvider>');
  return ctx;
}
