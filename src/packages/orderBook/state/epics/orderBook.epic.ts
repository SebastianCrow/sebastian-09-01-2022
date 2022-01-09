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
 * Start observing the prices network and propagate received events.
 * Injectable {@param prices$} for testing purposes.
 * @param prices$ Prices network handler
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
          const setConnectionStatus: SetConnectionStatus = {
            type: 'SetConnectionStatus',
            connectionStatus: 'subscribing',
          };
          return merge(
            of(setConnectionStatus),
            prices$({
              products: [product],
            }).pipe(
              filter((event) => {
                // Ignore late events coming for the previous product
                return product === event.product;
              }),
              map(
                (
                  event
                ): SetConnectionStatus | SnapshotReceived | DeltaReceived => {
                  if (event.type === 'SubscribedReceived') {
                    console.debug(`Subscribed: ${product}`); // TODO: Proper logger
                    return {
                      type: 'SetConnectionStatus',
                      connectionStatus: 'subscribed',
                    };
                  } else if (event.type === 'UnsubscribedReceived') {
                    return {
                      type: 'SetConnectionStatus',
                      connectionStatus: 'unsubscribed',
                    };
                  } else {
                    return event;
                  }
                }
              ),
              catchError((): Observable<SetConnectionStatus> => {
                return of({
                  type: 'SetConnectionStatus',
                  connectionStatus: 'error',
                });
              }),
              takeUntil(action$.pipe(ofType('StopObservingProduct')))
            )
          );
        }
      )
    );

/**
 * Set connection status to `unsubscribed`
 */
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
