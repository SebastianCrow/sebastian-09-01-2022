import { asTotal, ComputedPriceInfo, Total } from '../../state/orderBook.types';

/**
 * Compute the highest total value among bottom bid and ask price info
 * @param bottomBid Bottom bid price info
 * @param bottomAsk Bottom ask price info
 */
export const computeHighestTotal = ({
  bottomBid,
  bottomAsk,
}: {
  bottomBid: ComputedPriceInfo | undefined;
  bottomAsk: ComputedPriceInfo | undefined;
}): Total | undefined => {
  const bidTotal = bottomBid?.total;
  const askTotal = bottomAsk?.total;
  return bidTotal || askTotal
    ? asTotal(Math.max(bidTotal ?? 0, askTotal ?? 0))
    : undefined;
};
