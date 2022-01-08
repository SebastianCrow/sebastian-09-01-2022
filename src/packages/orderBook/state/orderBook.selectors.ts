import { AppState } from '../../../shared/state/rootReducer';
import { ComputedPriceInfo, OrderBookState, Total } from './orderBook.types';
import { createSelector } from '@reduxjs/toolkit';
import { computePriceInfoList } from '../services/computePriceInfoList.service';
import { computeSpreadInfo } from '../services/network/computeSpreadInfo.service';
import { head, last } from 'lodash';
import { computeHighestTotal } from '../services/network/computeHighestTotal.service';

export const selectOrderBookState = (app: AppState): OrderBookState => {
  return app.orderBook;
};

export const selectOrderBookBids = createSelector(
  selectOrderBookState,
  ({ bids }): ComputedPriceInfo[] | undefined => {
    console.info('bids');
    return bids ? computePriceInfoList(bids, 'desc') : undefined;
  }
);

const selectOrderBookTopBid = createSelector(
  selectOrderBookBids,
  (bids): ComputedPriceInfo | undefined => {
    console.info('top bid');
    return head(bids);
  }
);

const selectOrderBookBottomBid = createSelector(
  selectOrderBookBids,
  (bids): ComputedPriceInfo | undefined => {
    console.info('bottom bid');
    return last(bids);
  }
);

export const selectOrderBookAsks = createSelector(
  selectOrderBookState,
  ({ asks }): ComputedPriceInfo[] | undefined => {
    console.info('asks');
    return asks ? computePriceInfoList(asks, 'asc') : undefined;
  }
);

const selectOrderBookTopAsk = createSelector(
  selectOrderBookAsks,
  (asks): ComputedPriceInfo | undefined => {
    console.info('top ask');
    return head(asks);
  }
);

const selectOrderBookBottomAsk = createSelector(
  selectOrderBookAsks,
  (asks): ComputedPriceInfo | undefined => {
    console.info('bottom ask');
    return last(asks);
  }
);

export const selectSpreadInfo = createSelector(
  selectOrderBookTopBid,
  selectOrderBookTopAsk,
  (topBid, topAsk) => {
    console.info('spread');
    return computeSpreadInfo({
      topBid,
      topAsk,
    });
  }
);

export const selectHighestTotal = createSelector(
  selectOrderBookBottomBid,
  selectOrderBookBottomAsk,
  (bottomBid, bottomAsk): Total | undefined => {
    console.info('highest total');
    return computeHighestTotal({
      bottomBid,
      bottomAsk,
    });
  }
);
