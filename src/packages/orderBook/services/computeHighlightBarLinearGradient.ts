import { PriceDataType } from '../state/orderBook.types';

const HIGHLIGHT_COLORS: Record<PriceDataType, string> = {
  bids: 'rgb(32, 51, 47)',
  asks: 'rgb(53, 32, 39)',
};

/**
 * Compute linear gradient for the horizontal higlight bars
 * @param direction Direction of the bar
 * @param percent Percent of background to paint
 * @param priceDataType Type of the data to choose the background color
 */
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
