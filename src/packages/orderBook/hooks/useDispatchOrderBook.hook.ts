import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { OrderBookActions } from '../state/orderBook.actions';

// TODO: Forbid using useDispatch directly with ESLint

export const useDispatchOrderBook = (): Dispatch<OrderBookActions> => {
  return useDispatch<Dispatch<OrderBookActions>>();
};
