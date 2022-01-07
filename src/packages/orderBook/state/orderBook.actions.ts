import { PriceInfo, Product } from '../services/network/orderBookNetwork.types';
import { ConnectionStatus } from './orderBook.types';

export interface ObserveProduct {
  type: 'ObserveProduct';
  product: Product;
}

export interface StopObservingProduct {
  type: 'StopObservingProduct';
  product: Product;
}

export interface SetConnectionStatus {
  type: 'SetConnectionStatus';
  connectionStatus: ConnectionStatus;
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
  | StopObservingProduct
  | SetConnectionStatus
  | SnapshotReceived
  | DeltaReceived;
