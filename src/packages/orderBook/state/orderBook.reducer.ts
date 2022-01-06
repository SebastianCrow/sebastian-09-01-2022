import { OrderBookState, Price } from './orderBook.types';
import {
  DeltaReceived,
  OrderBookActions,
  SnapshotReceived,
} from './orderBook.actions';
import { PriceInfo } from '../services/network/orderBookNetwork.types';
import { computePriceInfoRecord } from '../services/computePriceInfoRecord.service';

const initialState: OrderBookState = {
  product: 'Bitcoin',
  bids: undefined,
  asks: undefined,
};

const updatePriceInfoRecord = (
  priceInfoRecord: Record<Price, PriceInfo> | undefined,
  newPriceInfoList: PriceInfo[]
): Record<Price, PriceInfo> | undefined => {
  if (!priceInfoRecord || !newPriceInfoList.length) {
    return priceInfoRecord;
  }

  const updatedPriceInfoRecord = { ...priceInfoRecord };
  for (const priceInfo of newPriceInfoList) {
    if (priceInfo.size > 0) {
      updatedPriceInfoRecord[priceInfo.price] = priceInfo;
    } else {
      delete updatedPriceInfoRecord[priceInfo.price];
    }
  }
  return updatedPriceInfoRecord;
};

const snapshotReceived = (
  prevState: OrderBookState,
  action: SnapshotReceived
): OrderBookState => {
  return {
    ...prevState,
    bids: computePriceInfoRecord(action.bids),
    asks: computePriceInfoRecord(action.asks),
  };
};

const deltaReceived = (
  prevState: OrderBookState,
  action: DeltaReceived
): OrderBookState => {
  return {
    ...prevState,
    bids: updatePriceInfoRecord(prevState.bids, action.bids),
    asks: updatePriceInfoRecord(prevState.asks, action.asks),
  };
};

/**
 * {@link _orderBookReducer} is extracted in order to avoid using `default` inside `switch` and enforce an exhaustiveness check by TS
 */
const _orderBookReducer = (
  prevState: OrderBookState = initialState,
  action: OrderBookActions
): OrderBookState => {
  switch (
    action.type // TODO: Investigate exhaustive switch
  ) {
    case 'ObserveProduct':
      return prevState;
    case 'SnapshotReceived':
      return snapshotReceived(prevState, action);
    case 'DeltaReceived':
      return deltaReceived(prevState, action);
  }
};

export const orderBookReducer = (
  prevState: OrderBookState = initialState,
  action: OrderBookActions
): OrderBookState => {
  return _orderBookReducer(prevState, action) ?? prevState;
};
