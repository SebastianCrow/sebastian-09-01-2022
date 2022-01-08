import React from 'react';
import { act, ReactTestRenderer } from 'react-test-renderer';
import { createRendererWithOrderBookStore } from '../../../tests/utils/createRendererWithOrderBookStore.util';
import { OrderBookContent } from '../orderBookContent.component';
import { OrderBookTable } from '../../orderBookTable/orderBookTable.component';
import { SpreadHeader } from '../../spreadHeader/spreadHeader.component';
import { createRendererWithStore } from '../../../../../tests/utils/createRendererWithStore.util';
import { getOrderBookMockStore } from '../../../../../tests/mocks/getOrderBookMockStore';
import { Loader } from '../../../../ui/loader/loader.component';

describe('orderBookContent.component', () => {
  let renderer: ReactTestRenderer;

  test('renders', () => {
    act(() => {
      renderer = createRendererWithOrderBookStore(<OrderBookContent />);
    });

    expect(renderer.toJSON()).toMatchSnapshot();
    expect(renderer.root.findAllByType(OrderBookTable)).toHaveLength(2);
    // TODO: Some kind of visual testing to check media queries (`mobile` and `desktop` classes) to check <SpreadHeader /> display
    expect(renderer.root.findAllByType(SpreadHeader)).toHaveLength(1);
  });

  test('renders loading overlay', () => {
    act(() => {
      renderer = createRendererWithStore(
        <OrderBookContent />,
        getOrderBookMockStore({
          bids: undefined,
          asks: undefined,
        })
      );
    });

    expect(renderer.toJSON()).toMatchSnapshot();
    expect(renderer.root.findAllByType(Loader)).toHaveLength(1);
  });
});
