import { useLayoutEffect } from 'react';
import { useThrottle } from '@react-hook/throttle';

export const useWindowSize = () => {
  const [size, setSize] = useThrottle([0, 0], 144);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [setSize]);
  return size;
};
