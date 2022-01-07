import React, { FunctionComponent, useCallback } from 'react';
import cns from 'classnames';
import { SpreadHeader } from '../spreadHeader/spreadHeader.component';
import styles from './orderBook.component.module.scss';
import { Text } from '../../../ui/text/text.component';
import { OrderBookTable } from '../orderBookTable/orderBookTable.component';
import {
  useSelectOrderBookAsks,
  useSelectOrderBookBids,
  useSelectOrderBookState,
} from '../../hooks/useSelectOrderBookState.hook';
import { Button } from '../../../ui/button/button.component';
import { useStopObservingProductOnDocumentHidden } from '../../hooks/useStopObservingProductOnDocumentHidden.hook';
import { useStartObservingProduct } from '../../hooks/useStartObservingProduct.hook';
import { useLostConnectionNotification } from '../../hooks/useLostConnectionNotification.hook';

// TODO: Replace all the inline styles with Sass

export const OrderBook: FunctionComponent = () => {
  const { observeProduct } = useStartObservingProduct();
  useStopObservingProductOnDocumentHidden();

  useLostConnectionNotification();

  const { product, connectionStatus } = useSelectOrderBookState();
  console.info('connectionStatus', connectionStatus);
  // TODO: Move inside OrderBookTable?
  const bids = useSelectOrderBookBids();
  const asks = useSelectOrderBookAsks();

  const toggleFeed = useCallback(() => {
    observeProduct(product === 'Bitcoin' ? 'Ethereum' : 'Bitcoin');
  }, [observeProduct, product]);

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
          <OrderBookTable priceInfoList={bids} priceDataType="bids" />
        </div>
        <div className={cns(styles.spreadContainer, 'mobile')}>
          <SpreadHeader />
        </div>
        <div className={styles.tableColumn}>
          <OrderBookTable priceInfoList={asks} priceDataType="asks" />
        </div>
      </div>
      <div className={styles.toggleFeedContainer}>
        <Button onClick={toggleFeed}>Toggle Feed</Button>
      </div>
    </div>
  );
};
