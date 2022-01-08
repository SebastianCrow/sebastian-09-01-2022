import { asPrice, asSize, Price, Size } from '../../../state/orderBook.types';
import { PriceInfo } from '../orderBookNetwork.types';
import { convertPriceDtoToPriceInfo } from './convertPriceDtoToPriceInfo.converter';

describe('convertPriceDtoToPriceInfo', () => {
  test('converts array to object', () => {
    const input: [Price, Size] = [asPrice(1), asSize(2)];
    const output: PriceInfo = {
      price: asPrice(1),
      size: asSize(2),
    };
    expect(convertPriceDtoToPriceInfo(input)).toStrictEqual(output);
  });
});
