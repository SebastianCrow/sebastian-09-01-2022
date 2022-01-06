import { PriceInfo, Product } from '../services/network/orderBookNetwork.types';

export interface ObserveProduct {
  type: 'ObserveProduct';
  product: Product;
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

export type OrderBookActions =
  | ObserveProduct
  | SnapshotReceived
  | DeltaReceived;
