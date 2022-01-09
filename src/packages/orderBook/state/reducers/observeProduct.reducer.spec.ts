import { getOrderBookMockState } from '../../../../tests/mocks/getOrderBookMockStore';
import { ObserveProduct } from '../orderBook.actions';
import { orderBookReducer } from './orderBook.reducer';
import { Product } from '../../services/network/orderBookNetwork.types';

describe('observeProduct.reducer', () => {
  test('observeProduct', () => {
    const input = getOrderBookMockState({
      product: Product.Bitcoin_USD,
    });
    const action: ObserveProduct = {
      type: 'ObserveProduct',
      product: Product.Ethereum_USD,
    };
    const output = getOrderBookMockState({
      product: Product.Ethereum_USD,
      prices: undefined,
    });
    expect(orderBookReducer(input, action)).toStrictEqual(output);
  });
});
