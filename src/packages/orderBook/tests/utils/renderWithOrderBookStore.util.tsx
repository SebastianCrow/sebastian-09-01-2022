import { ReactElement } from 'react';
import { renderWithStore } from '../../../../tests/utils/renderWithStore.util';
import { getOrderBookMockStore } from '../../../../tests/mocks/getOrderBookMockStore';

export const renderWithOrderBookStore = (
  Component: ReactElement,
  store = getOrderBookMockStore()
) => {
  return renderWithStore(Component, store);
};
