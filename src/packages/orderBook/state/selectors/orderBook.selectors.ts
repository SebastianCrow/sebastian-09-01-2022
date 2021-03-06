import { AppState } from '../../../../shared/state/rootReducer';
import {
  ComputedPriceInfo,
  ComputedPricesInfo,
  OrderBookState,
  Total,
} from '../orderBook.types';
import { createSelector } from '@reduxjs/toolkit';
import { computePriceInfoList } from '../../services/computePriceInfoList.service';
import { computeSpreadInfo } from '../../services/network/computeSpreadInfo.service';
import { head, last } from 'lodash';
import { computeHighestTotal } from '../../services/network/computeHighestTotal.service';
import {
  getFeatureValue,
  isFeatureFlagEnabled,
} from '../../../../shared/services/featureFlags/featureFlags.service';
import {
  FeatureFlag,
  FeatureValue,
} from '../../../../shared/services/featureFlags/featureFlags.types';

const LEVELS_FROM_ENDPOINT = isFeatureFlagEnabled(
  FeatureFlag.OrderBook_levels_endpoint
);

const LEVELS_LIMIT = parseInt(
  getFeatureValue(FeatureValue.OrderBook_levels_limit, '15')
);

export const selectOrderBookState = (app: AppState): OrderBookState => {
  return app.orderBook;
};

/**
 * Select price levels limit defined either by the dynamic property or received from the backend endpoint (depending on feature flag)
 */
const selectPriceLevelsLimit = createSelector(
  selectOrderBookState,
  ({ prices }): number => {
    if (!LEVELS_FROM_ENDPOINT) {
      return LEVELS_LIMIT;
    }
    return prices?.numLevels ?? LEVELS_LIMIT;
  }
);

const selectOrderBookBids = createSelector(
  selectOrderBookState,
  selectPriceLevelsLimit,
  ({ prices }, limit): ComputedPriceInfo[] | undefined => {
    return prices?.bids
      ? computePriceInfoList(prices.bids, 'desc', limit)
      : undefined;
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

const selectOrderBookAsks = createSelector(
  selectOrderBookState,
  selectPriceLevelsLimit,
  ({ prices }, limit): ComputedPriceInfo[] | undefined => {
    return prices?.asks
      ? computePriceInfoList(prices.asks, 'asc', limit)
      : undefined;
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

export const selectOrderBookPrices = createSelector(
  selectOrderBookBids,
  selectOrderBookAsks,
  (bids, asks): ComputedPricesInfo => {
    return {
      bids,
      asks,
    };
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
