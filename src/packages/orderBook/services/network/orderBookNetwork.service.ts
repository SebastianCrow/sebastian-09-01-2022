import { webSocket } from 'rxjs/webSocket';
import memoizeOne from 'memoize-one';
import { Product, ReceivedEvents } from './orderBookNetwork.types';
import { Observable, Subject } from 'rxjs';
import {
  isDeltaResponseDto,
  isSnapshotResponseDto,
  isSubscribedResponseDto,
  isUnsubscribedResponseDto,
  OrderBookRequestDto,
  OrderBookResponseDto,
  SubscribeRequestDto,
  UnsubscribeRequestDto,
} from './dto/orderBook.dto';
import { convertProductIdToProduct } from './converters/convertProductIdToProduct.converter';
import { convertPriceDtoToPriceInfo } from './converters/convertPriceDtoToPriceInfo.converter';

const WEB_SOCKET_ENDPOINT = 'wss://www.cryptofacilities.com/ws/v1';

const getWebSocketSubject = memoizeOne(() =>
  webSocket<OrderBookRequestDto | OrderBookResponseDto>(WEB_SOCKET_ENDPOINT)
);

export const prices$ = ({
  products,
  networkSubject = getWebSocketSubject(),
}: {
  products: Product[];
  networkSubject?: Subject<OrderBookRequestDto | OrderBookResponseDto>;
}): Observable<ReceivedEvents> => {
  return new Observable<ReceivedEvents>((subscriber) => {
    // Propagate events
    networkSubject.subscribe({
      next: (dto) => {
        if (isSubscribedResponseDto(dto) && dto.product_ids.length) {
          for (const productId of dto.product_ids) {
            subscriber.next({
              type: 'SubscribedReceived',
              product: convertProductIdToProduct(productId),
            });
          }
        } else if (isUnsubscribedResponseDto(dto) && dto.product_ids.length) {
          for (const productId of dto.product_ids) {
            subscriber.next({
              type: 'UnsubscribedReceived',
              product: convertProductIdToProduct(productId),
            });
          }
        } else if (isSnapshotResponseDto(dto)) {
          subscriber.next({
            type: 'SnapshotReceived',
            product: convertProductIdToProduct(dto.product_id),
            numLevels: dto.numLevels,
            bids: dto.bids.map(convertPriceDtoToPriceInfo),
            asks: dto.asks.map(convertPriceDtoToPriceInfo),
          });
        } else if (isDeltaResponseDto(dto)) {
          subscriber.next({
            type: 'DeltaReceived',
            product: convertProductIdToProduct(dto.product_id),
            bids: dto.bids.map(convertPriceDtoToPriceInfo),
            asks: dto.asks.map(convertPriceDtoToPriceInfo),
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
      product_ids: products,
    };
    networkSubject.next(subscribeEvent);

    return () => {
      // Unsubscribe from listening the product ids
      const unsubscribeEvent: UnsubscribeRequestDto = {
        event: 'unsubscribe',
        feed: 'book_ui_1',
        product_ids: products,
      };
      networkSubject.next(unsubscribeEvent);
    };
  });
};
