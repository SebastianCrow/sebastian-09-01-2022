import { TestScheduler } from 'rxjs/testing';
import { of } from 'rxjs';
import { ObserveProduct, SetConnectionStatus } from '../orderBook.actions';
import { observeProductEpic } from './orderBook.epic';
import {
  DeltaReceived,
  Product,
  SnapshotReceived,
  SubscribedReceived,
  UnsubscribedReceived,
} from '../../services/network/orderBookNetwork.types';
import { asPrice, asSize } from '../orderBook.types';

describe('observeProductEpic', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  test('handles `SubscribedReceived` event', () => {
    testScheduler.run(({ expectObservable, hot }) => {
      const action$ = of<ObserveProduct>({
        type: 'ObserveProduct',
        product: Product.Bitcoin_USD,
      });

      // Trigger `SubscribedReceived` network event.
      // It will be handled for current product but ignored for another one.
      const currentProduct: SubscribedReceived = {
        type: 'SubscribedReceived',
        product: Product.Bitcoin_USD,
      };
      const anotherProduct: SubscribedReceived = {
        type: 'SubscribedReceived',
        product: Product.Ethereum_USD,
      };
      const events$ = hot('ab', { a: currentProduct, b: anotherProduct });

      const output$ = observeProductEpic(() => events$)(action$);

      const b: SetConnectionStatus = {
        type: 'SetConnectionStatus',
        connectionStatus: 'subscribing',
      };
      const c: SetConnectionStatus = {
        type: 'SetConnectionStatus',
        connectionStatus: 'subscribed',
      };

      expectObservable(output$).toBe('(bc)', {
        b,
        c,
      });
    });
  });

  test('handles `UnsubscribedReceived` event', () => {
    testScheduler.run(({ expectObservable, hot }) => {
      const action$ = of<ObserveProduct>({
        type: 'ObserveProduct',
        product: Product.Bitcoin_USD,
      });

      // Trigger `UnsubscribedReceived` network event.
      // It will be handled for current product but ignored for another one.
      const currentProduct: UnsubscribedReceived = {
        type: 'UnsubscribedReceived',
        product: Product.Bitcoin_USD,
      };
      const anotherProduct: UnsubscribedReceived = {
        type: 'UnsubscribedReceived',
        product: Product.Ethereum_USD,
      };
      const events$ = hot('ab', { a: currentProduct, b: anotherProduct });

      const output$ = observeProductEpic(() => events$)(action$);

      const b: SetConnectionStatus = {
        type: 'SetConnectionStatus',
        connectionStatus: 'subscribing',
      };
      const c: SetConnectionStatus = {
        type: 'SetConnectionStatus',
        connectionStatus: 'unsubscribed',
      };

      expectObservable(output$).toBe('(bc)', {
        b,
        c,
      });
    });
  });

  test('handles `SnapshotReceived` event', () => {
    testScheduler.run(({ expectObservable, hot }) => {
      const action$ = of<ObserveProduct>({
        type: 'ObserveProduct',
        product: Product.Bitcoin_USD,
      });

      // Trigger `SnapshotReceived` network event.
      // It will be handled for current product but ignored for another one.
      const currentProduct: SnapshotReceived = {
        type: 'SnapshotReceived',
        product: Product.Bitcoin_USD,
        numLevels: 2,
        asks: [
          { price: asPrice(1), size: asSize(2) },
          { price: asPrice(3), size: asSize(4) },
        ],
        bids: [
          { price: asPrice(5), size: asSize(6) },
          { price: asPrice(7), size: asSize(8) },
        ],
      };
      const anotherProduct: SnapshotReceived = {
        ...currentProduct,
        product: Product.Ethereum_USD,
      };
      const events$ = hot('ab', { a: currentProduct, b: anotherProduct });

      const output$ = observeProductEpic(() => events$)(action$);

      const b: SetConnectionStatus = {
        type: 'SetConnectionStatus',
        connectionStatus: 'subscribing',
      };

      expectObservable(output$).toBe('(bc)', {
        b,
        c: currentProduct, // event is propagated
      });
    });
  });

  test('handles `DeltaReceived` event', () => {
    testScheduler.run(({ expectObservable, hot }) => {
      const action$ = of<ObserveProduct>({
        type: 'ObserveProduct',
        product: Product.Bitcoin_USD,
      });

      // Trigger `DeltaReceived` network event.
      // It will be handled for current product but ignored for another one.
      const currentProduct: DeltaReceived = {
        type: 'DeltaReceived',
        product: Product.Bitcoin_USD,
        asks: [
          { price: asPrice(1), size: asSize(2) },
          { price: asPrice(3), size: asSize(4) },
        ],
        bids: [
          { price: asPrice(5), size: asSize(6) },
          { price: asPrice(7), size: asSize(8) },
        ],
      };
      const anotherProduct: DeltaReceived = {
        ...currentProduct,
        product: Product.Ethereum_USD,
      };
      const events$ = hot('ab', { a: currentProduct, b: anotherProduct });

      const output$ = observeProductEpic(() => events$)(action$);

      const b: SetConnectionStatus = {
        type: 'SetConnectionStatus',
        connectionStatus: 'subscribing',
      };

      expectObservable(output$).toBe('(bc)', {
        b,
        c: currentProduct, // event is propagated
      });
    });
  });
});
