import { useEffect, useRef } from 'react';

/** Space/Enter -> onCapture, Esc -> onBack. Ignored while a form control has focus. */
export function useKeyboardShortcuts({ onCapture, onBack }, enabled = true) {
  const handlers = useRef({ onCapture, onBack });
  handlers.current = { onCapture, onBack };

  useEffect(() => {
    if (!enabled) return undefined;
    const onKey = (e) => {
      const tag = e.target?.tagName;
      const inControl = ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(tag);
      if (e.code === 'Escape') {
        handlers.current.onBack?.();
        return;
      }
      if (inControl) return;
      if ((e.code === 'Space' || e.code === 'Enter') && handlers.current.onCapture) {
        e.preventDefault();
        handlers.current.onCapture();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [enabled]);
}
