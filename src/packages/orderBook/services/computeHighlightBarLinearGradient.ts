import { PriceDataType } from '../state/orderBook.types';

const HIGHLIGHT_COLORS: Record<PriceDataType, string> = {
  bids: 'rgb(32, 51, 47)', // TODO: Is it a good place for that?
  asks: 'rgb(53, 32, 39)', // TODO: Is there any type for CSS color?
};

export const computeHighlightBarBackgroundBar = ({
  direction,
  percent,
  priceDataType,
}: {
  direction: 'left' | 'right';
  percent: number; // 0 - 100
  priceDataType: PriceDataType;
}): string => {
  return `linear-gradient(${direction === 'left' ? 'to left' : 'to right'}, ${
    HIGHLIGHT_COLORS[priceDataType]
  } 0 ${percent}%, transparent ${percent}% 100%)`;
};
