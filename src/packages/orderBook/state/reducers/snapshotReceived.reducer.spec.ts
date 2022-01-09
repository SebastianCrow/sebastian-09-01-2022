import { getOrderBookMockState } from '../../../../tests/mocks/getOrderBookMockStore';
import { SnapshotReceived } from '../orderBook.actions';
import { asPrice, asSize } from '../orderBook.types';
import { Product } from '../../services/network/orderBookNetwork.types';
import { orderBookReducer } from './orderBook.reducer';

describe('snapshotReceived.reducer', () => {
  test('replaces missing price levels', () => {
    const input = getOrderBookMockState({
      prices: undefined,
    });
    const action: SnapshotReceived = {
      type: 'SnapshotReceived',
      product: Product.Bitcoin_USD,
      numLevels: 15,
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
      prices: {
        numLevels: 15,
        bids: {
          [asPrice(1)]: { price: asPrice(1), size: asSize(2) },
          [asPrice(3)]: { price: asPrice(3), size: asSize(4) },
        },
        asks: {
          [asPrice(5)]: { price: asPrice(5), size: asSize(6) },
          [asPrice(7)]: { price: asPrice(7), size: asSize(8) },
        },
      },
    });
    expect(orderBookReducer(input, action)).toStrictEqual(output);
  });

  test('replaces existing price levels', () => {
    const input = getOrderBookMockState({
      prices: {
        numLevels: 15,
        bids: {
          [asPrice(1)]: { price: asPrice(1), size: asSize(2) },
          [asPrice(3)]: { price: asPrice(3), size: asSize(4) },
        },
        asks: {
          [asPrice(5)]: { price: asPrice(5), size: asSize(6) },
          [asPrice(7)]: { price: asPrice(7), size: asSize(8) },
        },
      },
    });
    const action: SnapshotReceived = {
      type: 'SnapshotReceived',
      product: Product.Bitcoin_USD,
      numLevels: 15,
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
      prices: {
        numLevels: 15,
        bids: {
          [asPrice(9)]: { price: asPrice(9), size: asSize(10) },
          [asPrice(11)]: { price: asPrice(11), size: asSize(12) },
        },
        asks: {
          [asPrice(13)]: { price: asPrice(13), size: asSize(14) },
          [asPrice(15)]: { price: asPrice(15), size: asSize(16) },
        },
      },
    });
    expect(orderBookReducer(input, action)).toStrictEqual(output);
  });
});
