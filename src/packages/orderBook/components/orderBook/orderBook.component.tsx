import React, { FunctionComponent } from 'react';
import styles from './orderBook.component.module.scss';
import { OrderBookHeader } from '../orderBookHeader/orderBookHeader.component';
import { OrderBookFooter } from '../orderBookFooter/orderBookFooter.component';
import { OrderBookContent } from '../orderBookContent/orderBookContent.component';
import { useSelectOrderBookState } from '../../hooks/useSelectOrderBookState.hook';
import { useConnectionManager } from '../../hooks/useConnectionManager.hook';

export const OrderBook: FunctionComponent = () => {
  const { connectionStatus } = useSelectOrderBookState();
  const { observeProduct } = useConnectionManager();

  return (
    <div className={styles.container}>
      <OrderBookHeader />
      {connectionStatus !== 'error' && <OrderBookContent />}
      <OrderBookFooter observeProduct={observeProduct} />
    </div>
  );
};
