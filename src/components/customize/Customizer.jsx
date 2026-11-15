import { CAPTION_MAX, DEFAULT_CAPTION } from '../../constants/config.js';
import { CAPTION_COLORS, FRAME_COLORS, isLowContrast } from '../../constants/palettes.js';
import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import ColorSwatches from './ColorSwatches.jsx';
import styles from './Customizer.module.css';

export default function Customizer({ caption, frameColor, captionColor, onCaption, onFrame, onCaptionColor, onReset, onDownload, busy }) {
  const lowContrast = isLowContrast(frameColor, captionColor);
  return (
    <section className={styles.panel} aria-label="Customize your polaroid">
      <label className={styles.field}>
        <span className={styles.label}>Caption</span>
        <input type="text" value={caption} maxLength={CAPTION_MAX} placeholder={DEFAULT_CAPTION} onChange={(e) => onCaption(e.target.value)} />
        <span className={styles.counter}>{caption.length}/{CAPTION_MAX}</span>
      </label>

      <ColorSwatches label="Frame color" colors={FRAME_COLORS} value={frameColor} onChange={onFrame} />
      <ColorSwatches label="Caption color" colors={CAPTION_COLORS} value={captionColor} onChange={onCaptionColor} against={frameColor} />

      {lowContrast && <p className={styles.warn} role="status"><Icon name="alert" size={16} /> The caption may be hard to read on this frame. Try another caption color.</p>}

      <div className={styles.actions}>
        <Button variant="secondary" onClick={onReset}>Reset</Button>
        <Button variant="accent" icon={<Icon name="download" size={18} />} onClick={onDownload} disabled={busy} data-testid="download-btn">
          Download
        </Button>
      </div>
    </section>
  );
}
