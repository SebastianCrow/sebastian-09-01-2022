import React, { FunctionComponent } from 'react';
import cns from 'classnames';
import { SpreadHeader } from '../spreadHeader/spreadHeader.component';
import styles from './orderBookContent.component.module.scss';
import { Loader } from '../../../ui/loader/loader.component';
import { OrderBookTable } from '../orderBookTable/orderBookTable.component';
import { useSelectOrderBookPrices } from '../../hooks/useSelectOrderBookState.hook';

export const OrderBookContent: FunctionComponent = () => {
  const { bids, asks } = useSelectOrderBookPrices();

  const hasData = Boolean(bids && asks);

  return (
    <div className={styles.tablesContainer}>
      {!hasData && (
        <div className={styles.loadingOverlay}>
          <Loader />
        </div>
      )}
      {hasData && bids && asks && (
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
