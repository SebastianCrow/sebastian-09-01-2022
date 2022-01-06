import { PriceInfo } from './network/orderBookNetwork.types';
import { Price } from '../state/orderBook.types';

export const computePriceInfoRecord = (
  priceInfoList: PriceInfo[]
): Record<Price, PriceInfo> => {
  const priceInfoRecord: Record<Price, PriceInfo> = {};
  for (const priceInfo of priceInfoList) {
    priceInfoRecord[priceInfo.price] = priceInfo;
  }
  return priceInfoRecord;
};
