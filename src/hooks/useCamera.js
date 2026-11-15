import { useCallback, useEffect, useState } from 'react';
import { RESOLUTIONS } from '../constants/config.js';

const FATAL = ['NotAllowedError', 'SecurityError', 'NotFoundError'];

/** 1080p first, then 720p, then 480p, then whatever the device offers. */
async function openCamera() {
  for (const { width, height } of RESOLUTIONS) {
    // landscape first, then portrait-swapped (many phones report it that way)
    for (const [w, h] of [[width, height], [height, width]]) {
      try {
        return await navigator.mediaDevices.getUserMedia({
          video: { width: { exact: w }, height: { exact: h }, facingMode: 'user' },
          audio: false,
        });
      } catch (e) {
        if (FATAL.includes(e.name)) throw e;
      }
    }
  }
  try {
    return await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
  } catch (e) {
    if (FATAL.includes(e.name)) throw e;
    return navigator.mediaDevices.getUserMedia({ video: true, audio: false });
  }
}

export function useCamera(videoRef) {
  const [status, setStatus] = useState('starting'); // starting | ready | error
  const [error, setError] = useState(null);
  const [resolution, setResolution] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let stream;
    let cancelled = false;
    setStatus('starting');
    setError(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      setError('unsupported');
      setStatus('error');
      return undefined;
    }

    openCamera()
      .then((s) => {
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop());
          return;
        }
        stream = s;
        const video = videoRef.current;
        if (video) {
          video.srcObject = s;
          video.play?.().catch(() => {});
        }
        const { width, height } = s.getVideoTracks()[0].getSettings();
        setResolution({ width, height });
        setStatus('ready');
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e.name === 'NotAllowedError' || e.name === 'SecurityError' ? 'denied' : e.name === 'NotFoundError' ? 'missing' : 'busy');
        setStatus('error');
      });

    return () => {
      cancelled = true;
      stream?.getTracks().forEach((t) => t.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
    };
  }, [videoRef, attempt]);

  const retry = useCallback(() => setAttempt((a) => a + 1), []);
  return { status, error, resolution, retry };
}
