import React from 'react';
import { render } from '@testing-library/react';
import { OrderBook } from './orderBook.component';

test('renders OrderBook', () => {
  const { baseElement } = render(<OrderBook />);
  expect(baseElement).toBeInTheDocument();
});
