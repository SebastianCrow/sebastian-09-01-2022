import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { AppState } from '../../shared/state/rootReducer';
import {
  asPrice,
  asSize,
  OrderBookState,
} from '../../packages/orderBook/state/orderBook.types';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from '../../shared/state/rootEpic';

const ORDER_BOOK_STATE_MOCK: OrderBookState = {
  product: 'Bitcoin',
  connectionStatus: 'subscribed',
  bids: {
    [asPrice(34062.5)]: {
      price: asPrice(34062.5),
      size: asSize(1200),
    },
  },
  asks: {
    [asPrice(34079.5)]: {
      price: asPrice(34079.5),
      size: asSize(3356),
    },
  },
};

export const getOrderBookMockState = (
  state?: Partial<OrderBookState>
): OrderBookState => ({
  ...ORDER_BOOK_STATE_MOCK,
  ...state,
});

export const getOrderBookMockStore = (
  state?: Partial<OrderBookState>
): MockStoreEnhanced<AppState> => {
  // TODO: Are Epics needed here?
  const epicMiddleware = createEpicMiddleware();
  const mockStore = configureMockStore<AppState>([epicMiddleware]);

  const orderBookState = getOrderBookMockState(state);

  const appState: AppState = {
    orderBook: orderBookState,
  };

  const store = mockStore(appState);
  epicMiddleware.run(rootEpic);

  return store;
};
