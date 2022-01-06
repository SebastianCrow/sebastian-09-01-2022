import React, { FunctionComponent, useEffect, useState } from 'react';
import cns from 'classnames';
import { SpreadHeader } from '../spreadHeader/spreadHeader.component';
import styles from './orderBook.component.module.scss';
import { Text } from '../../../ui/text/text.component';
import { OrderBookTable } from '../orderBookTable/orderBookTable.component';
import { ProductId } from '../../services/network/orderBookNetwork.types';
import { prices$ } from '../../services/network/orderBookNetwork.service';

// TODO: Replace all the inline styles with Sass

export const OrderBook: FunctionComponent = () => {
  const [productId] = useState<ProductId>('PI_XBTUSD');

  useEffect(() => {
    const a = prices$([productId]).subscribe({
      next: (v) => console.info(v),
    });
  }, [productId]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Text>Order Book</Text>
        </div>
        <div className={cns(styles.spreadContainer, 'desktop')}>
          <SpreadHeader />
        </div>
      </div>
      <div className={styles.tableContainer}>
        <div className={styles.tableColumn}>
          <OrderBookTable />
        </div>
        <div className={cns(styles.spreadContainer, 'mobile')}>
          <SpreadHeader />
        </div>
        <div className={styles.tableColumn}>
          <OrderBookTable />
        </div>
      </div>
    </div>
  );
};
