export type Product = 'Bitcoin' | 'Ethereum';

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
