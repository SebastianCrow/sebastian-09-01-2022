import { renderHook } from '@testing-library/react-hooks';
import { AppProviders } from '../../app/components/appProviders.component';
import * as useDispatchOrderBookHook from './useDispatchOrderBook.hook';
import * as useDocumentVisibilityStateHook from '../../../shared/hooks/useDocumentVisibilityState.hook';
import { useStopObservingProductOnDocumentHidden } from './useStopObservingProductOnDocumentHidden.hook';
import { StopObservingProduct } from '../state/orderBook.actions';
import { Product } from '../services/network/orderBookNetwork.types';
import { getOrderBookMockStore } from '../../../tests/mocks/getOrderBookMockStore';

describe('useStopObservingProductOnDocumentHidden.hook', () => {
  let useDispatchOrderBookMock: jest.Mock;

  beforeEach(() => {
    useDispatchOrderBookMock = jest.fn();
    jest
      .spyOn(useDispatchOrderBookHook, 'useDispatchOrderBook')
      .mockImplementation(() => useDispatchOrderBookMock);
  });

  test('stops observing product on document hidden', () => {
    jest
      .spyOn(useDocumentVisibilityStateHook, 'useDocumentVisibilityState')
      .mockImplementation(() => 'visible');

    const { rerender } = renderHook(
      () => useStopObservingProductOnDocumentHidden(),
      {
        wrapper: AppProviders,
      }
    );

    expect(useDispatchOrderBookMock).toHaveBeenCalledTimes(0);

    jest
      .spyOn(useDocumentVisibilityStateHook, 'useDocumentVisibilityState')
      .mockImplementation(() => 'hidden');

    rerender();

    const stopObservingProduct: StopObservingProduct = {
      type: 'StopObservingProduct',
      product: Product.Bitcoin_USD,
    };

    expect(useDispatchOrderBookMock).toHaveBeenCalledTimes(1);
    expect(useDispatchOrderBookMock).toHaveBeenCalledWith(stopObservingProduct);
  });

  test('does not stop observing product on document hidden in `error` connection status', () => {
    jest
      .spyOn(useDocumentVisibilityStateHook, 'useDocumentVisibilityState')
      .mockImplementation(() => 'visible');

    const { rerender } = renderHook(
      () => useStopObservingProductOnDocumentHidden(),
      {
        wrapper: AppProviders,
        initialProps: {
          store: getOrderBookMockStore({
            connectionStatus: 'error',
          }),
        },
      }
    );

    jest
      .spyOn(useDocumentVisibilityStateHook, 'useDocumentVisibilityState')
      .mockImplementation(() => 'hidden');

    rerender();

    expect(useDispatchOrderBookMock).toHaveBeenCalledTimes(0);
  });
});
