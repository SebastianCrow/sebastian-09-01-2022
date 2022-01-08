import { getOrderBookMockState } from '../../../../tests/mocks/getOrderBookMockStore';
import { ObserveProduct } from '../orderBook.actions';
import { orderBookReducer } from './orderBook.reducer';

describe('observeProduct.reducer', () => {
  test('observeProduct', () => {
    const input = getOrderBookMockState({
      product: 'Bitcoin',
    });
    const action: ObserveProduct = {
      type: 'ObserveProduct',
      product: 'Ethereum',
    };
    const output = getOrderBookMockState({
      product: 'Ethereum',
      bids: undefined,
      asks: undefined,
    });
    expect(orderBookReducer(input, action)).toStrictEqual(output);
  });
});
