export const FRAME_COLORS = [
  { name: 'White', value: '#FFFFFF' },
  { name: 'Cream', value: '#F8F4EC' },
  { name: 'Black', value: '#1A1A1A' },
  { name: 'Mint', value: '#C5EAE7' },
  { name: 'Teal', value: '#6BCBC3' },
  { name: 'Burgundy', value: '#6B1428' },
  { name: 'Blush', value: '#FFD6E6' },
  { name: 'Hot Pink', value: '#D81F68' },
  { name: 'Butter', value: '#FFE9A8' },
  { name: 'Lavender', value: '#D9CCF5' },
  { name: 'Sky', value: '#BFE0F5' },
  { name: 'Peach', value: '#FFD3B6' },
];

export const CAPTION_COLORS = [
  { name: 'Burgundy', value: '#6B1428' },
  { name: 'Black', value: '#1A1A1A' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Hot Pink', value: '#D81F68' },
  { name: 'Navy', value: '#1F3A5F' },
  { name: 'Brown', value: '#5C3B28' },
  { name: 'Gold', value: '#B8860B' },
  { name: 'Gray', value: '#6B6B6B' },
];

export const DEFAULT_FRAME = '#FFFFFF';
export const DEFAULT_CAPTION_COLOR = '#6B1428';

function luminance(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
    .map((v) => {
      const c = v / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    })
    .reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
}

export function contrastRatio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export const isLowContrast = (a, b) => contrastRatio(a, b) < 3;
export const readableOn = (hex) => (luminance(hex) > 0.45 ? '#2B1A12' : '#FFFFFF');
