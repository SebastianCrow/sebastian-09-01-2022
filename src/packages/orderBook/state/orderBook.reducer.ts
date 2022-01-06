import { OrderBookState } from './orderBook.types';
import {
  DeltaReceived,
  OrderBookActions,
  SnapshotReceived,
} from './orderBook.actions';

const initialState: OrderBookState = {
  product: 'Bitcoin',
  bids: undefined,
  asks: undefined,
};

const snapshotReceived = (
  prevState: OrderBookState,
  action: SnapshotReceived
): OrderBookState => {
  return {
    ...prevState, // TODO: Modify state here
  };
};

const deltaReceived = (
  prevState: OrderBookState,
  action: DeltaReceived
): OrderBookState => {
  return {
    ...prevState, // TODO: Modify state here
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
