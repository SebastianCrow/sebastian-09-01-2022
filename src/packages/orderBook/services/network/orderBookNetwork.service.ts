import { webSocket } from 'rxjs/webSocket';
import memoizeOne from 'memoize-one';
import { throttle } from 'lodash';
import { Product, ReceivedEvents } from './orderBookNetwork.types';
import { EMPTY, Observable, Subscriber, takeUntil } from 'rxjs';
import {
  DeltaResponseDto,
  isDeltaResponseDto,
  isSnapshotResponseDto,
  isSubscribedResponseDto,
  isUnsubscribedResponseDto,
  SubscribeRequestDto,
  UnsubscribeRequestDto,
} from './dto/orderBook.dto';
import { convertProductIdToProduct } from './converters/convertProductIdToProduct.converter';
import { convertProductToProductId } from './converters/convertProductToProductId.converter';
import { convertPriceDtoToPriceInfo } from './converters/convertPriceDtoToPriceInfo.converter';

const WEB_SOCKET_ENDPOINT = 'wss://www.cryptofacilities.com/ws/v1';

// TODO: Throttling based on device performance
const RECEIVED_EVENTS_THROTTLE_DURATION = 100;

export const prices$ = (
  products: Product[],
  cancel$?: Observable<void>
): Observable<ReceivedEvents> => {
  const subject = getWebSocketSubject();

  const onDeltaResponseThrottled = throttle(
    (dto: DeltaResponseDto, subscriber: Subscriber<ReceivedEvents>) => {
      subscriber.next({
        type: 'DeltaReceived',
        product: convertProductIdToProduct(dto.product_id),
        bids: dto.bids.map(convertPriceDtoToPriceInfo),
        asks: dto.asks.map(convertPriceDtoToPriceInfo),
      });
    },
    RECEIVED_EVENTS_THROTTLE_DURATION
  );

  const events$ = new Observable<ReceivedEvents>((subscriber) => {
    // Propagate events
    subject.subscribe({
      next: (dto) => {
        // subscriber.error(new Error('hah!'));
        // return;

        if (isSubscribedResponseDto(dto) && dto.product_ids.length) {
          subscriber.next({
            type: 'SubscribedReceived',
            product: convertProductIdToProduct(dto.product_ids[0]), // TODO: Is that correct?
          });
        } else if (isUnsubscribedResponseDto(dto) && dto.product_ids.length) {
          subscriber.next({
            type: 'UnsubscribedReceived',
            product: convertProductIdToProduct(dto.product_ids[0]), // TODO: Is that correct?
          });
        } else if (isSnapshotResponseDto(dto)) {
          subscriber.next({
            type: 'SnapshotReceived',
            product: convertProductIdToProduct(dto.product_id),
            numLevels: dto.numLevels,
            bids: dto.bids.map(convertPriceDtoToPriceInfo),
            asks: dto.asks.map(convertPriceDtoToPriceInfo),
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
      subject.next(unsubscribeEvent);
    };
  });
  return events$.pipe(takeUntil(cancel$ ?? EMPTY));
};

const getWebSocketSubject = memoizeOne(() =>
  webSocket<any>(WEB_SOCKET_ENDPOINT)
); // TODO: Casting
