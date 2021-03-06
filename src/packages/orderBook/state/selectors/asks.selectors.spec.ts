import { getOrderBookMockState } from '../../../../tests/mocks/getOrderBookMockStore';
import {
  asPrice,
  asSize,
  asTotal,
  ComputedPriceInfo,
  Price,
} from '../orderBook.types';
import {
  selectOrderBookBottomAsk,
  selectOrderBookPrices,
  selectOrderBookTopAsk,
} from './orderBook.selectors';
import { PriceInfo } from '../../services/network/orderBookNetwork.types';

describe('asks.selectors', () => {
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
        { price: asPrice(1), size: asSize(10), total: asTotal(10) },
        { price: asPrice(2), size: asSize(20), total: asTotal(30) },
        { price: asPrice(3), size: asSize(30), total: asTotal(60) },
        { price: asPrice(4), size: asSize(40), total: asTotal(100) },
      ],
    ],
  ])(
    'selectOrderBookAsks (ascending) - input: %s, output: %s',
    (
      inputRecord: Record<Price, PriceInfo> | undefined,
      outputList: ComputedPriceInfo[] | undefined
    ) => {
      const orderBook = getOrderBookMockState({
        prices: inputRecord
          ? {
              numLevels: 15,
              bids: [],
              asks: inputRecord,
            }
          : undefined,
      });
      expect(selectOrderBookPrices({ orderBook }).asks).toStrictEqual(
        outputList
      );
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
      { price: asPrice(1), size: asSize(10), total: asTotal(10) },
    ],
  ])(
    'selectOrderBookTopAsk - input: %s, output: %s',
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
      expect(selectOrderBookTopAsk({ orderBook })).toStrictEqual(outputList);
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
      { price: asPrice(4), size: asSize(40), total: asTotal(100) },
    ],
  ])(
    'selectOrderBookBottomAsk - input: %s, output: %s',
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
      expect(selectOrderBookBottomAsk({ orderBook })).toStrictEqual(outputList);
    }
  );
});
