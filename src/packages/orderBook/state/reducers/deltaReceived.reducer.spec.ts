import { getOrderBookMockState } from '../../../../tests/mocks/getOrderBookMockStore';
import { DeltaReceived, SnapshotReceived } from '../orderBook.actions';
import { orderBookReducer } from './orderBook.reducer';
import { asPrice, asSize } from '../orderBook.types';

describe('deltaReceived.reducer', () => {
  test('adds price level for missing data', () => {
    const input = getOrderBookMockState({
      bids: undefined,
      asks: undefined,
    });
    const action: DeltaReceived = {
      type: 'DeltaReceived',
      product: 'Bitcoin',
      bids: [
        { price: asPrice(1), size: asSize(2) },
        { price: asPrice(3), size: asSize(4) },
      ],
      asks: [
        { price: asPrice(5), size: asSize(6) },
        { price: asPrice(7), size: asSize(8) },
      ],
    };
    const output = getOrderBookMockState({
      bids: {
        [asPrice(1)]: { price: asPrice(1), size: asSize(2) },
        [asPrice(3)]: { price: asPrice(3), size: asSize(4) },
      },
      asks: {
        [asPrice(5)]: { price: asPrice(5), size: asSize(6) },
        [asPrice(7)]: { price: asPrice(7), size: asSize(8) },
      },
    });
    expect(orderBookReducer(input, action)).toStrictEqual(output);
  });

  test('adds price level for existing data', () => {
    const input = getOrderBookMockState({
      bids: {
        [asPrice(1)]: { price: asPrice(1), size: asSize(2) },
        [asPrice(3)]: { price: asPrice(3), size: asSize(4) },
      },
      asks: {
        [asPrice(5)]: { price: asPrice(5), size: asSize(6) },
        [asPrice(7)]: { price: asPrice(7), size: asSize(8) },
      },
    });
    const action: DeltaReceived = {
      type: 'DeltaReceived',
      product: 'Bitcoin',
      bids: [
        { price: asPrice(9), size: asSize(10) },
        { price: asPrice(11), size: asSize(12) },
      ],
      asks: [
        { price: asPrice(13), size: asSize(14) },
        { price: asPrice(15), size: asSize(16) },
      ],
    };
    const output = getOrderBookMockState({
      bids: {
        [asPrice(1)]: { price: asPrice(1), size: asSize(2) },
        [asPrice(3)]: { price: asPrice(3), size: asSize(4) },
        [asPrice(9)]: { price: asPrice(9), size: asSize(10) },
        [asPrice(11)]: { price: asPrice(11), size: asSize(12) },
      },
      asks: {
        [asPrice(5)]: { price: asPrice(5), size: asSize(6) },
        [asPrice(7)]: { price: asPrice(7), size: asSize(8) },
        [asPrice(13)]: { price: asPrice(13), size: asSize(14) },
        [asPrice(15)]: { price: asPrice(15), size: asSize(16) },
      },
    });
    expect(orderBookReducer(input, action)).toStrictEqual(output);
  });

  test('replaces existing price level', () => {
    const input = getOrderBookMockState({
      bids: {
        [asPrice(1)]: { price: asPrice(1), size: asSize(2) },
        [asPrice(3)]: { price: asPrice(3), size: asSize(4) },
      },
      asks: {
        [asPrice(5)]: { price: asPrice(5), size: asSize(6) },
        [asPrice(7)]: { price: asPrice(7), size: asSize(8) },
      },
    });
    const action: DeltaReceived = {
      type: 'DeltaReceived',
      product: 'Bitcoin',
      bids: [{ price: asPrice(1), size: asSize(10) }],
      asks: [{ price: asPrice(5), size: asSize(15) }],
    };
    const output = getOrderBookMockState({
      bids: {
        [asPrice(1)]: { price: asPrice(1), size: asSize(10) },
        [asPrice(3)]: { price: asPrice(3), size: asSize(4) },
      },
      asks: {
        [asPrice(5)]: { price: asPrice(5), size: asSize(15) },
        [asPrice(7)]: { price: asPrice(7), size: asSize(8) },
      },
    });
    expect(orderBookReducer(input, action)).toStrictEqual(output);
  });

  test('deletes price level for existing data', () => {
    const input = getOrderBookMockState({
      bids: {
        [asPrice(1)]: { price: asPrice(1), size: asSize(2) },
      },
      asks: {
        [asPrice(3)]: { price: asPrice(3), size: asSize(4) },
      },
    });
    const action: DeltaReceived = {
      type: 'DeltaReceived',
      product: 'Bitcoin',
      bids: [
        { price: asPrice(1), size: asSize(0) },
        { price: asPrice(5), size: asSize(0) },
      ],
      asks: [
        { price: asPrice(3), size: asSize(0) },
        { price: asPrice(6), size: asSize(0) },
      ],
    };
    const output = getOrderBookMockState({
      bids: {},
      asks: {},
    });
    expect(orderBookReducer(input, action)).toStrictEqual(output);
  });

  test('deletes price level for missing data', () => {
    const input = getOrderBookMockState({
      bids: undefined,
      asks: undefined,
    });
    const action: DeltaReceived = {
      type: 'DeltaReceived',
      product: 'Bitcoin',
      bids: [{ price: asPrice(1), size: asSize(0) }],
      asks: [{ price: asPrice(3), size: asSize(0) }],
    };
    const output = getOrderBookMockState({
      bids: {},
      asks: {},
    });
    expect(orderBookReducer(input, action)).toStrictEqual(output);
  });

  test('adds, replaces, and deletes price levels', () => {
    const input = getOrderBookMockState({
      bids: {
        [asPrice(1)]: { price: asPrice(1), size: asSize(2) },
        [asPrice(3)]: { price: asPrice(3), size: asSize(4) },
      },
      asks: {
        [asPrice(5)]: { price: asPrice(5), size: asSize(6) },
        [asPrice(7)]: { price: asPrice(7), size: asSize(8) },
      },
    });
    const action: DeltaReceived = {
      type: 'DeltaReceived',
      product: 'Bitcoin',
      bids: [
        { price: asPrice(1), size: asSize(0) },
        { price: asPrice(3), size: asSize(13) },
        { price: asPrice(8), size: asSize(9) },
      ],
      asks: [
        { price: asPrice(5), size: asSize(0) },
        { price: asPrice(7), size: asSize(17) },
        { price: asPrice(10), size: asSize(11) },
      ],
    };
    const output = getOrderBookMockState({
      bids: {
        [asPrice(3)]: { price: asPrice(3), size: asSize(13) },
        [asPrice(8)]: { price: asPrice(8), size: asSize(9) },
      },
      asks: {
        [asPrice(7)]: { price: asPrice(7), size: asSize(17) },
        [asPrice(10)]: { price: asPrice(10), size: asSize(11) },
      },
    });
    expect(orderBookReducer(input, action)).toStrictEqual(output);
  });
});
