import { renderHook } from '@testing-library/react-hooks';
import { useStartObservingProduct } from './useStartObservingProduct.hook';
import { AppProviders } from '../../app/components/appProviders';
import * as useDispatchOrderBookHook from './useDispatchOrderBook.hook';
import { ObserveProduct } from '../state/orderBook.actions';
import { Product } from '../services/network/orderBookNetwork.types';
import { getOrderBookMockStore } from '../../../tests/mocks/getOrderBookMockStore';

describe('useStartObservingProduct.hook', () => {
  test('starts observing product on mount', () => {
    const useDispatchOrderBookMock = jest.fn();
    jest
      .spyOn(useDispatchOrderBookHook, 'useDispatchOrderBook')
      .mockImplementation(() => useDispatchOrderBookMock);

    const { rerender } = renderHook(() => useStartObservingProduct(), {
      wrapper: AppProviders,
    });

    const observeProduct: ObserveProduct = {
      type: 'ObserveProduct',
      product: Product.Bitcoin_USD,
    };
    expect(useDispatchOrderBookMock).toHaveBeenCalledTimes(1);
    expect(useDispatchOrderBookMock).toHaveBeenCalledWith(observeProduct);

    rerender({
      store: getOrderBookMockStore({
        product: Product.Ethereum_USD,
      }),
    });

    // The action is not called again
    expect(useDispatchOrderBookMock).toHaveBeenCalledTimes(1);
  });
});
