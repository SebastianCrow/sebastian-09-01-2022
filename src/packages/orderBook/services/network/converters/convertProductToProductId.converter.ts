import { ProductIdDto } from '../dto/orderBook.dto';
import { Product } from '../orderBookNetwork.types';

export const convertProductToProductId = (product: Product): ProductIdDto => {
  switch (product) {
    case 'Bitcoin':
      return 'PI_XBTUSD';
    case 'Ethereum':
      return 'PI_ETHUSD';
  }
};
