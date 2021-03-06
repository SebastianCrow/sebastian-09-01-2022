import { Price, Size } from '../../state/orderBook.types';

export enum Product {
  Bitcoin_USD = 'PI_XBTUSD',
  Ethereum_USD = 'PI_ETHUSD',
}

export interface PriceInfo {
  price: Price;
  size: Size;
}

export type ReceivedEvents =
  | SubscribedReceived
  | UnsubscribedReceived
  | SnapshotReceived
  | DeltaReceived;

export interface SubscribedReceived {
  type: 'SubscribedReceived';
  product: Product;
}

export interface UnsubscribedReceived {
  type: 'UnsubscribedReceived';
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
