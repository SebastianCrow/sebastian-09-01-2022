import { ProductIdDto } from '../dto/orderBook.dto';
import { Product } from '../orderBookNetwork.types';

export const convertProductIdToProduct = (productId: ProductIdDto): Product => {
  switch (productId) {
    case 'PI_XBTUSD':
      return Product.Bitcoin_USD;
    case 'PI_ETHUSD':
      return Product.Ethereum_USD;
  }
};
