import { combineEpics, ofType } from 'redux-observable';
import {
  DeltaReceived,
  ObserveProduct,
  OrderBookActions,
  SetConnectionStatus,
  SnapshotReceived,
  StopObservingProduct,
} from '../orderBook.actions';
import {
  catchError,
  filter,
  map,
  merge,
  Observable,
  of,
  switchMap,
  takeUntil,
} from 'rxjs';
import { prices$ as pricesNetwork$ } from '../../services/network/orderBookNetwork.service';

/**
 * Injectable {@param prices$} for testing purposes.
 * @param prices$
 */
export const observeProductEpic =
  (prices$ = pricesNetwork$) =>
  (action$: Observable<OrderBookActions>): Observable<OrderBookActions> =>
    action$.pipe(
      ofType<OrderBookActions, ObserveProduct['type']>('ObserveProduct'),
      switchMap(
        ({
          product,
        }): Observable<
          SetConnectionStatus | SnapshotReceived | DeltaReceived
        > => {
          return merge(
            of({
              type: 'SetConnectionStatus' as const,
              connectionStatus: 'subscribing' as const,
            }),
            prices$({
              products: [product],
            }).pipe(
              filter((event) => {
                // Ignore late events coming for the previous product
                return product === event.product;
              }),
              map((event) => {
                if (event.type === 'SubscribedReceived') {
                  console.debug(`Subscribed: ${product}`); // TODO: Proper logger
                  return {
                    type: 'SetConnectionStatus' as const,
                    connectionStatus: 'subscribed' as const,
                  };
                } else if (event.type === 'UnsubscribedReceived') {
                  return {
                    type: 'SetConnectionStatus' as const,
                    connectionStatus: 'unsubscribed' as const,
                  };
                } else {
                  return event;
                }
              }),
              catchError(() => {
                return of({
                  type: 'SetConnectionStatus' as const,
                  connectionStatus: 'error' as const,
                });
              }),
              takeUntil(action$.pipe(ofType('StopObservingProduct')))
            )
          );
        }
      )
    );

export const stopObservingProductEpic = (
  action$: Observable<OrderBookActions>
): Observable<SetConnectionStatus> =>
  action$.pipe(
    ofType<OrderBookActions, StopObservingProduct['type']>(
      'StopObservingProduct'
    ),
    map(() => {
      return {
        type: 'SetConnectionStatus',
        connectionStatus: 'unsubscribed',
      };
    })
  );

export const orderBookEpics = combineEpics(
  observeProductEpic(pricesNetwork$),
  stopObservingProductEpic
);
