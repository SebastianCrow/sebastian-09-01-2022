import { renderHook } from '@testing-library/react-hooks';
import { useComputeOrderBookTableData } from './useComputeOrderBookTableData.hook';
import { TableProps } from '../../../ui/table/table.component';
import { AppProviders } from '../../../app/components/appProviders';
import { ORDER_BOOK_COLUMNS } from './useComputeOrderBookTableData.columns';
import { asPrice, asSize, asTotal } from '../../state/orderBook.types';

describe('useComputeOrderBookTableData.hook', () => {
  describe('bids', () => {
    test('computes columns (missing data)', () => {
      const { result } = renderHook(
        () =>
          useComputeOrderBookTableData({
            priceInfoList: undefined,
            priceDataType: 'bids',
          }),
        {
          wrapper: AppProviders,
        }
      );
      const output: TableProps = {
        columns: [
          ORDER_BOOK_COLUMNS.total,
          ORDER_BOOK_COLUMNS.size,
          ORDER_BOOK_COLUMNS.price,
        ],
        data: undefined,
        options: undefined,
      };
      expect(result.current).toStrictEqual(output);
    });

    test('computes data', () => {
      const { result } = renderHook(
        () =>
          useComputeOrderBookTableData({
            priceInfoList: [
              {
                price: asPrice(1),
                size: asSize(2),
                total: asTotal(2),
              },
              {
                price: asPrice(3),
                size: asSize(4),
                total: asTotal(6),
              },
            ],
            priceDataType: 'bids',
          }),
        {
          wrapper: AppProviders,
        }
      );
      const output: TableProps = {
        columns: [
          ORDER_BOOK_COLUMNS.total,
          ORDER_BOOK_COLUMNS.size,
          ORDER_BOOK_COLUMNS.price,
        ],
        data: [
          {
            id: '1',
            rowClass: 'rowBid',
            rowStyle: undefined,
            cells: {
              price: {
                // TODO: Stricter checks for React elements
                value: expect.any(Object),
              },
              size: {
                value: expect.any(Object),
              },
              total: {
                value: expect.any(Object),
              },
            },
          },
          {
            id: '3',
            rowClass: 'rowBid',
            rowStyle: undefined,
            cells: {
              price: {
                value: expect.any(Object),
              },
              size: {
                value: expect.any(Object),
              },
              total: {
                value: expect.any(Object),
              },
            },
          },
        ],
        options: undefined,
      };

      expect(result.current).toMatchObject(output);
    });
  });

  describe('asks', () => {
    test('computes columns (missing data)', () => {
      const { result } = renderHook(
        () =>
          useComputeOrderBookTableData({
            priceInfoList: undefined,
            priceDataType: 'asks',
          }),
        {
          wrapper: AppProviders,
        }
      );
      const output: TableProps = {
        columns: [
          ORDER_BOOK_COLUMNS.price,
          ORDER_BOOK_COLUMNS.size,
          ORDER_BOOK_COLUMNS.total,
        ],
        data: undefined,
        options: undefined,
      };
      expect(result.current).toStrictEqual(output);
    });

    test('computes data', () => {
      const { result } = renderHook(
        () =>
          useComputeOrderBookTableData({
            priceInfoList: [
              {
                price: asPrice(1),
                size: asSize(2),
                total: asTotal(2),
              },
              {
                price: asPrice(3),
                size: asSize(4),
                total: asTotal(6),
              },
            ],
            priceDataType: 'asks',
          }),
        {
          wrapper: AppProviders,
        }
      );
      const output: TableProps = {
        columns: [
          ORDER_BOOK_COLUMNS.price,
          ORDER_BOOK_COLUMNS.size,
          ORDER_BOOK_COLUMNS.total,
        ],
        data: [
          {
            id: '1',
            rowClass: 'rowAsk',
            rowStyle: undefined,
            cells: {
              price: {
                // TODO: Stricter checks for React elements
                value: expect.any(Object),
              },
              size: {
                value: expect.any(Object),
              },
              total: {
                value: expect.any(Object),
              },
            },
          },
          {
            id: '3',
            rowClass: 'rowAsk',
            rowStyle: undefined,
            cells: {
              price: {
                value: expect.any(Object),
              },
              size: {
                value: expect.any(Object),
              },
              total: {
                value: expect.any(Object),
              },
            },
          },
        ],
        options: undefined,
      };

      expect(result.current).toMatchObject(output);
    });
  });
});
