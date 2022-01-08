import { PriceDataType } from '../state/orderBook.types';

const HIGHLIGHT_COLORS: Record<PriceDataType, string> = {
  bids: 'rgb(32, 51, 47)',
  asks: 'rgb(53, 32, 39)',
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
