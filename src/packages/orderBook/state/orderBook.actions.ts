import { Product } from '../services/network/orderBookNetwork.types';

export interface ObserveProduct {
  type: 'ObserveProduct';
  product: Product;
}

export interface SnapshotReceived {
  type: 'SnapshotReceived';
  product: Product;
  numLevels: number;
  bids: [number, number][]; // TODO: [price, size] BrandType
  asks: [number, number][]; // TODO: [price, size] BrandType
}

export interface DeltaReceived {
  type: 'DeltaReceived';
  product: Product;
  bids: [number, number][]; // TODO: [price, size] BrandType
  asks: [number, number][]; // TODO: [price, size] BrandType
}

export type OrderBookActions =
  | ObserveProduct
  | SnapshotReceived
  | DeltaReceived;
