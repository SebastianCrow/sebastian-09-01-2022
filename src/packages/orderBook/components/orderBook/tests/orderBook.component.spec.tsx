import React from 'react';
import { OrderBookContent } from '../../orderBookContent/orderBookContent.component';
import { OrderBookHeader } from '../../orderBookHeader/orderBookHeader.component';
import { OrderBookFooter } from '../../orderBookFooter/orderBookFooter.component';
import { OrderBook } from '../orderBook.component';
import { createRendererWithOrderBookStore } from '../../../tests/utils/createRendererWithOrderBookStore.util';
import { getOrderBookMockStore } from '../../../../../tests/mocks/getOrderBookMockStore';

describe('orderBook.component', () => {
  test('renders', () => {
    const renderer = createRendererWithOrderBookStore(<OrderBook />);

    expect(renderer.toJSON()).toMatchSnapshot();
    expect(renderer.root.findAllByType(OrderBookHeader)).toHaveLength(1);
    expect(renderer.root.findAllByType(OrderBookContent)).toHaveLength(1);
    expect(renderer.root.findAllByType(OrderBookFooter)).toHaveLength(1);
  });

  test('renders with `error` connection status', () => {
    const renderer = createRendererWithOrderBookStore(
      <OrderBook />,
      getOrderBookMockStore({
        connectionStatus: 'error',
      })
    );

    expect(renderer.toJSON()).toMatchSnapshot();
    expect(renderer.root.findAllByType(OrderBookHeader)).toHaveLength(1);
    expect(renderer.root.findAllByType(OrderBookContent)).toHaveLength(1);
    expect(renderer.root.findAllByType(OrderBookFooter)).toHaveLength(1);
  });
});
