export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export function stripFilename() {
  const stamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  return `polario-strip-${stamp}.png`;
}
