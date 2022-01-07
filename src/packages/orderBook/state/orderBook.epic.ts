import { combineEpics, Epic, ofType } from 'redux-observable';
import {
  DeltaReceived,
  ObserveProduct,
  OrderBookActions,
  SetConnectionStatus,
  SnapshotReceived,
  StopObservingProduct,
} from './orderBook.actions';
import { filter, map, merge, Observable, of, switchMap, takeUntil } from 'rxjs';
import { prices$ } from '../services/network/orderBookNetwork.service';
import { AppState } from '../../../shared/state/rootReducer';

export const observeProductEpic: Epic<
  OrderBookActions,
  OrderBookActions,
  AppState
> = (action$) =>
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
            type: 'SetConnectionStatus' as const, // TODO: Is it required?
            connectionStatus: 'subscribing' as const, // TODO: Is it required?
          }),
          prices$([product]).pipe(
            filter((event) => {
              // Ignore late events coming for the previous product
              return product === event.product;
            }),
            map((event) => {
              if (event.type === 'SubscribedReceived') {
                return {
                  type: 'SetConnectionStatus' as const, // TODO: Is it required?
                  connectionStatus: 'subscribed' as const, // TODO: Is it required?
                };
              } else if (event.type === 'UnsubscribedReceived') {
                return {
                  type: 'SetConnectionStatus' as const, // TODO: Is it required?
                  connectionStatus: 'unsubscribed' as const, // TODO: Is it required?
                };
              } else {
                return event;
              }
            }),
            takeUntil(action$.pipe(ofType('StopObservingProduct')))
          )
        );
      }
    )
  );

export const stopObservingProductEpic: Epic<
  OrderBookActions,
  OrderBookActions,
  AppState
> = (action$) =>
  action$.pipe(
    ofType<OrderBookActions, StopObservingProduct['type']>(
      'StopObservingProduct'
    ),
    map(() => {
      return {
        type: 'SetConnectionStatus' as const, // TODO: Is it required?
        connectionStatus: 'unsubscribed' as const, // TODO: Is it required?
      };
    })
  );

export const orderBookEpics = combineEpics(
  observeProductEpic,
  stopObservingProductEpic
);
