import { OrderBookState, Price } from '../orderBook.types';
import {
  DeltaReceived,
  ObserveProduct,
  OrderBookActions,
  SetConnectionStatus,
  SnapshotReceived,
} from '../orderBook.actions';
import {
  PriceInfo,
  Product,
} from '../../services/network/orderBookNetwork.types';
import { computePriceInfoRecord } from '../../services/computePriceInfoRecord.service';

const initialState: OrderBookState = {
  product: Product.Bitcoin_USD,
  connectionStatus: 'unsubscribed',
  prices: undefined,
};

const updatePriceInfoRecord = (
  priceInfoRecord: Record<Price, PriceInfo> | undefined = {},
  newPriceInfoList: PriceInfo[]
): Record<Price, PriceInfo> => {
  const updatedPriceInfoRecord = { ...priceInfoRecord };
  for (const priceInfo of newPriceInfoList) {
    // Replace with the new price info
    if (priceInfo.size > 0) {
      updatedPriceInfoRecord[priceInfo.price] = priceInfo;
    }
    // Delete obsolete price info
    else {
      delete updatedPriceInfoRecord[priceInfo.price];
    }
  }
  return updatedPriceInfoRecord;
};

const observeProduct = (
  prevState: OrderBookState,
  action: ObserveProduct
): OrderBookState => {
  return {
    ...prevState,
    product: action.product,
    prices: undefined,
  };
};

const setConnectionStatus = (
  prevState: OrderBookState,
  action: SetConnectionStatus
): OrderBookState => {
  return {
    ...prevState,
    connectionStatus: action.connectionStatus,
  };
};

const snapshotReceived = (
  prevState: OrderBookState,
  action: SnapshotReceived
): OrderBookState => {
  return {
    ...prevState,
    prices: {
      numLevels: action.numLevels,
      bids: computePriceInfoRecord(action.bids),
      asks: computePriceInfoRecord(action.asks),
    },
  };
};

const deltaReceived = (
  prevState: OrderBookState,
  action: DeltaReceived
): OrderBookState => {
  const bids = updatePriceInfoRecord(prevState.prices?.bids, action.bids);
  const asks = updatePriceInfoRecord(prevState.prices?.asks, action.asks);
  return {
    ...prevState,
    prices: {
      numLevels:
        prevState.prices?.numLevels ??
        Math.max(Object.keys(bids).length, Object.keys(asks).length),
      bids,
      asks,
    },
  };
};

/**
 * {@link _orderBookReducer} is extracted in order to avoid using `default` inside `switch` and enforce an exhaustiveness check by TS
 */
const _orderBookReducer = (
  prevState: OrderBookState = initialState,
  action: OrderBookActions
): OrderBookState => {
  switch (action.type) {
    case 'ObserveProduct':
      return observeProduct(prevState, action);
    case 'StopObservingProduct':
      return prevState;
    case 'SetConnectionStatus':
      return setConnectionStatus(prevState, action);
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
