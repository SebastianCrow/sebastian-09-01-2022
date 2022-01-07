import { PriceInfo } from './orderBookNetwork.types';
import { SpreadInfo } from '../../state/orderBook.types';
import {
  computePercent,
  roundToDecimalPoints,
} from '../../../../shared/utils/number.util';

export const computeSpreadInfo = ({
  sortedBids,
  sortedAsks,
}: {
  sortedBids: PriceInfo[];
  sortedAsks: PriceInfo[];
}): SpreadInfo | undefined => {
  // No data
  if (!sortedAsks.length && !sortedBids.length) {
    return;
  }
  const askPrice = sortedAsks[0]?.price ?? 0;
  const bidPrice = sortedBids[0]?.price ?? 0;

  const value = Math.abs(askPrice - bidPrice);
  return {
    value,
    percent: roundToDecimalPoints(computePercent(value, bidPrice), 2), // TODO: Clarify whether the computations are correct
  };
};
