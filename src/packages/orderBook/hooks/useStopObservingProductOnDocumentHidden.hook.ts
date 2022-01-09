import { useDispatchOrderBook } from './useDispatchOrderBook.hook';
import { useDocumentVisibilityState } from '../../../shared/hooks/useDocumentVisibilityState.hook';
import { useEffect } from 'react';
import { useSelectOrderBookState } from './useSelectOrderBookState.hook';
import { usePrevious } from '../../../shared/hooks/usePrevious.hook';
import { isFeatureFlagEnabled } from '../../../shared/services/featureFlags/featureFlags.service';
import { FeatureFlag } from '../../../shared/services/featureFlags/featureFlags.types';

const featureEnabled = !isFeatureFlagEnabled(
  FeatureFlag.OrderBook_stopConnection_disabled
);

/**
 * Stop observing the product when document visibility changes to `hidden`.
 * Don't do anything if the connection is already in the `error` state.
 */
export const useStopObservingProductOnDocumentHidden = () => {
  const dispatch = useDispatchOrderBook();

  const visibilityState = useDocumentVisibilityState();
  const { product, connectionStatus } = useSelectOrderBookState();

  const prevVisibilityState = usePrevious(visibilityState);
  useEffect(() => {
    if (!featureEnabled) {
      return;
    }
    if (
      prevVisibilityState !== 'hidden' &&
      visibilityState === 'hidden' &&
      connectionStatus !== 'error'
    ) {
      dispatch({
        type: 'StopObservingProduct',
        product,
      });
    }
  }, [
    product,
    prevVisibilityState,
    visibilityState,
    connectionStatus,
    dispatch,
  ]);
};
