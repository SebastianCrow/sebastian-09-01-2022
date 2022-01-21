import { Price } from '../state/orderBook.types';
import { PriceInfo } from './network/orderBookNetwork.types';

/**
 * Update price info record based on the given new price info list.
 * It updates the price info for the prices and deletes records with the zero size.
 * @param priceInfoRecord Current price info record
 * @param newPriceInfoList New price info list
 */
export const updatePriceInfoRecord = (
  priceInfoRecord: Record<Price, PriceInfo> | undefined = {},
  newPriceInfoList: PriceInfo[]
): Record<Price, PriceInfo> => {
  return newPriceInfoList.reduce(
    (acc, curr) => {
      // Replace with the new price info
      if (curr.size > 0) {
        acc[curr.price] = curr;
      }
      // Delete obsolete price info
      else {
        delete acc[curr.price];
      }
      return acc;
    },
    { ...priceInfoRecord }
  );
};
