import { PriceInfo } from './network/orderBookNetwork.types';
import { Price } from '../state/orderBook.types';

/**
 * Compute price info record from the given price info list by placing the price info under the price key
 * @param priceInfoList Price info list
 */
export const computePriceInfoRecord = (
  priceInfoList: PriceInfo[]
): Record<Price, PriceInfo> => {
  return priceInfoList.reduce((acc, curr) => {
    acc[curr.price] = curr;
    return acc;
  }, {} as Record<Price, PriceInfo>);
};
