import React, { FunctionComponent } from 'react';
import styles from './orderBook.component.module.scss';
import { OrderBookHeader } from '../orderBookHeader/orderBookHeader.component';
import { OrderBookFooter } from '../orderBookFooter/orderBookFooter.component';
import { OrderBookContent } from '../orderBookContent/orderBookContent.component';

// TODO: Replace all the inline styles with Sass

export const OrderBook: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <OrderBookHeader />
      <OrderBookContent />
      <OrderBookFooter />
    </div>
  );
};
