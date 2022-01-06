import { PriceInfo } from './network/orderBookNetwork.types';
import { ComputedPriceInfo, Price, Total } from '../state/orderBook.types';

export const computePriceInfoList = (
  priceInfoRecord: Record<Price, PriceInfo>,
  sort: 'asc' | 'desc'
): ComputedPriceInfo[] => {
  const sortedList = [...Object.values(priceInfoRecord)].sort((a, b) =>
    sort === 'asc' ? a.price - b.price : b.price - a.price
  );

  let total = 0;
  return sortedList.map(({ price, size }) => {
    total += size;
    return {
      price,
      size,
      total: total as Total,
    };
  });
};
