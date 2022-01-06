export type ProductId =
  | 'PI_XBTUSD' // Bitcoin
  | 'PI_ETHUSD'; // Ethereum

export interface SnapshotReceived {
  type: 'SnapshotReceived';
  productId: ProductId;
  numLevels: number;
  bids: [number, number][]; // TODO: [price, size] BrandType
  asks: [number, number][]; // TODO: [price, size] BrandType
}

export interface DeltaReceived {
  type: 'DeltaReceived';
  productId: ProductId;
  bids: [number, number][]; // TODO: [price, size] BrandType
  asks: [number, number][]; // TODO: [price, size] BrandType
}
