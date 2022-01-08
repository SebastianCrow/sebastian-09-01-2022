import React from 'react';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import { OrderBook } from '../orderBook.component';
import { AppProviders } from '../../../../app/components/appProviders';
import { MockStoreEnhanced } from 'redux-mock-store';
import { AppState } from '../../../../../shared/state/rootReducer';
import { getOrderBookMockStore } from '../../../../../tests/mocks/getOrderBookMockStore';
import { OrderBookContent } from '../../orderBookContent/orderBookContent.component';
import { OrderBookHeader } from '../../orderBookHeader/orderBookHeader.component';
import { OrderBookFooter } from '../../orderBookFooter/orderBookFooter.component';

describe('orderBook.component', () => {
  let store: MockStoreEnhanced<AppState>;
  let root: ReactTestRenderer;

  test('renders', () => {
    store = getOrderBookMockStore();
    act(() => {
      root = create(
        <AppProviders store={store}>
          <OrderBook />
        </AppProviders>
      );
    });

    expect(root.toJSON()).toMatchSnapshot();
    expect(root.root.findAllByType(OrderBookHeader)).toHaveLength(1);
    expect(root.root.findAllByType(OrderBookContent)).toHaveLength(1);
    expect(root.root.findAllByType(OrderBookFooter)).toHaveLength(1);
  });

  test('renders with `error` connection status', () => {
    store = getOrderBookMockStore({
      connectionStatus: 'error',
    });
    act(() => {
      root = create(
        <AppProviders store={store}>
          <OrderBook />
        </AppProviders>
      );
    });

    expect(root.toJSON()).toMatchSnapshot();
    expect(root.root.findAllByType(OrderBookHeader)).toHaveLength(1);
    expect(root.root.findAllByType(OrderBookContent)).toHaveLength(0);
    expect(root.root.findAllByType(OrderBookFooter)).toHaveLength(1);
  });
});
