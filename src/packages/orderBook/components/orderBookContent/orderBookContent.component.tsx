import React, { FunctionComponent } from 'react';
import cns from 'classnames';
import { SpreadHeader } from '../spreadHeader/spreadHeader.component';
import styles from './orderBookContent.component.module.scss';
import { Loader } from '../../../ui/loader/loader.component';
import { OrderBookTable } from '../orderBookTable/orderBookTable.component';
import {
  useSelectOrderBookPrices,
  useSelectOrderBookState,
} from '../../hooks/useSelectOrderBookState.hook';

export const OrderBookContent: FunctionComponent = () => {
  const { connectionStatus } = useSelectOrderBookState();

  const { bids, asks } = useSelectOrderBookPrices();

  return (
    <div className={styles.tablesContainer}>
      {connectionStatus === 'subscribing' && (
        <div className={styles.loadingOverlay}>
          <Loader />
        </div>
      )}
      {connectionStatus !== 'subscribing' && bids && asks && (
        <div className={styles.tablesContent}>
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
      )}
    </div>
  );
};
