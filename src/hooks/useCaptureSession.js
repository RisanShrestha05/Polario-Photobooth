import { useCallback, useEffect, useRef, useState } from 'react';
import { BETWEEN_SHOT_DELAY } from '../constants/config.js';
import { captureFrame, makeThumb } from '../utils/canvas.js';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Runs a list of shot indices. The first shot counts down from `firstDelay`
 * (the user's timer); every later shot counts down BETWEEN_SHOT_DELAY (3s).
 */
export function useCaptureSession({ videoRef, firstDelay, onShot }) {
  const [running, setRunning] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [count, setCount] = useState(0);
  const [flashKey, setFlashKey] = useState(0);
  const cancelled = useRef(false);
  const busy = useRef(false);
  const onShotRef = useRef(onShot);
  onShotRef.current = onShot;

  useEffect(() => {
    cancelled.current = false;
    return () => {
      cancelled.current = true;
    };
  }, []);

  const run = useCallback(
    async (indices) => {
      if (busy.current || indices.length === 0) return;
      busy.current = true;
      cancelled.current = false;
      setRunning(true);

      for (let k = 0; k < indices.length; k++) {
        const index = indices[k];
        setActiveIndex(index);
        const seconds = k === 0 ? firstDelay : BETWEEN_SHOT_DELAY;
        for (let s = seconds; s > 0 && !cancelled.current; s--) {
          setCount(s);
          await wait(1000);
        }
        if (cancelled.current) break;
        setCount(0);
        const video = videoRef.current;
        if (!video || !video.videoWidth) break;
        const canvas = captureFrame(video);
        onShotRef.current(index, { canvas, thumb: makeThumb(canvas) });
        setFlashKey((f) => f + 1);
      }

      setActiveIndex(null);
      setCount(0);
      setRunning(false);
      busy.current = false;
    },
    [videoRef, firstDelay],
  );

  const cancel = useCallback(() => {
    cancelled.current = true;
  }, []);

  return { running, activeIndex, count, flashKey, run, cancel };
}
