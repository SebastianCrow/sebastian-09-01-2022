import { ComputedPriceInfo, SpreadInfo } from '../../state/orderBook.types';
import { computePercent } from '../../../../shared/utils/number.util';

/**
 * Compute spread a difference between top ask price and top bid price.
 * Computed percent is relative to the top ask price.
 * @param topBid Top bid price info
 * @param topAsk Top ask price info
 */
export const computeSpreadInfo = ({
  topBid,
  topAsk,
}: {
  topBid: ComputedPriceInfo | undefined;
  topAsk: ComputedPriceInfo | undefined;
}): SpreadInfo | undefined => {
  // No data for computations
  if (topAsk === undefined || topBid === undefined) {
    return;
  }
  const topAskPrice = topAsk.price;
  const topBidPrice = topBid.price;

  const value = topAskPrice - topBidPrice;
  return {
    value,
    percent: computePercent(value, topAskPrice),
  };
};
