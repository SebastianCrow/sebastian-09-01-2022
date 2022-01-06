import { ProductIdDto } from '../dto/orderBook.dto';
import { Product } from '../orderBookNetwork.types';

export const convertProductIdToProduct = (productId: ProductIdDto): Product => {
  switch (productId) {
    case 'PI_XBTUSD':
      return 'Bitcoin';
    case 'PI_ETHUSD':
      return 'Ethereum';
  }
};
