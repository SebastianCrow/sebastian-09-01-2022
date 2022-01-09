import { useEffect, useRef } from 'react';

/**
 * Remember the previous value of the given {@param value}
 * @param value Value to store
 */
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
};
