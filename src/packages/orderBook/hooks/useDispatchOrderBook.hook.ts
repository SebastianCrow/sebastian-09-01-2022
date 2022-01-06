import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { OrderBookActions } from '../state/orderBook.actions';

// TODO: Forbid useDispatch with ESLint?

export const useDispatchOrderBook = (): Dispatch<OrderBookActions> => {
  return useDispatch<Dispatch<OrderBookActions>>();
};
