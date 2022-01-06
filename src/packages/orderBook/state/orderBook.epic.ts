import { combineEpics, Epic, ofType } from 'redux-observable';
import {
  DeltaReceived,
  ObserveProduct,
  OrderBookActions,
  SnapshotReceived,
} from './orderBook.actions';
import { Observable, switchMap } from 'rxjs';
import { prices$ } from '../services/network/orderBookNetwork.service';

export const observeProductEpic: Epic<OrderBookActions> = (action$) =>
  action$.pipe(
    ofType<OrderBookActions, ObserveProduct['type']>('ObserveProduct'), // TODO: Is explicit typing required?
    switchMap(
      ({ product }): Observable<SnapshotReceived | DeltaReceived> =>
        prices$([product])
    )
  );

export const orderBookEpics = combineEpics(observeProductEpic);
