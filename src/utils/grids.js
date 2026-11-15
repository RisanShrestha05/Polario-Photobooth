import { MIN_COLS, MAX_COLS, MIN_ROWS, MAX_ROWS } from '../constants/config.js';

// Portrait-only rule: a strip can be tall or square, never wider than tall.
export const minRowsFor = (cols) => Math.max(MIN_ROWS, cols);
export const isValidGrid = (cols, rows) =>
  cols >= MIN_COLS && cols <= MAX_COLS && rows >= minRowsFor(cols) && rows <= MAX_ROWS;
export const shotCount = (cols, rows) => cols * rows;

// The 7 layouts offered (max 2 columns x 4 rows, rows >= columns).
export const LAYOUTS = [
  { cols: 1, rows: 1, name: 'Single' },
  { cols: 1, rows: 2, name: 'Duo' },
  { cols: 1, rows: 3, name: 'Triple' },
  { cols: 1, rows: 4, name: 'Classic' },
  { cols: 2, rows: 2, name: 'Square' },
  { cols: 2, rows: 3, name: 'Collage' },
  { cols: 2, rows: 4, name: 'Tall collage' },
];
