import { AppState } from '../../../../shared/state/rootReducer';
import { ComputedPriceInfo, OrderBookState, Total } from '../orderBook.types';
import { createSelector } from '@reduxjs/toolkit';
import { computePriceInfoList } from '../../services/computePriceInfoList.service';
import { computeSpreadInfo } from '../../services/network/computeSpreadInfo.service';
import { head, last } from 'lodash';
import { computeHighestTotal } from '../../services/network/computeHighestTotal.service';

export const selectOrderBookState = (app: AppState): OrderBookState => {
  return app.orderBook;
};

export const selectOrderBookBids = createSelector(
  selectOrderBookState,
  ({ bids }): ComputedPriceInfo[] | undefined => {
    return bids ? computePriceInfoList(bids, 'desc') : undefined;
  }
);

export const selectOrderBookTopBid = createSelector(
  selectOrderBookBids,
  (bids): ComputedPriceInfo | undefined => {
    return head(bids);
  }
);

export const selectOrderBookBottomBid = createSelector(
  selectOrderBookBids,
  (bids): ComputedPriceInfo | undefined => {
    return last(bids);
  }
);

export const selectOrderBookAsks = createSelector(
  selectOrderBookState,
  ({ asks }): ComputedPriceInfo[] | undefined => {
    return asks ? computePriceInfoList(asks, 'asc') : undefined;
  }
);

export const selectOrderBookTopAsk = createSelector(
  selectOrderBookAsks,
  (asks): ComputedPriceInfo | undefined => {
    return head(asks);
  }
);

export const selectOrderBookBottomAsk = createSelector(
  selectOrderBookAsks,
  (asks): ComputedPriceInfo | undefined => {
    return last(asks);
  }
);

export const selectSpreadInfo = createSelector(
  selectOrderBookTopBid,
  selectOrderBookTopAsk,
  (topBid, topAsk) => {
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
    return computeHighestTotal({
      bottomBid,
      bottomAsk,
    });
  }
);
