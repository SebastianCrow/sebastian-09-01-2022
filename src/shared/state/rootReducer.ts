import { combineReducers } from 'redux';
import { OrderBookState } from '../../packages/orderBook/state/orderBook.types';
import { orderBookReducer } from '../../packages/orderBook/state/orderBook.reducer';

export interface AppState {
  orderBook: OrderBookState;
}

export const rootReducer = combineReducers({
  orderBook: orderBookReducer,
});
