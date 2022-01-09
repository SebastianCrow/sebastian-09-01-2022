import { useDispatchOrderBook } from './useDispatchOrderBook.hook';
import { useCallback, useEffect } from 'react';
import { useSelectOrderBookState } from './useSelectOrderBookState.hook';
import { usePrevious } from '../../../shared/hooks/usePrevious.hook';
import { Product } from '../services/network/orderBookNetwork.types';

/**
 * Start observing current product on mount
 */
export const useStartObservingProduct = (): {
  observeProduct: (product: Product) => void;
} => {
  const dispatch = useDispatchOrderBook();

  const { product: currentProduct } = useSelectOrderBookState();

  const observeProduct = useCallback(
    (product: Product) => {
      dispatch({
        type: 'ObserveProduct',
        product,
      });
    },
    [dispatch]
  );

  // Start observing product on hook's mount
  const prevProduct = usePrevious(currentProduct);
  useEffect(() => {
    if (!prevProduct) {
      observeProduct(currentProduct);
    }
  }, [dispatch, observeProduct, prevProduct, currentProduct]);

  return {
    observeProduct,
  };
};
