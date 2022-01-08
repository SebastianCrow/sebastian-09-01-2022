import { getOrderBookMockState } from '../../../../tests/mocks/getOrderBookMockStore';
import { asPrice, asSize, asTotal, Total } from '../orderBook.types';
import { selectHighestTotal } from './orderBook.selectors';

describe('selectHighestTotal.selector', () => {
  test.each([
    [undefined, undefined, undefined],
    [asTotal(34), undefined, asTotal(34)],
    [undefined, asTotal(34), asTotal(34)],
    [asTotal(34), asTotal(40), asTotal(40)],
    [asTotal(40), asTotal(34), asTotal(40)],
  ])(
    'selectSpreadInfo - bottomBidTotal: %s, bottomAskTotal: %s, outputSpread: %s',
    (
      bottomBidTotal: Total | undefined,
      bottomAskTotal: Total | undefined,
      outputHighestTotal: Total | undefined
    ) => {
      const orderBook = getOrderBookMockState({
        bids:
          bottomBidTotal !== undefined
            ? {
                [asPrice(1)]: {
                  price: asPrice(1),
                  size: asSize(bottomBidTotal),
                },
              }
            : undefined,
        asks:
          bottomAskTotal !== undefined
            ? {
                [bottomAskTotal]: {
                  price: asPrice(1),
                  size: asSize(bottomAskTotal),
                },
              }
            : undefined,
      });
      expect(selectHighestTotal({ orderBook })).toStrictEqual(
        outputHighestTotal
      );
    }
  );
});
