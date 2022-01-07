import { useDispatchOrderBook } from './useDispatchOrderBook.hook';
import { useDocumentVisibilityState } from '../../../shared/hooks/useDocumentVisibilityState.hook';
import { useEffect } from 'react';
import { useSelectOrderBookState } from './useSelectOrderBookState.hook';
import { usePrevious } from '../../../shared/hooks/usePrevious.hook';

const isFeatureEnabled = (): boolean => {
  // TODO: It should be replaced by the feature flag mechanism
  return !localStorage.getItem('orderBook.stopConnection.disabled');
};

export const useStopObservingProductOnDocumentHidden = () => {
  const dispatch = useDispatchOrderBook();

  const visibilityState = useDocumentVisibilityState();
  const { product } = useSelectOrderBookState();

  const prevVisibilityState = usePrevious(visibilityState);
  useEffect(() => {
    if (!isFeatureEnabled()) {
      return;
    }
    if (prevVisibilityState !== 'hidden' && visibilityState === 'hidden') {
      dispatch({
        type: 'StopObservingProduct',
        product,
      });
    }
  }, [prevVisibilityState, product, visibilityState, dispatch]);
};
