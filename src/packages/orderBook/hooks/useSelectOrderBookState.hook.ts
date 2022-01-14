import { useSelector } from 'react-redux';
import {
  ComputedPricesInfo,
  OrderBookState,
  SpreadInfo,
  Total,
} from '../state/orderBook.types';
import {
  selectHighestTotal,
  selectOrderBookPrices,
  selectOrderBookState,
  selectSpreadInfo,
} from '../state/selectors/orderBook.selectors';

export const useSelectOrderBookState = (): OrderBookState => {
  return useSelector(selectOrderBookState);
};

export const useSelectOrderBookPrices = (): ComputedPricesInfo => {
  return useSelector(selectOrderBookPrices);
};

export const useSelectSpreadInfo = (): SpreadInfo | undefined => {
  return useSelector(selectSpreadInfo);
};

export const useSelectHighestTotal = (): Total | undefined => {
  return useSelector(selectHighestTotal);
};
