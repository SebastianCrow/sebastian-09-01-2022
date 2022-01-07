import React, { FunctionComponent, useCallback, useEffect } from 'react';
import cns from 'classnames';
import { SpreadHeader } from '../spreadHeader/spreadHeader.component';
import styles from './orderBook.component.module.scss';
import { Text } from '../../../ui/text/text.component';
import { OrderBookTable } from '../orderBookTable/orderBookTable.component';
import { useDispatchOrderBook } from '../../hooks/useDispatchOrderBook.hook';
import {
  useSelectOrderBookAsks,
  useSelectOrderBookBids,
  useSelectOrderBookState,
} from '../../hooks/useSelectOrderBookState.hook';
import { Button } from '../../../ui/button/button.component';
import { usePrevious } from '../../../../shared/hooks/usePrevious.hook';

// TODO: Replace all the inline styles with Sass

export const OrderBook: FunctionComponent = () => {
  const dispatch = useDispatchOrderBook();

  const { product } = useSelectOrderBookState();
  // TODO: Move inside OrderBookTable?
  const bids = useSelectOrderBookBids();
  const asks = useSelectOrderBookAsks();

  const prevProduct = usePrevious(product);
  useEffect(() => {
    if (!prevProduct) {
      dispatch({
        type: 'ObserveProduct',
        product: product,
      });
    }
  }, [dispatch, prevProduct, product]);

  const toggleFeed = useCallback(() => {
    dispatch({
      type: 'ObserveProduct',
      product: product === 'Bitcoin' ? 'Ethereum' : 'Bitcoin',
    });
  }, [dispatch, product]);

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
