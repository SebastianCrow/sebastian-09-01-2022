import { TestScheduler } from 'rxjs/testing';
import { of } from 'rxjs';
import {
  SetConnectionStatus,
  StopObservingProduct,
} from '../orderBook.actions';
import { stopObservingProductEpic } from './orderBook.epic';
import { Product } from '../../services/network/orderBookNetwork.types';

describe('stopObservingProductEpic', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  test('sets connection status to `unsubscribed`', () => {
    testScheduler.run(({ expectObservable }) => {
      const action$ = of<StopObservingProduct>({
        type: 'StopObservingProduct',
        product: Product.Bitcoin_USD,
      });

      const output$ = stopObservingProductEpic(action$);
      const expected: SetConnectionStatus = {
        type: 'SetConnectionStatus',
        connectionStatus: 'unsubscribed',
      };

      expectObservable(output$).toBe('(a|)', {
        a: expected,
      });
    });
  });
});
