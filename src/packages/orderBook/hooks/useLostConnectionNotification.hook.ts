import { useCallback, useEffect } from 'react';
import { useSelectOrderBookState } from './useSelectOrderBookState.hook';
import { useSetNotification } from '../../ui/notification/useSetNotification.hook';
import { Product } from '../services/network/orderBookNetwork.types';
import { ConnectionStatus } from '../state/orderBook.types';
import { useIntl } from 'react-intl';

const FAULTY_STATUSES: ConnectionStatus[] = ['unsubscribed', 'error'];

/**
 * Display the UI notification when connection is lost
 * @param observeProduct Callback triggered when user tries to reconnect
 */
export const useLostConnectionNotification = (
  observeProduct: (product: Product) => void
): void => {
  const setNotification = useSetNotification();

  const { formatMessage } = useIntl();
  const { product, connectionStatus } = useSelectOrderBookState();

  const reconnect = useCallback(() => {
    observeProduct(product);
  }, [observeProduct, product]);

  useEffect(() => {
    if (FAULTY_STATUSES.includes(connectionStatus)) {
      setNotification({
        message: formatMessage({
          id: 'Ups... connection is not established. Sorry.',
        }),
        severity: 'error',
        action: {
          title: 'Reconnect',
          onClick: reconnect,
        },
      });
    } else {
      setNotification(undefined);
    }
  }, [connectionStatus, reconnect, formatMessage, setNotification]);
};
