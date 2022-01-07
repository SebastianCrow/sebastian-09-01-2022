import { useDispatchOrderBook } from './useDispatchOrderBook.hook';
import { useDocumentVisibilityState } from '../../../shared/hooks/useDocumentVisibilityState.hook';
import { useEffect } from 'react';
import { useSelectOrderBookState } from './useSelectOrderBookState.hook';

export const useStopObservingProductOnDocumentHidden = () => {
  const dispatch = useDispatchOrderBook();

  const visibilityState = useDocumentVisibilityState();
  const { product } = useSelectOrderBookState();

  useEffect(() => {
    if (visibilityState === 'hidden') {
      dispatch({
        type: 'StopObservingProduct',
        product,
      });
    }
  });
};
