import { asTotal, ComputedPriceInfo, Total } from '../../state/orderBook.types';

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
