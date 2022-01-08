import { getOrderBookMockState } from '../../../../tests/mocks/getOrderBookMockStore';
import { asPrice, asSize, Price, SpreadInfo } from '../orderBook.types';
import { selectSpreadInfo } from './orderBook.selectors';

describe('selectSpreadInfo.selector', () => {
  test.each([
    [undefined, undefined, undefined],
    [asPrice(34), undefined, undefined],
    [undefined, asPrice(34), undefined],
    [asPrice(34), asPrice(40.5), { value: 6.5, percent: 16.049382716049383 }],
    [asPrice(40.5), asPrice(34), { value: -6.5, percent: -19.11764705882353 }],
  ])(
    'selectSpreadInfo - topBidPrice: %s, topAskPrice: %s, outputSpread: %s',
    (
      topBidPrice: Price | undefined,
      topAskPrice: Price | undefined,
      outputSpread: SpreadInfo | undefined
    ) => {
      const orderBook = getOrderBookMockState({
        bids:
          topBidPrice !== undefined
            ? { [topBidPrice]: { price: topBidPrice, size: asSize(1) } }
            : undefined,
        asks:
          topAskPrice !== undefined
            ? { [topAskPrice]: { price: topAskPrice, size: asSize(1) } }
            : undefined,
      });
      expect(selectSpreadInfo({ orderBook })).toStrictEqual(outputSpread);
    }
  );
});
