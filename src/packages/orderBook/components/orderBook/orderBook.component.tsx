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
import { useConnectionManager } from '../../hooks/useConnectionManager.hook';
import { Loader } from '../../../ui/loader/loader.component';

// TODO: Replace all the inline styles with Sass

export const OrderBook: FunctionComponent = () => {
  const { observeProduct } = useConnectionManager();

  const { product } = useSelectOrderBookState();
  // TODO: Move inside OrderBookTable?
  const bids = useSelectOrderBookBids();
  const asks = useSelectOrderBookAsks();

  const dataLoaded = Boolean(bids && asks);

  const toggleFeed = useCallback(() => {
    observeProduct(product === 'Bitcoin' ? 'Ethereum' : 'Bitcoin');
  }, [observeProduct, product]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Text variant="title">Order Book</Text>
        </div>
        <div className={cns(styles.spreadContainer, 'desktop')}>
          <SpreadHeader />
        </div>
      </div>
      <div className={styles.tablesContainer}>
        {!dataLoaded && (
          <div className={styles.loadingOverlay}>
            <Loader />
          </div>
        )}
        {bids && asks && (
          <>
            <div className={styles.tableColumn}>
              <OrderBookTable priceInfoList={bids} priceDataType="bids" />
            </div>
            <div className={cns(styles.spreadContainer, 'mobile')}>
              <SpreadHeader />
            </div>
            <div className={styles.tableColumn}>
              <OrderBookTable priceInfoList={asks} priceDataType="asks" />
            </div>
          </>
        )}
      </div>
      <div className={styles.toggleFeedContainer}>
        <Button onClick={toggleFeed}>Toggle Feed</Button>
      </div>
    </div>
  );
};
