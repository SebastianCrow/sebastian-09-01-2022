import { Price, Size } from '../../state/orderBook.types';

export type Product = 'Bitcoin' | 'Ethereum';

export interface PriceInfo {
  price: Price;
  size: Size;
}

export interface SnapshotReceived {
  type: 'SnapshotReceived';
  product: Product;
  numLevels: number;
  bids: PriceInfo[];
  asks: PriceInfo[];
}

export interface DeltaReceived {
  type: 'DeltaReceived';
  product: Product;
  bids: PriceInfo[];
  asks: PriceInfo[];
}
