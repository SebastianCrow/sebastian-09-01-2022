import { ReactElement } from 'react';
import { getOrderBookMockStore } from '../../../../tests/mocks/getOrderBookMockStore';
import { createRendererWithStore } from '../../../../tests/utils/createRendererWithStore.util';

export const createRendererWithOrderBookStore = (
  Component: ReactElement,
  store = getOrderBookMockStore()
) => {
  return createRendererWithStore(Component, store);
};
