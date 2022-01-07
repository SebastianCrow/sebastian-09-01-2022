import { useSelectOrderBookState } from './useSelectOrderBookState.hook';
import { usePrevious } from '../../../shared/hooks/usePrevious.hook';
import { useCallback, useEffect } from 'react';
import { useSetNotification } from '../../ui/notification/useSetNotification.hook';
import { useDispatchOrderBook } from './useDispatchOrderBook.hook';

export const useLostConnectionNotification = () => {
  const dispatch = useDispatchOrderBook();
  const setNotification = useSetNotification();

  const { product, connectionStatus } = useSelectOrderBookState();

  const reconnect = useCallback(() => {
    dispatch({
      type: 'ObserveProduct',
      product,
    });
  }, [dispatch, product]);

  const prevConnectionStatus = usePrevious(connectionStatus);
  useEffect(() => {
    if (prevConnectionStatus === connectionStatus) {
      return;
    }
    if (prevConnectionStatus && connectionStatus === 'unsubscribed') {
      setNotification({
        // TODO: Improve ESLint and Prettier
        message: "Ups... we've lost the connection. Sorry.", // eslint-disable-line quotes
        severity: 'error',
        onActionClick: reconnect,
      });
    }
    // TODO: Loading state when 'subscribing'
    if (connectionStatus === 'subscribed') {
      setNotification(undefined);
    }
  }, [connectionStatus, prevConnectionStatus, reconnect, setNotification]);
};
