import { combineEpics, Epic, ofType } from 'redux-observable';
import {
  DeltaReceived,
  ObserveProduct,
  OrderBookActions,
  SnapshotReceived,
} from './orderBook.actions';
import { filter, Observable, switchMap } from 'rxjs';
import { prices$ } from '../services/network/orderBookNetwork.service';
import { AppState } from '../../../shared/state/rootReducer';

export const observeProductEpic: Epic<
  OrderBookActions,
  OrderBookActions,
  AppState
> = (action$) =>
  action$.pipe(
    ofType<OrderBookActions, ObserveProduct['type']>('ObserveProduct'), // TODO: Is explicit typing required?
    switchMap(({ product }): Observable<SnapshotReceived | DeltaReceived> => {
      return prices$([product]).pipe(
        filter((event) => {
          // Ignore late events coming for the previous product
          return product === event.product;
        })
      );
    })
  );

export const orderBookEpics = combineEpics(observeProductEpic);
