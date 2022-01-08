import { useSelector } from 'react-redux';
import {
  ComputedPriceInfo,
  OrderBookState,
  SpreadInfo,
  Total,
} from '../state/orderBook.types';
import {
  selectHighestTotal,
  selectOrderBookAsks,
  selectOrderBookBids,
  selectOrderBookState,
  selectSpreadInfo,
} from '../state/orderBook.selectors';

export const useSelectOrderBookState = (): OrderBookState => {
  return useSelector(selectOrderBookState);
};

export const useSelectOrderBookBids = (): ComputedPriceInfo[] | undefined => {
  return useSelector(selectOrderBookBids);
};

export const useSelectOrderBookAsks = (): ComputedPriceInfo[] | undefined => {
  return useSelector(selectOrderBookAsks);
};

export const useSelectSpreadInfo = (): SpreadInfo | undefined => {
  return useSelector(selectSpreadInfo);
};

export const useSelectHighestTotal = (): Total | undefined => {
  return useSelector(selectHighestTotal);
};
