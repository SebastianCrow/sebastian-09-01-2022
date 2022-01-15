import { TestScheduler } from 'rxjs/testing';
import { prices$ } from './orderBookNetwork.service';
import {
  DeltaResponseDto,
  OrderBookRequestDto,
  OrderBookResponseDto,
  SnapshotResponseDto,
  SubscribedResponseDto,
  SubscribeRequestDto,
  UnsubscribedResponseDto,
  UnsubscribeRequestDto,
} from './dto/orderBook.dto';
import { Subject } from 'rxjs';
import {
  DeltaReceived,
  Product,
  ReceivedEvents,
  SnapshotReceived,
  SubscribedReceived,
  UnsubscribedReceived,
} from './orderBookNetwork.types';
import { asPrice, asSize } from '../../state/orderBook.types';
import DoneCallback = jest.DoneCallback;

describe('orderBookNetwork.service', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toStrictEqual(expected);
    });
  });

  test('subscribes to the product', () => {
    testScheduler.run(({ expectObservable, flush }) => {
      const networkSubject = new Subject<
        OrderBookRequestDto | OrderBookResponseDto
      >();
      const spyNetworkSubjectNext = jest.spyOn(networkSubject, 'next');

      const output$ = prices$({
        products: [Product.Ethereum_USD],
        networkSubject,
      });

      expectObservable(output$).toBe('', {});
      flush();

      const subscribeEvent: SubscribeRequestDto = {
        event: 'subscribe',
        feed: 'book_ui_1',
        product_ids: ['PI_ETHUSD'],
      };

      expect(spyNetworkSubjectNext).toHaveBeenCalledTimes(1);
      expect(spyNetworkSubjectNext).toHaveBeenCalledWith(subscribeEvent);
    });
  });

  test('unsubscribes from the product', (done) => {
    const networkSubject = new Subject<
      OrderBookRequestDto | OrderBookResponseDto
    >();
    const spyNetworkSubjectNext = jest.spyOn(networkSubject, 'next');

    const events$ = prices$({
      products: [Product.Ethereum_USD],
      networkSubject,
    }).subscribe();

    const subscribeEvent: SubscribeRequestDto = {
      event: 'subscribe',
      feed: 'book_ui_1',
      product_ids: ['PI_ETHUSD'],
    };
    expect(spyNetworkSubjectNext).toHaveBeenCalledTimes(1);
    expect(spyNetworkSubjectNext).toHaveBeenCalledWith(subscribeEvent);

    events$.unsubscribe();

    const unsubscribeEvent: UnsubscribeRequestDto = {
      event: 'unsubscribe',
      feed: 'book_ui_1',
      product_ids: ['PI_ETHUSD'],
    };
    expect(spyNetworkSubjectNext).toHaveBeenCalledTimes(2);
    expect(spyNetworkSubjectNext).toHaveBeenCalledWith(unsubscribeEvent);
    done();
  });

  const testReceivedEvents = ({
    dto,
    expected,
    done,
  }: {
    dto: OrderBookResponseDto;
    expected: ReceivedEvents;
    done: DoneCallback;
  }) => {
    const networkSubject = new Subject<
      OrderBookRequestDto | OrderBookResponseDto
    >();

    prices$({
      products: [Product.Ethereum_USD],
      networkSubject,
    }).subscribe({
      next: (event) => {
        expect(event).toStrictEqual(expected);
        done();
      },
    });
    networkSubject.next(dto);
  };

  test('propagates `subscribed` event', (done) => {
    const dto: SubscribedResponseDto = {
      event: 'subscribed',
      feed: 'book_ui_1',
      product_ids: ['PI_ETHUSD'],
    };
    const expected: SubscribedReceived = {
      type: 'SubscribedReceived',
      product: Product.Ethereum_USD,
    };
    testReceivedEvents({
      dto,
      expected,
      done,
    });
  });

  test('propagates `unsubscribed` event', (done) => {
    const dto: UnsubscribedResponseDto = {
      event: 'unsubscribed',
      feed: 'book_ui_1',
      product_ids: ['PI_ETHUSD'],
    };
    const expected: UnsubscribedReceived = {
      type: 'UnsubscribedReceived',
      product: Product.Ethereum_USD,
    };
    testReceivedEvents({
      dto,
      expected,
      done,
    });
  });

  test('propagates `snapshot` event', (done) => {
    const dto: SnapshotResponseDto = {
      feed: 'book_ui_1_snapshot',
      product_id: 'PI_ETHUSD',
      numLevels: 15,
      bids: [
        [asPrice(1), asSize(2)],
        [asPrice(3), asSize(4)],
      ],
      asks: [
        [asPrice(5), asSize(6)],
        [asPrice(7), asSize(8)],
      ],
    };
    const expected: SnapshotReceived = {
      type: 'SnapshotReceived',
      product: Product.Ethereum_USD,
      numLevels: 15,
      bids: [
        { price: asPrice(1), size: asSize(2) },
        { price: asPrice(3), size: asSize(4) },
      ],
      asks: [
        { price: asPrice(5), size: asSize(6) },
        { price: asPrice(7), size: asSize(8) },
      ],
    };
    testReceivedEvents({
      dto,
      expected,
      done,
    });
  });

  test('propagates `delta` event', (done) => {
    const dto: DeltaResponseDto = {
      feed: 'book_ui_1',
      product_id: 'PI_ETHUSD',
      bids: [
        [asPrice(1), asSize(2)],
        [asPrice(3), asSize(4)],
      ],
      asks: [
        [asPrice(5), asSize(6)],
        [asPrice(7), asSize(8)],
      ],
    };
    const expected: DeltaReceived = {
      type: 'DeltaReceived',
      product: Product.Ethereum_USD,
      bids: [
        { price: asPrice(1), size: asSize(2) },
        { price: asPrice(3), size: asSize(4) },
      ],
      asks: [
        { price: asPrice(5), size: asSize(6) },
        { price: asPrice(7), size: asSize(8) },
      ],
    };
    testReceivedEvents({
      dto,
      expected,
      done,
    });
  });
});
