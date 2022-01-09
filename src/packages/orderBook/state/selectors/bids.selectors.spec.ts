import { getOrderBookMockState } from '../../../../tests/mocks/getOrderBookMockStore';
import {
  asPrice,
  asSize,
  asTotal,
  ComputedPriceInfo,
  Price,
} from '../orderBook.types';
import {
  selectOrderBookBids,
  selectOrderBookBottomBid,
  selectOrderBookTopBid,
} from './orderBook.selectors';
import { PriceInfo } from '../../services/network/orderBookNetwork.types';

describe('bids.selectors', () => {
  test.each([
    [undefined, undefined],
    [{}, []],
    [
      {
        [asPrice(1)]: { price: asPrice(1), size: asSize(10) },
        [asPrice(3)]: { price: asPrice(3), size: asSize(30) },
        [asPrice(2)]: { price: asPrice(2), size: asSize(20) },
        [asPrice(4)]: { price: asPrice(4), size: asSize(40) },
      },
      [
        { price: asPrice(4), size: asSize(40), total: asTotal(40) },
        { price: asPrice(3), size: asSize(30), total: asTotal(70) },
        { price: asPrice(2), size: asSize(20), total: asTotal(90) },
        { price: asPrice(1), size: asSize(10), total: asTotal(100) },
      ],
    ],
  ])(
    'selectOrderBookBids (descending) - input: %s, output: %s',
    (
      inputRecord: Record<Price, PriceInfo> | undefined,
      outputList: ComputedPriceInfo[] | undefined
    ) => {
      const orderBook = getOrderBookMockState({
        prices: inputRecord
          ? {
              numLevels: 15,
              bids: inputRecord,
              asks: inputRecord,
            }
          : undefined,
      });
      expect(selectOrderBookBids({ orderBook })).toStrictEqual(outputList);
    }
  );

  test.each([
    [undefined, undefined],
    [{}, undefined],
    [
      {
        [asPrice(1)]: { price: asPrice(1), size: asSize(10) },
        [asPrice(3)]: { price: asPrice(3), size: asSize(30) },
        [asPrice(2)]: { price: asPrice(2), size: asSize(20) },
        [asPrice(4)]: { price: asPrice(4), size: asSize(40) },
      },
      { price: asPrice(4), size: asSize(40), total: asTotal(40) },
    ],
  ])(
    'selectOrderBookTopBid - input: %s, output: %s',
    (
      inputRecord: Record<Price, PriceInfo> | undefined,
      outputList: ComputedPriceInfo | undefined
    ) => {
      const orderBook = getOrderBookMockState({
        prices: inputRecord
          ? {
              numLevels: 15,
              bids: inputRecord,
              asks: inputRecord,
            }
          : undefined,
      });
      expect(selectOrderBookTopBid({ orderBook })).toStrictEqual(outputList);
    }
  );

  test.each([
    [undefined, undefined],
    [{}, undefined],
    [
      {
        [asPrice(1)]: { price: asPrice(1), size: asSize(10) },
        [asPrice(3)]: { price: asPrice(3), size: asSize(30) },
        [asPrice(2)]: { price: asPrice(2), size: asSize(20) },
        [asPrice(4)]: { price: asPrice(4), size: asSize(40) },
      },
      { price: asPrice(1), size: asSize(10), total: asTotal(100) },
    ],
  ])(
    'selectOrderBookBottomBid - input: %s, output: %s',
    (
      inputRecord: Record<Price, PriceInfo> | undefined,
      outputList: ComputedPriceInfo | undefined
    ) => {
      const orderBook = getOrderBookMockState({
        prices: inputRecord
          ? {
              numLevels: 15,
              bids: inputRecord,
              asks: inputRecord,
            }
          : undefined,
      });
      expect(selectOrderBookBottomBid({ orderBook })).toStrictEqual(outputList);
    }
  );
});
