import { getOrderBookMockState } from '../../../../tests/mocks/getOrderBookMockStore';
import { StopObservingProduct } from '../orderBook.actions';
import { orderBookReducer } from './orderBook.reducer';

describe('stopObservingProduct.reducer', () => {
  test('stopObservingProduct', () => {
    const input = getOrderBookMockState();
    const action: StopObservingProduct = {
      type: 'StopObservingProduct',
      product: 'Bitcoin',
    };
    const output = getOrderBookMockState();
    expect(orderBookReducer(input, action)).toStrictEqual(output);
  });
});
