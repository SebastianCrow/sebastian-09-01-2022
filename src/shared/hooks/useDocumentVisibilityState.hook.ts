import { useCallback, useEffect, useState } from 'react';

/**
 * Notify changes in the {@link document.visibilityState}
 */
export const useDocumentVisibilityState = (): VisibilityState => {
  const [visibilityState, setVisibilityState] = useState(
    document.visibilityState
  );

  const onVisibilityChange = useCallback(() => {
    setVisibilityState(document.visibilityState);
  }, []);

  useEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [onVisibilityChange]);

  return visibilityState;
};
