import React, { FunctionComponent } from 'react';
import cns from 'classnames';
import { SpreadHeader } from '../spreadHeader/spreadHeader.component';
import styles from './orderBookContent.component.module.scss';
import { Loader } from '../../../ui/loader/loader.component';
import { OrderBookTable } from '../orderBookTable/orderBookTable.component';
import {
  useSelectOrderBookAsks,
  useSelectOrderBookBids,
} from '../../hooks/useSelectOrderBookState.hook';

export const OrderBookContent: FunctionComponent = () => {
  // TODO: Move inside OrderBookTable?
  const bids = useSelectOrderBookBids();
  const asks = useSelectOrderBookAsks();

  const dataLoaded = Boolean(bids && asks);

  return (
    <div className={styles.tablesContainer}>
      {!dataLoaded && (
        <div className={styles.loadingOverlay}>
          <Loader />
        </div>
      )}
      {bids && asks && (
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