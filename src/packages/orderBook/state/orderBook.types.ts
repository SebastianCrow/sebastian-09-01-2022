import { PriceInfo, Product } from '../services/network/orderBookNetwork.types';

export type Price = number & { __brand: 'Price' };
export const asPrice = (price: number): Price => price as Price;

export type Size = number & { __brand: 'Size' };
export const asSize = (size: number): Size => size as Size;

export type Total = number & { __brand: 'Total' };
export const asTotal = (total: number): Total => total as Total;

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

export type ConnectionStatus =
  | 'subscribing'
  | 'subscribed'
  | 'unsubscribed'
  | 'error';

interface PricesInfo {
  numLevels: number;
  bids: Record<Price, PriceInfo>; // Bids/buy
  asks: Record<Price, PriceInfo>; // Asks/sell
}

export interface OrderBookState {
  product: Product;
  connectionStatus: ConnectionStatus;
  prices: PricesInfo | undefined;
}
