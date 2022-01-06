import { Product } from '../services/network/orderBookNetwork.types';

interface PriceInfo {
  price: number; // TODO: BrandType
  size: number; // TODO: BrandType
  total: number; // TODO: BrandType
}

export interface OrderBookState {
  product: Product;
  bids: PriceInfo[] | undefined;
  asks: PriceInfo[] | undefined;
}
