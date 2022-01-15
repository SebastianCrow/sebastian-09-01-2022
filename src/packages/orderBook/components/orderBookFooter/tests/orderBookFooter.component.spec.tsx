import React from 'react';
import { createRendererWithOrderBookStore } from '../../../tests/utils/createRendererWithOrderBookStore.util';
import { findByDataTestId } from '../../../../../tests/utils/findByDataTestId.util';
import { OrderBookFooter } from '../orderBookFooter.component';
import { renderWithOrderBookStore } from '../../../tests/utils/renderWithOrderBookStore.util';
import { fireEvent } from '@testing-library/react';
import { Product } from '../../../services/network/orderBookNetwork.types';
import { ConnectionStatus } from '../../../state/orderBook.types';
import { getOrderBookMockStore } from '../../../../../tests/mocks/getOrderBookMockStore';
import { act } from 'react-test-renderer';

describe('orderBookFooter.component', () => {
  test('renders with enabled button for `subscribed` status', () => {
    const renderer = createRendererWithOrderBookStore(
      <OrderBookFooter observeProduct={jest.fn()} />
    );
    expect(renderer.toJSON()).toMatchSnapshot();
    expect(findByDataTestId(renderer.root, 'toggle-feed-button')).toBeTruthy();
    expect(
      findByDataTestId(renderer.root, 'toggle-feed-button').props.disabled
    ).toStrictEqual(false);
  });

  const DISABLED_STATUSES: ConnectionStatus[][] = [
    ['subscribing'],
    ['unsubscribed'],
    ['error'],
  ];
  test.each(DISABLED_STATUSES)(
    'renders with disabled button for `%s` connection status',
    (connectionStatus: ConnectionStatus) => {
      const renderer = createRendererWithOrderBookStore(
        <OrderBookFooter observeProduct={jest.fn()} />,
        getOrderBookMockStore({
          connectionStatus,
        })
      );
      expect(renderer.toJSON()).toMatchSnapshot();
      expect(
        findByDataTestId(renderer.root, 'toggle-feed-button')
      ).toBeTruthy();
      expect(
        findByDataTestId(renderer.root, 'toggle-feed-button').props.disabled
      ).toStrictEqual(true);
    }
  );

  test('toggle feed button triggers feed observation', () => {
    const observeProduct = jest.fn();
    const { getByTestId } = renderWithOrderBookStore(
      <OrderBookFooter observeProduct={observeProduct} />
    );

    act(() => {
      fireEvent(
        getByTestId('toggle-feed-button'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
    });

    expect(observeProduct).toHaveBeenCalledTimes(1);
    // Product has been toggled
    expect(observeProduct).toHaveBeenCalledWith(Product.Ethereum_USD);
  });
});
