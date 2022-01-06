import { useSelector } from 'react-redux';
import { AppState } from '../../../shared/state/rootReducer';
import {
  ComputedPriceInfo,
  OrderBookState,
  SpreadInfo,
} from '../state/orderBook.types';
import { computePriceInfoList } from '../services/computePriceInfoList.service';
import { computeSpreadInfo } from '../services/network/computeSpreadInfo.service';

export const useSelectOrderBookState = (): OrderBookState => {
  return useSelector((app: AppState) => app.orderBook);
};

export const useSelectOrderBookBids = (): ComputedPriceInfo[] | undefined => {
  const { bids } = useSelectOrderBookState();
  return bids ? computePriceInfoList(bids, 'desc') : undefined;
};

export const useSelectOrderBookAsks = (): ComputedPriceInfo[] | undefined => {
  const { asks } = useSelectOrderBookState();
  return asks ? computePriceInfoList(asks, 'asc') : undefined;
};

// TODO: Is it the best place to do so?
export const useSelectSpreadInfo = (): SpreadInfo | undefined => {
  const sortedBids = useSelectOrderBookBids();
  const sortedAsks = useSelectOrderBookAsks();
  return sortedBids && sortedAsks
    ? computeSpreadInfo({
        sortedBids,
        sortedAsks,
      })
    : undefined;
};
