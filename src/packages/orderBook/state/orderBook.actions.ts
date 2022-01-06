import { ProductId } from '../services/network/orderBookNetwork.types';

export interface SnapshotReceivedAction {
  type: 'SnapshotReceivedAction';
  productId: ProductId;
  numLevels: number;
  bids: [number, number][]; // TODO: [price, size] BrandType
  asks: [number, number][]; // TODO: [price, size] BrandType
}

export interface DeltaReceivedAction {
  type: 'DeltaReceivedAction';
  productId: ProductId;
  bids: [number, number][]; // TODO: [price, size] BrandType
  asks: [number, number][]; // TODO: [price, size] BrandType
}

export type OrderBookActions = SnapshotReceivedAction | DeltaReceivedAction;
