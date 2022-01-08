import { getOrderBookMockState } from '../../../../tests/mocks/getOrderBookMockStore';
import { StopObservingProduct } from '../orderBook.actions';
import { orderBookReducer } from './orderBook.reducer';
import { Product } from '../../services/network/orderBookNetwork.types';

describe('stopObservingProduct.reducer', () => {
  test('stopObservingProduct', () => {
    const input = getOrderBookMockState();
    const action: StopObservingProduct = {
      type: 'StopObservingProduct',
      product: Product.Bitcoin_USD,
    };
    const output = getOrderBookMockState();
    expect(orderBookReducer(input, action)).toStrictEqual(output);
  });
});
