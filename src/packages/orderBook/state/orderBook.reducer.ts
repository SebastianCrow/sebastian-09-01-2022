import { OrderBookState } from './orderBook.types';
import {
  DeltaReceivedAction,
  OrderBookActions,
  SnapshotReceivedAction,
} from './orderBook.actions';

const initialState: OrderBookState = {};

const snapshotReceived = (
  prevState: OrderBookState,
  action: SnapshotReceivedAction
): OrderBookState => {
  return {
    ...prevState, // TODO: Modify state here
  };
};

const deltaReceived = (
  prevState: OrderBookState,
  action: DeltaReceivedAction
): OrderBookState => {
  return {
    ...prevState, // TODO: Modify state here
  };
};

const _orderBookReducer = (
  prevState: OrderBookState = initialState,
  action: OrderBookActions
): OrderBookState => {
  switch (
    action.type // TODO: Investigate exhaustive switch
  ) {
    case 'SnapshotReceivedAction':
      return snapshotReceived(prevState, action);
    case 'DeltaReceivedAction':
      return deltaReceived(prevState, action);
  }
  // return prevState;
};

/**
 * {@link _orderBookReducer is extracted in order to avoid `default` inside `switch` and enforce an exhaustiveness check by TS}
 */
export const orderBookReducer = (
  prevState: OrderBookState = initialState,
  action: OrderBookActions
): OrderBookState => {
  return _orderBookReducer(prevState, action) ?? prevState;
};
