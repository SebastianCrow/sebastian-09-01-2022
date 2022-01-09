import React, { FunctionComponent } from 'react';
import styles from './orderBook.component.module.scss';
import { OrderBookHeader } from '../orderBookHeader/orderBookHeader.component';
import { OrderBookFooter } from '../orderBookFooter/orderBookFooter.component';
import { OrderBookContent } from '../orderBookContent/orderBookContent.component';
import { useSelectOrderBookState } from '../../hooks/useSelectOrderBookState.hook';
import { useConnectionManager } from '../../hooks/useConnectionManager.hook';
import { ErrorBoundary } from '../../../../shared/components/errorBoundary.component';

export const OrderBook: FunctionComponent = () => {
  const { connectionStatus } = useSelectOrderBookState();
  const { observeProduct } = useConnectionManager();

  // In case of error, a notification with reconnect button will be displayed
  if (connectionStatus === 'error') {
    return null;
  }

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <OrderBookHeader />
        <OrderBookContent />
        <OrderBookFooter observeProduct={observeProduct} />
      </div>
    </ErrorBoundary>
  );
};
