import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PageFrame from '../../components/layout/PageFrame.jsx';
import CameraView from '../../components/camera/CameraView.jsx';
import ReviewBar from '../../components/camera/ReviewBar.jsx';
import ShotProgress from '../../components/camera/ShotProgress.jsx';
import ShutterButton from '../../components/camera/ShutterButton.jsx';
import TimerPicker from '../../components/camera/TimerPicker.jsx';
import Button from '../../components/ui/Button.jsx';
import { useBooth } from '../../context/BoothContext.jsx';
import { useCamera } from '../../hooks/useCamera.js';
import { useCaptureSession } from '../../hooks/useCaptureSession.js';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts.js';
import styles from './Camera.module.css';

export default function Camera() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const { state, dispatch } = useBooth();
  const { cols, rows, timer, photos } = state;
  const total = cols * rows;

  const cam = useCamera(videoRef);
  const session = useCaptureSession({
    videoRef,
    firstDelay: timer,
    onShot: (index, photo) => dispatch({ type: 'SET_PHOTO', index, photo }),
  });

  const taken = photos.filter(Boolean).length;
  const complete = taken === total;
  const ready = cam.status === 'ready' && !session.running;

  const missing = () => photos.map((p, i) => (p ? null : i)).filter((i) => i !== null);
  const startShots = () => ready && !complete && session.run(missing());
  const retakeAll = () => {
    dispatch({ type: 'CLEAR_PHOTOS' });
    session.run(Array.from({ length: total }, (_, i) => i));
  };
  const retakeOne = (i) => ready && session.run([i]);
  const goBack = () => {
    session.cancel();
    navigate('/select');
  };

  useKeyboardShortcuts({ onCapture: startShots, onBack: goBack });

  const status = session.running && session.activeIndex !== null
    ? `Photo ${session.activeIndex + 1} of ${total}${session.count ? ` in ${session.count}…` : ''}`
    : null;

  return (
    <PageFrame
      title={total === 1 ? 'Take photo' : 'Take photos'}
      nav={{ onBack: goBack, backLabel: 'Change layout', onNext: () => navigate('/customize'), nextLabel: 'Customize', nextDisabled: !complete || session.running }}
    >
      <div className={styles.layout}>
        <CameraView
          ref={videoRef}
          status={cam.status}
          error={cam.error}
          resolution={cam.resolution}
          onRetry={cam.retry}
          count={session.count}
          flashKey={session.flashKey}
          shotLabel={status}
        />
        <aside className={styles.panel}>
          <TimerPicker value={timer} onChange={(t) => dispatch({ type: 'SET_TIMER', timer: t })} disabled={session.running} />
          {!complete && <ShutterButton onClick={startShots} disabled={!ready} />}
          {session.running && <Button variant="ghost" onClick={session.cancel}>Cancel</Button>}
          <p className={styles.count} aria-live="polite">{taken} of {total} taken</p>
          <ShotProgress cols={cols} rows={rows} photos={photos} activeIndex={session.activeIndex} canRetake={ready && complete} onRetake={retakeOne} />
          {complete && !session.running && <ReviewBar onRetakeAll={retakeAll} disabled={!ready} />}
        </aside>
      </div>
    </PageFrame>
  );
}
