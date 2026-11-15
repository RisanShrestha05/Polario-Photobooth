// Grid limits (columns x rows). Strips are portrait-only: rows >= columns.
export const MIN_COLS = 1;
export const MAX_COLS = 2;
export const MIN_ROWS = 1;
export const MAX_ROWS = 4;
export const DEFAULT_COLS = 1;
export const DEFAULT_ROWS = 3;

// Timer: applies to the FIRST photo only. Every later photo uses BETWEEN_SHOT_DELAY.
export const TIMER_OPTIONS = [3, 4, 10];
export const DEFAULT_TIMER = 3;
export const BETWEEN_SHOT_DELAY = 3;

// Camera: try 1080p, then step down to whatever the device supports.
export const RESOLUTIONS = [
  { width: 1920, height: 1080 },
  { width: 1280, height: 720 },
  { width: 640, height: 480 },
];

// Strip rendering
export const CAPTION_MAX = 38;
export const DEFAULT_CAPTION = 'Polario';
export const EXPORT_MAX_CELL = 1080; // px per photo in the downloaded file
export const PREVIEW_MAX_CELL = 520; // px per photo in on-screen previews
export const EXPORT_MAX_PIXELS = 15_000_000; // stays under iOS Safari's canvas limit
export const THUMB_SIZE = 240;
