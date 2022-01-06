import { webSocket } from 'rxjs/webSocket';
import memoizeOne from 'memoize-one';
import {
  DeltaReceived,
  ProductId,
  SnapshotReceived,
} from './orderBookNetwork.types';
import { Observable } from 'rxjs';
import {
  isDeltaResponseDto,
  isSnapshotResponseDto,
  SubscribeRequestDto,
  UnsubscribeRequestDto,
} from './dto/orderBook.dto';

const WEB_SOCKET_ENDPOINT = 'wss://www.cryptofacilities.com/ws/v1';

export const prices$ = (
  productIds: ProductId[]
): Observable<SnapshotReceived | DeltaReceived> => {
  const subject = getWebSocketSubject();
  return new Observable<SnapshotReceived | DeltaReceived>((subscriber) => {
    // Propagate 'snapshot' and 'delta' events
    subject.subscribe({
      next: (dto) => {
        if (isSnapshotResponseDto(dto)) {
          subscriber.next({
            type: 'SnapshotReceived',
            productId: dto.product_id,
            numLevels: dto.numLevels,
            bids: dto.bids,
            asks: dto.asks,
          });
        } else if (isDeltaResponseDto(dto)) {
          subscriber.next({
            type: 'DeltaReceived',
            productId: dto.product_id,
            bids: dto.bids,
            asks: dto.asks,
          });
        }
      },
      error: (err) => subscriber.error(err),
      complete: () => subscriber.complete(),
    });

    // Subscribe to the product ids
    const subscribeEvent: SubscribeRequestDto = {
      event: 'subscribe',
      feed: 'book_ui_1',
      product_ids: productIds,
    };
    subject.next(subscribeEvent);

    return () => {
      // Unsubscribe from listening the product ids
      const unsubscribeEvent: UnsubscribeRequestDto = {
        event: 'unsubscribe',
        feed: 'book_ui_1',
        product_ids: productIds, // TODO: Unsubscribe only the given product ids?
      };
      return subject.next(unsubscribeEvent);
    };
  });
};

const getWebSocketSubject = memoizeOne(() =>
  webSocket<any>(WEB_SOCKET_ENDPOINT)
); // TODO: Casting)
