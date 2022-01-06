import { webSocket } from 'rxjs/webSocket';
import memoizeOne from 'memoize-one';
import { throttle } from 'lodash';
import {
  DeltaReceived,
  Product,
  SnapshotReceived,
} from './orderBookNetwork.types';
import { Observable, Subscriber } from 'rxjs';
import {
  DeltaResponseDto,
  isDeltaResponseDto,
  isSnapshotResponseDto,
  OrderBookResponseDto,
  SubscribeRequestDto,
  UnsubscribeRequestDto,
} from './dto/orderBook.dto';
import { convertProductIdToProduct } from './converters/convertProductIdToProduct.converter';
import { convertProductToProductId } from './converters/convertProductToProductId.converter';

const WEB_SOCKET_ENDPOINT = 'wss://www.cryptofacilities.com/ws/v1';

const RECEIVED_EVENTS_THROTTLE_DURATION = 1000;

export const prices$ = (
  products: Product[]
): Observable<SnapshotReceived | DeltaReceived> => {
  const subject = getWebSocketSubject();

  const onDeltaResponseThrottled = throttle(
    (
      dto: DeltaResponseDto,
      subscriber: Subscriber<SnapshotReceived | DeltaReceived>
    ) => {
      subscriber.next({
        type: 'DeltaReceived',
        product: convertProductIdToProduct(dto.product_id),
        bids: dto.bids,
        asks: dto.asks,
      });
    },
    RECEIVED_EVENTS_THROTTLE_DURATION
  );

  return new Observable<SnapshotReceived | DeltaReceived>((subscriber) => {
    // Propagate 'snapshot' and 'delta' events
    subject.subscribe({
      next: (dto) => {
        if (isSnapshotResponseDto(dto)) {
          subscriber.next({
            type: 'SnapshotReceived',
            product: convertProductIdToProduct(dto.product_id),
            numLevels: dto.numLevels,
            bids: dto.bids,
            asks: dto.asks,
          });
        } else if (isDeltaResponseDto(dto)) {
          onDeltaResponseThrottled(dto, subscriber);
        }
      },
      error: (err) => subscriber.error(err),
      complete: () => subscriber.complete(),
    });

    // Subscribe to the product ids
    const subscribeEvent: SubscribeRequestDto = {
      event: 'subscribe',
      feed: 'book_ui_1',
      product_ids: products.map(convertProductToProductId),
    };
    subject.next(subscribeEvent);

    return () => {
      // Unsubscribe from listening the product ids
      const unsubscribeEvent: UnsubscribeRequestDto = {
        event: 'unsubscribe',
        feed: 'book_ui_1',
        product_ids: products.map(convertProductToProductId), // TODO: Unsubscribe only the given product ids?
      };
      return subject.next(unsubscribeEvent);
    };
  });
};

const getWebSocketSubject = memoizeOne(() =>
  webSocket<any>(WEB_SOCKET_ENDPOINT)
); // TODO: Casting
