// Use typed dispatch from here
// eslint-disable-next-line no-restricted-imports
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { OrderBookActions } from '../state/orderBook.actions';

export const useDispatchOrderBook = (): Dispatch<OrderBookActions> => {
  return useDispatch<Dispatch<OrderBookActions>>();
};
