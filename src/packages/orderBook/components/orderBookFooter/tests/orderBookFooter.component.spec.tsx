import React from 'react';
import { createRendererWithOrderBookStore } from '../../../tests/utils/createRendererWithOrderBookStore.util';
import { findByDataTestId } from '../../../../../tests/utils/findByDataTestId.util';
import { OrderBookFooter } from '../orderBookFooter.component';
import { renderWithOrderBookStore } from '../../../tests/utils/renderWithOrderBookStore.util';
import { fireEvent } from '@testing-library/react';
import { Product } from '../../../services/network/orderBookNetwork.types';

describe('orderBookFooter.component', () => {
  test('renders', () => {
    const renderer = createRendererWithOrderBookStore(
      <OrderBookFooter observeProduct={jest.fn()} />
    );

    expect(renderer.toJSON()).toMatchSnapshot();
    expect(findByDataTestId(renderer.root, 'toggle-feed-button')).toBeTruthy();
  });

  test('toggle feed button triggers feed observation', () => {
    const observeProduct = jest.fn();
    const { getByTestId } = renderWithOrderBookStore(
      <OrderBookFooter observeProduct={observeProduct} />
    );
    fireEvent(
      getByTestId('toggle-feed-button'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(observeProduct).toHaveBeenCalledTimes(1);
    // Product has been toggled
    expect(observeProduct).toHaveBeenCalledWith(Product.Ethereum_USD);
  });
});
