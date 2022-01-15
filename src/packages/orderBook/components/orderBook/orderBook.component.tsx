import React, { FunctionComponent } from 'react';
import styles from './orderBook.component.module.scss';
import { OrderBookHeader } from '../orderBookHeader/orderBookHeader.component';
import { OrderBookFooter } from '../orderBookFooter/orderBookFooter.component';
import { OrderBookContent } from '../orderBookContent/orderBookContent.component';
import { useConnectionManager } from '../../hooks/useConnectionManager.hook';
import { ErrorBoundary } from '../../../../shared/components/errorBoundary.component';

export const OrderBook: FunctionComponent = () => {
  const { observeProduct } = useConnectionManager();

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
