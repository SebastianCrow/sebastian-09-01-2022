import { PriceInfo } from './network/orderBookNetwork.types';
import { asTotal, ComputedPriceInfo, Price } from '../state/orderBook.types';

// TODO: Dynamic limit based on device screen size
const TODO_ITEMS_LIMIT = 15;

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
    .slice(0, TODO_ITEMS_LIMIT);
};
