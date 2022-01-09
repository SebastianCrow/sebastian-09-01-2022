import { PriceInfo } from './network/orderBookNetwork.types';
import { asTotal, ComputedPriceInfo, Price } from '../state/orderBook.types';

/**
 * Compute price levels list from the given price levels record sliced to the given limit
 * @param priceInfoRecord Price levels record
 * @param sort Sort direction
 * @param levelsLimit Price levels limit
 */
export const computePriceInfoList = (
  priceInfoRecord: Record<Price, PriceInfo>,
  sort: 'asc' | 'desc',
  levelsLimit: number
): ComputedPriceInfo[] => {
  let total = 0;
  return (
    Object.values(priceInfoRecord)
      // Ascending or descending order
      .sort((a, b) => (sort === 'asc' ? a.price - b.price : b.price - a.price))
      // Slice to the limit
      .slice(0, levelsLimit)
      // Compute total values
      .map(({ price, size }) => {
        total += size;
        return {
          price,
          size,
          total: asTotal(total),
        };
      })
  );
};
