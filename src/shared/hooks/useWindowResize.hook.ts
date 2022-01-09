import { useCallback, useEffect, useState } from 'react';

interface Size {
  width: number;
  height: number;
}

/**
 * Notify changes in the window's size
 */
export const useWindowResize = (): Size => {
  const [size, setSize] = useState<Size>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const onResize = useCallback(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  return size;
};
