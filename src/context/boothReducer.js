import { DEFAULT_COLS, DEFAULT_ROWS, DEFAULT_TIMER } from '../constants/config.js';
import { DEFAULT_CAPTION_COLOR, DEFAULT_FRAME } from '../constants/palettes.js';

const blank = (n) => Array(n).fill(null);

export const initialState = {
  cols: DEFAULT_COLS,
  rows: DEFAULT_ROWS,
  timer: DEFAULT_TIMER,
  gridConfirmed: false,
  photos: blank(DEFAULT_COLS * DEFAULT_ROWS), // each: { canvas, thumb } | null
  caption: '',
  frameColor: DEFAULT_FRAME,
  captionColor: DEFAULT_CAPTION_COLOR,
};

export function boothReducer(state, action) {
  switch (action.type) {
    case 'SET_GRID':
      return { ...state, cols: action.cols, rows: action.rows, photos: blank(action.cols * action.rows), gridConfirmed: false };
    case 'CONFIRM_GRID':
      return { ...state, gridConfirmed: true };
    case 'SET_TIMER':
      return { ...state, timer: action.timer };
    case 'SET_PHOTO': {
      const photos = state.photos.slice();
      photos[action.index] = action.photo;
      return { ...state, photos };
    }
    case 'CLEAR_PHOTOS':
      return { ...state, photos: blank(state.cols * state.rows) };
    case 'SET_CAPTION':
      return { ...state, caption: action.value };
    case 'SET_FRAME':
      return { ...state, frameColor: action.value };
    case 'SET_CAPTION_COLOR':
      return { ...state, captionColor: action.value };
    case 'RESET_STYLE':
      return { ...state, caption: '', frameColor: DEFAULT_FRAME, captionColor: DEFAULT_CAPTION_COLOR };
    case 'NEW_SESSION':
      return { ...initialState };
    default:
      return state;
  }
}
