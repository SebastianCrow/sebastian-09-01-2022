import { PriceInfo } from './network/orderBookNetwork.types';
import { asTotal, ComputedPriceInfo, Price } from '../state/orderBook.types';
import { getFeatureValue } from '../../../shared/services/featureFlags/featureFlags.service';
import { FeatureValue } from '../../../shared/services/featureFlags/featureFlags.types';

const LEVELS_LIMIT = parseInt(
  getFeatureValue(FeatureValue.OrderBook_levels_limit, '15')
);

/**
 * Compute price levels list from the given price levels record sliced to the {@link LEVELS_LIMIT}
 * @param priceInfoRecord Price levels record
 * @param sort Sort direction
 */
export const computePriceInfoList = (
  priceInfoRecord: Record<Price, PriceInfo>,
  sort: 'asc' | 'desc'
): ComputedPriceInfo[] => {
  const sortedList = [...Object.values(priceInfoRecord)].sort((a, b) =>
    sort === 'asc' ? a.price - b.price : b.price - a.price
  );

  let total = 0;
  return sortedList
    .map(({ price, size }) => {
      total += size;
      return {
        price,
        size,
        total: asTotal(total),
      };
    })
    .slice(0, LEVELS_LIMIT);
};
