import { useSelectOrderBookState } from './useSelectOrderBookState.hook';
import { usePrevious } from '../../../shared/hooks/usePrevious.hook';
import { useCallback, useEffect } from 'react';
import { useSetNotification } from '../../ui/notification/useSetNotification.hook';
import { Product } from '../services/network/orderBookNetwork.types';
import { ConnectionStatus } from '../state/orderBook.types';

const FAULTY_STATUSES: ConnectionStatus[] = ['unsubscribed', 'error'];

/**
 * Display the UI notification when connection is lost
 * @param observeProduct Callback triggered when user tries to reconnect
 */
export const useLostConnectionNotification = (
  observeProduct: (product: Product) => void
): void => {
  const setNotification = useSetNotification();

  const { product, connectionStatus } = useSelectOrderBookState();

  const reconnect = useCallback(() => {
    observeProduct(product);
  }, [observeProduct, product]);

  const prevConnectionStatus = usePrevious(connectionStatus);
  useEffect(() => {
    if (!prevConnectionStatus || prevConnectionStatus === connectionStatus) {
      return;
    }
    if (FAULTY_STATUSES.includes(connectionStatus)) {
      setNotification({
        message: "Ups... we've lost connection. Sorry.", // eslint-disable-line quotes
        severity: 'error',
        action: {
          title: 'Reconnect',
          onClick: reconnect,
        },
      });
    } else {
      setNotification(undefined);
    }
  }, [connectionStatus, prevConnectionStatus, reconnect, setNotification]);
};
