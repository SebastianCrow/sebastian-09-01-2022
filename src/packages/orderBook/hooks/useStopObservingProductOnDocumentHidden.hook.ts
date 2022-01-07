import { useDispatchOrderBook } from './useDispatchOrderBook.hook';
import { useDocumentVisibilityState } from '../../../shared/hooks/useDocumentVisibilityState.hook';
import { useEffect } from 'react';
import { useSelectOrderBookState } from './useSelectOrderBookState.hook';
import { usePrevious } from '../../../shared/hooks/usePrevious.hook';

export const useStopObservingProductOnDocumentHidden = () => {
  const dispatch = useDispatchOrderBook();

  const visibilityState = useDocumentVisibilityState();
  const { product } = useSelectOrderBookState();

  const prevVisibilityState = usePrevious(visibilityState);
  useEffect(() => {
    if (prevVisibilityState !== 'hidden' && visibilityState === 'hidden') {
      dispatch({
        type: 'StopObservingProduct',
        product,
      });
    }
  }, [prevVisibilityState, product, visibilityState, dispatch]);
};
