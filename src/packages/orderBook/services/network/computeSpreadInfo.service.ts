import { PriceInfo } from './orderBookNetwork.types';
import { SpreadInfo } from '../../state/orderBook.types';
import { computePercent } from '../../../../shared/utils/number.util';

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

  const value = askPrice - bidPrice;
  return {
    value,
    percent: computePercent(value, askPrice), // TODO: Clarify whether the computations are correct
  };
};
