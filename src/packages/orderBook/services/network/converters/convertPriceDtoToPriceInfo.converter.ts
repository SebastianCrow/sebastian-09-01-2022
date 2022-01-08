import { Price, Size } from '../../../state/orderBook.types';
import { PriceInfo } from '../orderBookNetwork.types';

export const convertPriceDtoToPriceInfo = ([price, size]: [
  Price,
  Size
]): PriceInfo => {
  return {
    price,
    size,
  };
};
