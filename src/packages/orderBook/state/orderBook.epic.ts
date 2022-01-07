import { combineEpics, Epic, ofType } from 'redux-observable';
import {
  DeltaReceived,
  OrderBookActions,
  SnapshotReceived,
} from './orderBook.actions';
import { filter, Observable, switchMap, takeUntil } from 'rxjs';
import { prices$ } from '../services/network/orderBookNetwork.service';
import { AppState } from '../../../shared/state/rootReducer';

export const observeProductEpic: Epic<
  OrderBookActions,
  OrderBookActions,
  AppState
> = (action$) =>
  action$.pipe(
    ofType('ObserveProduct'),
    switchMap(({ product }): Observable<SnapshotReceived | DeltaReceived> => {
      return prices$([product]).pipe(
        filter((event) => {
          // Ignore late events coming for the previous product
          return product === event.product;
        }),
        takeUntil(action$.pipe(ofType('StopObservingProduct')))
      );
    })
  );

export const orderBookEpics = combineEpics(observeProductEpic);
