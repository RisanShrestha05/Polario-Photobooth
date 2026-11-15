import {
  DEFAULT_CAPTION,
  EXPORT_MAX_CELL,
  EXPORT_MAX_PIXELS,
  THUMB_SIZE,
} from '../constants/config.js';

/** Grab the current video frame, centre-cropped to a square and mirrored like the preview. */
export function captureFrame(video) {
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  const s = Math.min(vw, vh);
  const canvas = document.createElement('canvas');
  canvas.width = s;
  canvas.height = s;
  const ctx = canvas.getContext('2d');
  ctx.translate(s, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, (vw - s) / 2, (vh - s) / 2, s, s, 0, 0, s, s);
  return canvas;
}

export function makeThumb(source, size = THUMB_SIZE) {
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  c.getContext('2d').drawImage(source, 0, 0, size, size);
  return c.toDataURL('image/jpeg', 0.82);
}

/** Strip geometry for a given photo size S. Photos are square; caption lives in the footer. */
export function geometry(cols, rows, S) {
  const pad = Math.round(S * 0.07);
  const gap = Math.round(S * 0.05);
  const foot = Math.round(S * 0.3);
  return {
    S,
    pad,
    gap,
    foot,
    width: pad * 2 + cols * S + (cols - 1) * gap,
    height: pad + rows * S + (rows - 1) * gap + foot,
  };
}

/** height / width of the strip (independent of pixel size). */
export function stripAspect(cols, rows) {
  const g = geometry(cols, rows, 1000);
  return g.height / g.width;
}

function pickCell(cols, rows, maxCell) {
  let S = maxCell;
  while (S > 64) {
    const g = geometry(cols, rows, S);
    if (g.width * g.height <= EXPORT_MAX_PIXELS) break;
    S = Math.floor(S * 0.95);
  }
  return S;
}

/** Draw the whole strip (paper, photo windows, caption) onto `canvas`. */
export function drawStrip(
  canvas,
  photos,
  { cols, rows, frameColor, caption, captionColor },
  maxCell = EXPORT_MAX_CELL,
) {
  const S = pickCell(cols, rows, maxCell);
  const g = geometry(cols, rows, S);
  canvas.width = g.width;
  canvas.height = g.height;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = frameColor;
  ctx.fillRect(0, 0, g.width, g.height);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = g.pad + c * (S + g.gap);
      const y = g.pad + r * (S + g.gap);
      const photo = photos[r * cols + c];
      ctx.fillStyle = '#ece7dc';
      ctx.fillRect(x, y, S, S);
      if (photo) ctx.drawImage(photo.canvas, x, y, S, S);
      ctx.strokeStyle = 'rgba(0,0,0,0.14)';
      ctx.lineWidth = Math.max(1, S * 0.004);
      ctx.strokeRect(x + 0.5, y + 0.5, S - 1, S - 1);
    }
  }

  const text = (caption || '').trim() || DEFAULT_CAPTION;
  const maxW = g.width - g.pad * 2;
  let size = Math.round(S * 0.12);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = captionColor;
  do {
    ctx.font = `italic ${size}px Georgia, 'Times New Roman', serif`;
    size -= 2;
  } while (ctx.measureText(text).width > maxW && size > 10);
  ctx.fillText(text, g.width / 2, g.height - g.foot / 2);
  return { width: g.width, height: g.height };
}

export function renderStripBlob(photos, options) {
  const canvas = document.createElement('canvas');
  drawStrip(canvas, photos, options, EXPORT_MAX_CELL);
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
}
