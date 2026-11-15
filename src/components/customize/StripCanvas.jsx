import { useEffect, useRef } from 'react';
import { PREVIEW_MAX_CELL } from '../../constants/config.js';
import { drawStrip } from '../../utils/canvas.js';

/** Renders the strip once; the same drawing code produces the downloaded file. */
export default function StripCanvas({ photos, cols, rows, frameColor, caption, captionColor, className }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) drawStrip(ref.current, photos, { cols, rows, frameColor, caption, captionColor }, PREVIEW_MAX_CELL);
  }, [photos, cols, rows, frameColor, caption, captionColor]);

  return <canvas ref={ref} className={className} style={{ width: '100%', height: 'auto', display: 'block' }} aria-label="Your polaroid strip" />;
}
