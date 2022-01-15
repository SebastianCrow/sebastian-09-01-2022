import React from 'react';
import { createRendererWithOrderBookStore } from '../../../tests/utils/createRendererWithOrderBookStore.util';
import { OrderBookContent } from '../orderBookContent.component';
import { OrderBookTable } from '../../orderBookTable/orderBookTable.component';
import { SpreadHeader } from '../../spreadHeader/spreadHeader.component';
import { createRendererWithStore } from '../../../../../tests/utils/createRendererWithStore.util';
import { getOrderBookMockStore } from '../../../../../tests/mocks/getOrderBookMockStore';
import { Loader } from '../../../../ui/loader/loader.component';

describe('orderBookContent.component', () => {
  test('renders', () => {
    const renderer = createRendererWithOrderBookStore(<OrderBookContent />);

    expect(renderer.toJSON()).toMatchSnapshot();
    expect(renderer.root.findAllByType(OrderBookTable)).toHaveLength(2);
    // TODO: Visual testing checking media queries (`mobile` and `desktop` classes) to check <SpreadHeader /> display
    expect(renderer.root.findAllByType(SpreadHeader)).toHaveLength(1);
  });

  test('renders loading overlay for `subscribing` state', () => {
    const renderer = createRendererWithStore(
      <OrderBookContent />,
      getOrderBookMockStore({
        connectionStatus: 'subscribing',
      })
    );

    expect(renderer.toJSON()).toMatchSnapshot();
    expect(renderer.root.findAllByType(Loader)).toHaveLength(1);
    expect(renderer.root.findAllByType(OrderBookTable)).toHaveLength(0);
    expect(renderer.root.findAllByType(SpreadHeader)).toHaveLength(0);
  });

  test('does not render content for missing data', () => {
    const renderer = createRendererWithStore(
      <OrderBookContent />,
      getOrderBookMockStore({
        connectionStatus: 'unsubscribed',
        prices: undefined,
      })
    );

    expect(renderer.toJSON()).toMatchSnapshot();
    expect(renderer.root.findAllByType(Loader)).toHaveLength(0);
    expect(renderer.root.findAllByType(OrderBookTable)).toHaveLength(0);
    expect(renderer.root.findAllByType(SpreadHeader)).toHaveLength(0);
  });
});
