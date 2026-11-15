import { useEffect, useState } from 'react';

const read = () => ({ w: window.innerWidth, h: window.innerHeight });

export function useViewport() {
  const [size, setSize] = useState(read);
  useEffect(() => {
    const onResize = () => setSize(read());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return size;
}
