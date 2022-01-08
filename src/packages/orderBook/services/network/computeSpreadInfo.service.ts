import { ComputedPriceInfo, SpreadInfo } from '../../state/orderBook.types';
import { computePercent } from '../../../../shared/utils/number.util';

export const computeSpreadInfo = ({
  topBid,
  topAsk,
}: {
  topBid: ComputedPriceInfo | undefined;
  topAsk: ComputedPriceInfo | undefined;
}): SpreadInfo | undefined => {
  // No data
  if (topAsk === undefined || topBid === undefined) {
    return;
  }
  const askPrice = topAsk.price;
  const bidPrice = topBid.price;

  const value = askPrice - bidPrice;
  return {
    value,
    percent: computePercent(value, askPrice), // TODO: Clarify whether the computations are correct
  };
};
