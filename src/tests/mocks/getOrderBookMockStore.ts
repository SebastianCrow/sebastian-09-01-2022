import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { AppState } from '../../shared/state/rootReducer';
import { OrderBookState } from '../../packages/orderBook/state/orderBook.types';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from '../../shared/state/rootEpic';

export const getOrderBookMockStore = (
  state?: Partial<OrderBookState>
): MockStoreEnhanced<AppState> => {
  // TODO: Are Epics needed here?
  const epicMiddleware = createEpicMiddleware();
  const mockStore = configureMockStore<AppState>([epicMiddleware]);

  const orderBookState: OrderBookState = {
    product: 'Bitcoin',
    connectionStatus: 'unsubscribed',
    bids: undefined,
    asks: undefined,
    ...state,
  };

  const appState: AppState = {
    orderBook: orderBookState,
  };

  const store = mockStore(appState);
  epicMiddleware.run(rootEpic);

  return store;
};
