import React, { FunctionComponent, useEffect } from 'react';
import cns from 'classnames';
import { SpreadHeader } from '../spreadHeader/spreadHeader.component';
import styles from './orderBook.component.module.scss';
import { Text } from '../../../ui/text/text.component';
import { OrderBookTable } from '../orderBookTable/orderBookTable.component';
import { useDispatchOrderBook } from '../../hooks/useDispatchOrderBook.hook';
import { useSelectOrderBookState } from '../../hooks/useSelectOrderBookState.hook';

// TODO: Replace all the inline styles with Sass

export const OrderBook: FunctionComponent = () => {
  const dispatch = useDispatchOrderBook();
  const state = useSelectOrderBookState();

  useEffect(() => {
    dispatch({
      type: 'ObserveProduct',
      product: state.product,
    });
  }, [dispatch, state.product]);

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
