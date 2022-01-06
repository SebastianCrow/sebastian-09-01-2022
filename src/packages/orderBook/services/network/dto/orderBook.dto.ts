type ProductIdDto =
  | 'PI_XBTUSD' // Bitcoin
  | 'PI_ETHUSD'; // Ethereum

const FeedValuesDto = ['book_ui_1'] as const;
type FeedDto = typeof FeedValuesDto[number];

const FeedSnapshotValuesDto = ['book_ui_1_snapshot'] as const;
type FeedSnapshotDto = typeof FeedSnapshotValuesDto[number];

/* Requests */

export type OrderBookRequestDto = SubscribeRequestDto | UnsubscribeRequestDto;

export interface SubscribeRequestDto {
  event: 'subscribe';
  feed: FeedDto;
  product_ids: ProductIdDto[];
}

export interface UnsubscribeRequestDto {
  event: 'unsubscribe';
  feed: FeedDto;
  product_ids: ProductIdDto[];
}

/* Responses */

export type OrderBookResponseDto =
  | SubscribedResponseDto
  | UnsubscribedResponseDto
  | SnapshotResponseDto
  | DeltaResponseDto;

export interface SubscribedResponseDto {
  event: 'subscribed';
  feed: FeedDto;
  product_ids: ProductIdDto[];
}

export interface UnsubscribedResponseDto {
  event: 'unsubscribed';
  feed: FeedDto;
  product_ids: ProductIdDto;
}

export interface SnapshotResponseDto {
  feed: FeedSnapshotDto;
  product_id: ProductIdDto;
  numLevels: number;
  bids: [number, number][]; // TODO: [price, size] BrandType
  asks: [number, number][]; // TODO: [price, size] BrandType
}

export interface DeltaResponseDto {
  feed: FeedDto;
  product_id: ProductIdDto;
  bids: [number, number][]; // TODO: [price, size] BrandType
  asks: [number, number][]; // TODO: [price, size] BrandType
}

/* Type Guards */

export const isSnapshotResponseDto = (
  dto: OrderBookResponseDto
): dto is SnapshotResponseDto => {
  const castedDto = dto as SnapshotResponseDto;
  return Boolean(
    castedDto.bids &&
      castedDto.asks &&
      FeedSnapshotValuesDto.includes(castedDto.feed)
  );
};

export const isDeltaResponseDto = (
  dto: OrderBookResponseDto
): dto is SnapshotResponseDto => {
  const castedDto = dto as DeltaResponseDto;
  return Boolean(
    castedDto.bids && castedDto.asks && FeedValuesDto.includes(castedDto.feed)
  );
};
