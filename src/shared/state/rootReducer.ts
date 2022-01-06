import { combineReducers } from 'redux';
import { OrderBookState } from '../../packages/orderBook/state/orderBook.types';
import { orderBookReducer } from '../../packages/orderBook/state/orderBook.reducer';

export interface AppState {
  orderBook: OrderBookState;
} // TODO: Add state here

export const rootReducer = combineReducers({
  orderBook: orderBookReducer,
});
