import { PriceInfo, Product } from '../services/network/orderBookNetwork.types';

export type Price = number & { __brand: 'Price' };

export type Size = number & { __brand: 'Size' };

export type Total = number & { __brand: 'Total' };

export type PriceDataType = 'bids' | 'asks';

export interface ComputedPriceInfo {
  price: Price;
  size: Size;
  total: Total;
}

export interface SpreadInfo {
  value: number;
  percent: number;
}

export type ConnectionStatus = 'subscribing' | 'subscribed' | 'unsubscribed';

export interface OrderBookState {
  product: Product;
  connectionStatus: ConnectionStatus;
  bids: Record<Price, PriceInfo> | undefined; // Bids/buy
  asks: Record<Price, PriceInfo> | undefined; // Asks/sell
}
