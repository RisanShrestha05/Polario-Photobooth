import { useCallback, useEffect, useRef, useState } from 'react';
import { MACHINE_IN_MS, PRINT_MS } from '../constants/animation.js';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** idle -> machineIn -> printing -> done. `onComplete` fires when the strip is fully out. */
export function usePrintAnimation() {
  const [phase, setPhase] = useState('idle');
  const timers = useRef([]);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const start = useCallback((onComplete) => {
    clear();
    if (prefersReducedMotion()) {
      setPhase('done');
      onComplete?.();
      return;
    }
    setPhase('machineIn');
    timers.current.push(
      setTimeout(() => setPhase('printing'), MACHINE_IN_MS),
      setTimeout(() => {
        setPhase('done');
        onComplete?.();
      }, MACHINE_IN_MS + PRINT_MS),
    );
  }, []);

  const reset = useCallback(() => {
    clear();
    setPhase('idle');
  }, []);

  useEffect(() => clear, []);
  return { phase, start, reset };
}
